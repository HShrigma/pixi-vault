import { Vector2 } from "pixi-spine";
import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container {
    name = "Background";
    private sprite!: Sprite;

    constructor() {
        super();
        this.init();
        this.sprite.texture.baseTexture.once('loaded', () => {
            this.resize(window.innerWidth, window.innerHeight);
        });
    }

    init() {
        const texture = Texture.from("/Game/images/background.png");
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
    }

    resize(width: number, height: number) {
        const textureWidth = this.sprite.texture.width;
        const textureHeight = this.sprite.texture.height;

        const threshold = new Vector2(600, 600);

        const baseThresholdScale = Math.max(
            threshold.x / textureWidth,
            threshold.y / textureHeight
        );

        let scale: number;

        if (width >= threshold.x && height >= threshold.y)
            scale = Math.max(width / textureWidth, height / textureHeight);
        else scale = Math.min(width / threshold.x, height / threshold.y) * baseThresholdScale;

        this.scale.set(scale);
        this.position.set(width / 2, height / 2);
        this.sprite.position.set(0, 0);
    }
}