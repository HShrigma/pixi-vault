import { Container, Sprite, Texture } from "pixi.js";

export default class Background extends Container {
    name = "Background";
    private sprite!: Sprite;

    constructor() {
        super();
        this.init();
    }

    init() {
        const texture = Texture.from("/Game/images/background.png");
        this.sprite = new Sprite(texture);

        this.sprite.anchor.set(0.5);

        this.addChild(this.sprite);

        this.resize(window.innerWidth, window.innerHeight);
    }

    resize(width: number, height: number) {
        const texture = this.sprite.texture;

        const textureRatio = texture.width / texture.height;
        const screenRatio = width / height;

        let scale:number;

        scale = (screenRatio > textureRatio) ?  width / texture.width : height / texture.height;

        this.sprite.scale.set(scale);

        this.sprite.x = width / 2;
        this.sprite.y = height / 2;
    }
}
