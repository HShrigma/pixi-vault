import { Container, Sprite } from "pixi.js";
import { VaultState } from "../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";
import gsap from "gsap";

export class VaultView extends Container {
    private closedDoor!: Sprite;
    private openDoor!: Sprite;
    private openShadow!: Sprite;
    private shine!: Sprite;

    public onOpened?: () => void;
    public onClosed?: () => void;
    public onSpinout?: () => void;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.closedDoor = Sprite.from("/Game/images/door_closed.png");
        this.openDoor = Sprite.from("/Game/images/door_open.png");
        this.openShadow = Sprite.from("/Game/images/door_open_shadow.png");

        this.shine = Sprite.from("/Game/images/shine.png");

        const sprites = [
            this.closedDoor,
            this.openShadow,
            this.openDoor,
            this.shine
        ];

        sprites.forEach((sprite) => {
            sprite.anchor.set(0.5);
            let spritePos: Vector2;
            if (sprite === this.closedDoor) spritePos = new Vector2(27, 0);
            else if (sprite === this.openDoor) spritePos = new Vector2(580, 0);
            else if (sprite === this.shine) spritePos = new Vector2(0, 0);
            else spritePos = new Vector2(620, 40)
            sprite.position.set(spritePos.x, spritePos.y);
            this.addChild(sprite);
        });
        this.setClosed();
    }

    public setState(state: VaultState) {
        console.log("state given:", state);
        switch (state) {
            case VaultState.Closed:
                this.setClosed();
                this.onClosed?.();
                break;
            case VaultState.Opened:
                this.setOpened();
                this.onOpened?.();
                break;
            case VaultState.Spinout:
                this.onSpinout?.();
                break;
        }
    }

    private setClosed() {
        this.closedDoor.visible = true;
        this.openDoor.visible = false;
        this.openShadow.visible = false;
        this.stopShine();
        this.shine.visible = false;
    }

    private setOpened() {
        this.closedDoor.visible = false;
        this.openDoor.visible = true;
        this.openShadow.visible = true;
        this.shine.visible = true;
        this.playShine();
    }


    private playShine() {
        const scaleMax = 1.1;
        const scaleMin = 0.5;
        const spinDuration = 20;
        const twinkleDuration = 1;
        const rotationDir = Math.random() > 0.5 ? 1 : -1;
        gsap.to(this.shine, { 
            repeat: -1,
            rotation:`+=${Math.PI * 2 * rotationDir}`,
            duration: spinDuration,
            repeatDelay: 0,
            ease: "none",
        })
        const scaleTimeline = gsap.timeline({repeat: -1, yoyo: true, ease: "sine.inOut", repeatDelay:0});
        scaleTimeline.to(this.shine.scale, {
            x:scaleMax,
            y:scaleMax,
            duration: twinkleDuration,
        }).to(this.shine.scale, {
            x:scaleMin,
            y:scaleMin,
            duration: twinkleDuration,
        });
    }

    private stopShine() {
        gsap.killTweensOf(this.shine);
        gsap.killTweensOf(this.shine.scale);
    }
}