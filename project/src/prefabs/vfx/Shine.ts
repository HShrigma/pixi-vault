import { Vector2 } from "pixi-spine";
import { Container, Sprite } from "pixi.js";
import { gsap } from "gsap";

export class Shine extends Container {
    private shine!: Sprite;

    constructor(position: Vector2) {
        super();
        this.shine = Sprite.from("/Game/images/shine.png");
        this.shine.position.set(position.x, position.y);
        this.shine.anchor.set(0.5);
        this.addChild(this.shine);
        this.setClosed();
    }

    public setClosed() {
        this.stopShine();
        this.shine.visible = false;
    }

    public setOpened() {
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
            rotation: `+=${Math.PI * 2 * rotationDir}`,
            duration: spinDuration,
            repeatDelay: 0,
            ease: "none",
        })
        const scaleTimeline = gsap.timeline({ repeat: -1, yoyo: true, ease: "sine.inOut", repeatDelay: 0 });
        scaleTimeline.to(this.shine.scale, {
            x: scaleMax,
            y: scaleMax,
            duration: twinkleDuration,
        }).to(this.shine.scale, {
            x: scaleMin,
            y: scaleMin,
            duration: twinkleDuration,
        });
    }

    private stopShine() {
        gsap.killTweensOf(this.shine);
        gsap.killTweensOf(this.shine.scale);
    }

}