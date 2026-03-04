import { Container, Sprite} from "pixi.js";
import { VaultState } from "../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";

export class VaultView extends Container {
    private closedDoor!: Sprite;
    private openDoor!: Sprite;
    private handle!: Sprite;
    private handleShadow!: Sprite;
    private openShadow!: Sprite;

    constructor(){
        super();
        this.init();
    }

    private init(){
        this.closedDoor = Sprite.from("/Game/images/door_closed.png");
        this.openDoor = Sprite.from("/Game/images/door_open.png");

        this.handleShadow = Sprite.from("/Game/images/door_handle_shadow.png");
        this.handle = Sprite.from("/Game/images/door_handle.png");

        this.openShadow = Sprite.from("/Game/images/door_open_shadow.png");

        const sprites = [
            this.closedDoor,
            this.openShadow,
            this.openDoor,
            this.handleShadow,
            this.handle,
        ];

        sprites.forEach((sprite) => {
            sprite.anchor.set(0.5);
            let spritePos:Vector2;
            if(sprite === this.closedDoor) spritePos = new Vector2(27,0);
            else if(sprite === this.handle) spritePos = new Vector2(-10,0);
            else if(sprite === this.handleShadow) spritePos = new Vector2(1,10);
            else if(sprite === this.openDoor) spritePos = new Vector2(580,0);
            else spritePos = new Vector2(620,40)
            sprite.position.set(spritePos.x, spritePos.y);
            this.addChild(sprite);
        });
        this.setClosed();
    }

    public setState(state: VaultState) {
        switch (state) {
            case VaultState.Closed:
                this.setClosed();
                break;
            case VaultState.Opened:
                this.setOpened();
                break;
            case VaultState.Spinout:
                this.spinoutEffect();
                break;
        }
    }

    private setClosed() {
        this.closedDoor.visible = true;
        this.handle.visible = true;
        this.handleShadow.visible = true;

        this.openDoor.visible = false;
        this.openShadow.visible = false;
    }

    private setOpened() {
        this.closedDoor.visible = false;
        this.handle.visible = false;
        this.handleShadow.visible = false;

        this.openDoor.visible = true;
        this.openShadow.visible = true;
    }

    private spinoutEffect() {
        this.handle.rotation += 0.2;
    }
}