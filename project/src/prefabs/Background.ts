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

        const scale = Math.max(
            width / textureWidth,
            height / textureHeight
        );

        this.scale.set(scale);

        this.position.set(width / 2, height / 2);

        this.sprite.position.set(0, 0);
    }
}
