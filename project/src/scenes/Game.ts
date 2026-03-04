import Background from "../prefabs/Background";
import Scene from "../core/Scene";
import { RotationButton } from "../prefabs/buttons/base/RotationButton";
import { DoorDirection } from "../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";
import { CCWButton } from "../prefabs/buttons/CCWButton";
import { CWButton } from "../prefabs/buttons/CWButton";
import { VaultView } from "../prefabs/VaultView";
import { VaultStateManager } from "../core/vault/VaultStateManager";
import { Renderer } from "pixi.js";
import { DoorHandle } from "../prefabs/DoorHandle";

export default class Game extends Scene {
    name = "Game";

    private background!: Background;
    private CWrotationButton!: RotationButton;
    private CCWrotationButton!: RotationButton;
    private vault!: VaultView;
    private vaultStateManager!: VaultStateManager;
    private handle!: DoorHandle;

    load() {
        this.background = new Background();

        this.CCWrotationButton = new CCWButton(new Vector2(0,0));
        this.CWrotationButton = new CWButton(new Vector2(140, 0));

        this.vault = new VaultView();
        this.vaultStateManager = new VaultStateManager(true,true);

        this.CWrotationButton.onPressed = (direction: DoorDirection) => this.vaultStateManager.pushDirection(direction);
        this.CCWrotationButton.onPressed = (direction: DoorDirection) => this.vaultStateManager.pushDirection(direction);
        this.vaultStateManager.onStateChanged = (state) => this.vault.setState(state);
        
        this.handle = new DoorHandle();
        
        this.vault.onSpinout = () => this.handle.handleSpinout();
        this.vault.onOpened = () => this.handle.setOpened();
        this.vault.onClosed = () => this.handle.setClosed();

        this.vault.addChild(this.handle);
        this.background.addChild(this.vault);
        this.addChild(this.background, this.CWrotationButton, this.CCWrotationButton);
    }

    async start() {
        // Example of how to play a spine animation
        // const vine = new SpineAnimation("vine-pro");

        // vine.stateData.setMix("grow", "grow", 0.5);

        // vine.x = 0;
        // vine.y = window.innerHeight / 2 - 50;

        // this.background.addChild(vine);

        // while (vine) {
        //     await vine.play("grow");
        // }
    }

    onResize(width: number, height: number) {
        if (this.background) this.background.resize(width, height); 
        // if (this.vault) this.vault.resize(width, height);
        
    }  
}
