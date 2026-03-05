import Background from "../prefabs/Background";
import Scene from "../core/Scene";
import { RotationButton } from "../prefabs/buttons/base/RotationButton";
import { DoorDirection } from "../utils/types/vaultRegistries";
import { CCWButton } from "../prefabs/buttons/CCWButton";
import { CWButton } from "../prefabs/buttons/CWButton";
import { VaultView } from "../prefabs/VaultView";
import { VaultStateManager } from "../core/vault/VaultStateManager";
import { DoorHandle } from "../prefabs/DoorHandle";
import { VaultVFXManger } from "../prefabs/vfx/VaultVFXManager";

export default class Game extends Scene {
    name = "Game";

    private background!: Background;
    private CWrotationButton!: RotationButton;
    private CCWrotationButton!: RotationButton;
    private vault!: VaultView;
    private vaultStateManager!: VaultStateManager;
    private vaultVFXManager!: VaultVFXManger;

    private handle!: DoorHandle;

    private handleRotation(direction: DoorDirection){
        this.handle.spin(direction);
        this.vaultStateManager.pushDirection(direction);
    }
    private handleOpened(){
        this.handle.setOpened();
        this.vaultVFXManager.handleOpened();
    }
    private handleClosed(){
        this.handle.setClosed();
        this.vaultVFXManager.handleClosed();
    }
    private handleSpinout(){
        this.handle.handleSpinout();
        this.vaultVFXManager.handleSpinout();
    }

    load() {
        this.background = new Background();
        this.vault = new VaultView();
        this.vaultStateManager = new VaultStateManager(true,true);
        this.vaultStateManager.onStateChanged = (state) => this.vault.setState(state);
        this.vaultVFXManager = new VaultVFXManger();
        
        this.handle = new DoorHandle();
        
        this.vault.onSpinout = () => this.handleSpinout();
        this.vault.onOpened = () => this.handleOpened();
        this.vault.onClosed = () => this.handleClosed();

        this.vaultStateManager.onCommandInProgress = () => this.handle.handleProgress();
        this.vaultStateManager.onCommandSolved = () => this.handle.handleSolved();

        this.CCWrotationButton = new CCWButton(this.handle); 
        this.CWrotationButton = new CWButton(this.handle);

        this.CWrotationButton.onPressed = (direction: DoorDirection) => this.handleRotation(direction);
        this.CCWrotationButton.onPressed = (direction: DoorDirection) => this.handleRotation(direction);
        
        this.vault.addChild(this.handle);
        this.vault.addChild(this.vaultVFXManager);

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
        if (this.CCWrotationButton) this.CCWrotationButton.resize(width, height);
        if (this.CWrotationButton) this.CWrotationButton.resize(width, height);
    }  
}
