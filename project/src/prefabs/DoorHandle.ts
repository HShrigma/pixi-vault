import { Container, Sprite} from "pixi.js";
import { Vector2 } from "pixi-spine";
import { DoorDirection } from "../utils/types/vaultRegistries";
import gsap from "gsap";

export class DoorHandle extends Container {
    private handle!: Sprite;
    private handleShadow!: Sprite;
    private currentRotation: number = 0;
    public isSpinning: boolean = false;

    constructor(){
        super();
        this.init();
    }

    private init(){
        this.handleShadow = Sprite.from("/Game/images/door_handle_shadow.png");
        this.handle = Sprite.from("/Game/images/door_handle.png");


        const sprites = [
            this.handleShadow,
            this.handle,
        ];

        sprites.forEach((sprite) => {
            sprite.anchor.set(0.5);
            let spritePos:Vector2;
            if (sprite === this.handle) spritePos = new Vector2(-10, 0);
            else spritePos = new Vector2(1,10);
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
        this.handle.rotation += 0.2;
        this.handleShadow.rotation += 0.2;
    }

    public handleSolved ( ){

    }

    public handleProgress(){

    }

    public spin(direction: DoorDirection){
        if(this.isSpinning) return;
        const rotationAmount = Math.PI / 3; 
        const targetRotation = direction === DoorDirection.CW 
            ? this.currentRotation + rotationAmount
            : this.currentRotation - rotationAmount;
        this.isSpinning = true;

        const timeline = gsap.timeline({
            onUpdate: () => {
                // Apply rotation to both handle and shadow
                this.handle.rotation = this.currentRotation;
                this.handleShadow.rotation = this.currentRotation;
            },
            onComplete: () => {
                this.isSpinning = false;
            }
        });
        timeline.to(this, {
            currentRotation: targetRotation,
            duration: 0.3,
            ease: "power2.out"
        });
    }
}