import { Container, Sprite, Texture } from "pixi.js";
import { centerObjects } from "../utils/misc";

export default class Background extends Container {
    name = "Background";
    private sprite!: Sprite;

    constructor() {
        super();
        this.init();
        centerObjects(this);
    }

    init() {
        const texture = Texture.from("/Game/images/background.png");
        this.sprite = new Sprite(texture);

        this.sprite.anchor.set(0.5);

        this.addChild(this.sprite);

        this.resize(window.innerWidth, window.innerHeight);
    }

    resize(width: number, height: number) {
        this.sprite.width = width;
        this.sprite.height = height;

        centerObjects(this);
    }
}
