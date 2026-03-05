import { Container, Sprite } from "pixi.js";
import { VaultState } from "../utils/types/registries";
import { Vector2 } from "pixi-spine";

export class VaultView extends Container {
    private closedDoor!: Sprite;
    private openDoor!: Sprite;
    private openShadow!: Sprite;

    public onOpened?: () => void;
    public onClosed?: () => void;
    public onSpinout?: () => void;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.closedDoor = Sprite.from("door_closed");
        this.openDoor = Sprite.from("door_open");
        this.openShadow = Sprite.from("door_open_shadow");

        const sprites = [
            this.closedDoor,
            this.openShadow,
            this.openDoor,
        ];

        sprites.forEach((sprite) => {
            sprite.anchor.set(0.5);
            let spritePos: Vector2;
            if (sprite === this.closedDoor) spritePos = new Vector2(27, 0);
            else if (sprite === this.openDoor) spritePos = new Vector2(580, 0);
            else spritePos = new Vector2(620, 40)
            sprite.position.set(spritePos.x, spritePos.y);
            this.addChild(sprite);
        });
        this.setClosed();
    }

    public setState(state: VaultState) {
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
    }

    private setOpened() {
        this.closedDoor.visible = false;
        this.openDoor.visible = true;
        this.openShadow.visible = true;
    }
}