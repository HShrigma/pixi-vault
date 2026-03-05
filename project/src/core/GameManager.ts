import { DoorHandle } from "../prefabs/DoorHandle";
import { VaultVFXManger } from "../prefabs/vfx/VaultVFXManager";
import { DoorDirection, GameState } from "../utils/types/registries";
import { VaultStateManager } from "./vault/VaultStateManager";

export class GameManager{
    state!: GameState;
    handle!: DoorHandle;
    vaultVFXManager!: VaultVFXManger; 
    vaultStateManager!: VaultStateManager; 

    constructor(handle:DoorHandle, vfxManager: VaultVFXManger, stateManager: VaultStateManager){
        this.handle = handle;
        this.vaultVFXManager = vfxManager;
        this.vaultStateManager = stateManager;
        this.state = GameState.Playing;
    }

    setState(state: GameState) {
        this.state = state;
    }

    onStateEnter() {
        switch (this.state) {
            case GameState.Playing:
            case GameState.Win:
            case GameState.Lose:
                break;
            default:
                break;
        }
    }
    public handleRotation(direction: DoorDirection) {
        if(this.state !== GameState.Playing) return;
        this.handle.spin(direction);
        this.vaultStateManager.pushDirection(direction);
    }
    public handleOpened(){
        this.handle.setOpened();
        this.vaultVFXManager.handleOpened();
        this.setState(GameState.Win);
    }
    public handleClosed(){
        this.handle.setClosed();
        this.vaultVFXManager.handleClosed();
        this.setState(GameState.Playing);
    }
    public handleSpinout(){
        this.handle.handleSpinout();
        this.vaultVFXManager.handleSpinout();
        this.setState(GameState.Lose);
    }
}