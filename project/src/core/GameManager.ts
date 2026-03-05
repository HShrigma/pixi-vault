import { DoorHandle } from "../prefabs/DoorHandle";
import { VaultVFXManger } from "../prefabs/vfx/VaultVFXManager";
import { DoorDirection, GameState, VaultState } from "../utils/types/registries";
import { VaultStateManager } from "./vault/VaultStateManager";
import { gsap } from "gsap";

export class GameManager{
    state!: GameState;
    handle!: DoorHandle;
    vaultVFXManager!: VaultVFXManger; 
    vaultStateManager!: VaultStateManager; 
    private timer: gsap.core.Tween | null = null;

    onVaultStateChanged?: (state: VaultState) => void;

    constructor(handle:DoorHandle, vfxManager: VaultVFXManger){
        this.handle = handle;
        this.vaultVFXManager = vfxManager;
        this.vaultStateManager = new VaultStateManager();
        this.vaultStateManager.onStateChanged = (state) => this.onVaultStateChanged?.(state);
        this.vaultStateManager.onCommandInProgress = () => this.handleCommandProgress();
        this.vaultStateManager.onCommandSolved = () =>  this.handleCommandSolved();
        this.setState(GameState.Playing);
    }

    setState(state: GameState) {
        if(this.state === state) return;
        this.state = state;
        this.onStateEnter();
    }

    onStateEnter() {
        switch (this.state) {
            case GameState.Playing:
                this.handle.setClosed();
                this.vaultVFXManager.handleClosed();
                this.vaultStateManager.setState(VaultState.Closed);
                break;
            case GameState.Win:
                this.handle.onWin();
                this.vaultVFXManager.onWin();
                this.setPlayingAfterSeconds(5);
                break;
            case GameState.Lose:
                this.handle.onLose();
                this.vaultVFXManager.onLose();
                this.setPlayingAfterSeconds(3);
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
        this.setState(GameState.Win);
    }

    public handleClosed(){
        this.setState(GameState.Playing);
    }

    public handleSpinout(){
        this.setState(GameState.Lose);
    }

    private handleCommandSolved(){
        this.handle.handleSolved();
    }

    private handleCommandProgress(){
        this.handle.handleProgress();
    }

    private setPlayingAfterSeconds(seconds: number): void {
        this.timer = gsap.delayedCall(seconds, () => {
            this.setState(GameState.Playing);
        });
    }
}