import { Container, Sprite } from "pixi.js";
import { Vector2 } from "pixi-spine";
import { DoorDirection } from "../utils/types/vaultRegistries";
import gsap from "gsap";

export class DoorHandle extends Container {
    private handle!: Sprite;
    private handleShadow!: Sprite;
    private currentRotation: number = 0;
    public isSpinning: boolean = false;
    public onSpinoutCompleted?: () => void;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.handleShadow = Sprite.from("/Game/images/door_handle_shadow.png");
        this.handle = Sprite.from("/Game/images/door_handle.png");


        const sprites = [
            this.handleShadow,
            this.handle,
        ];

        sprites.forEach((sprite) => {
            sprite.anchor.set(0.5);
            let spritePos: Vector2;
            if (sprite === this.handle) spritePos = new Vector2(-10, 0);
            else spritePos = new Vector2(1, 10);
            sprite.position.set(spritePos.x, spritePos.y);
            this.addChild(sprite);
        });

        this.currentRotation = this.handle.rotation;
        this.setClosed();
    }

    public setClosed() {
        this.handle.visible = true;
        this.handleShadow.visible = true;
    }

    public setOpened() {
        this.handle.visible = false;
        this.handleShadow.visible = false;
    }

    public handleSpinout() {
        if (this.isSpinning) {
            // stop spinning
            gsap.killTweensOf(this);
            this.isSpinning = false;
        }
        this.spin(DoorDirection.CW,  Math.PI * 2).then( () => 
            this.spin(DoorDirection.CCW, Math.PI * 2)).then(()=>
            this.onSpinoutCompleted?.());
    }

    public handleSolved() {

    }

    public handleProgress() {
    }

    public spin(direction: DoorDirection, rotationAmount: number = Math.PI / 3, duration: number = 0.3): Promise<void> {
    return new Promise((resolve) => {
        if (this.isSpinning) {
            resolve(); // Resolve immediately if already spinning
            return;
        }
        
        const targetRotation = direction === DoorDirection.CW
            ? this.currentRotation + rotationAmount
            : this.currentRotation - rotationAmount;
        this.isSpinning = true;

        const timeline = gsap.timeline({
            onUpdate: () => {
                this.handle.rotation = this.currentRotation;
                this.handleShadow.rotation = this.currentRotation;
            },
            onComplete: () => {
                this.isSpinning = false;
                resolve();
            }
        });
        
        timeline.to(this, {
            currentRotation: targetRotation,
            duration: duration,
            ease: "power2.out"
        });
    });
}
}