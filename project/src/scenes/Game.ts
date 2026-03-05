import Background from "../prefabs/Background";
import Scene from "../core/Scene";
import { RotationButton } from "../prefabs/buttons/base/RotationButton";
import { DoorDirection } from "../utils/types/registries";
import { CCWButton } from "../prefabs/buttons/CCWButton";
import { CWButton } from "../prefabs/buttons/CWButton";
import { VaultView } from "../prefabs/VaultView";
import { DoorHandle } from "../prefabs/DoorHandle";
import { VaultVFXManger } from "../prefabs/vfx/VaultVFXManager";
import { GameManager } from "../core/GameManager";

export default class Game extends Scene {
    name = "Game";

    private background!: Background;
    private CWrotationButton!: RotationButton;
    private CCWrotationButton!: RotationButton;
    private vault!: VaultView;
    private vaultVFXManager!: VaultVFXManger;
    private gameManager!: GameManager;
    private handle!: DoorHandle;

    load() {
        this.background = new Background();
        this.vault = new VaultView();
        this.vaultVFXManager = new VaultVFXManger();
        this.handle = new DoorHandle();
        this.CCWrotationButton = new CCWButton(this.handle); 
        this.CWrotationButton = new CWButton(this.handle);
        this.gameManager = new GameManager(this.handle, this.vaultVFXManager);

        this.gameManager.onVaultStateChanged = (state) => this.vault.setState(state);
        this.vault.onSpinout = () => this.gameManager.handleSpinout();
        this.vault.onOpened = () => this.gameManager.handleOpened();
        this.vault.onClosed = () => this.gameManager.handleClosed();

        this.CWrotationButton.onPressed = (direction: DoorDirection) => this.gameManager.handleRotation(direction);
        this.CCWrotationButton.onPressed = (direction: DoorDirection) => this.gameManager.handleRotation(direction);
        
        this.gameManager.onGameStarted = () => {
            this.CCWrotationButton.setActive(true);
            this.CWrotationButton.setActive(true);
        }

        this.gameManager.onGameFinished = () => {
            this.CCWrotationButton.setActive(false);
            this.CWrotationButton.setActive(false);
        }

        this.vault.addChild(this.handle);
        this.vault.addChild(this.vaultVFXManager);

        this.background.addChild(this.vault);
        this.addChild(this.background, this.CWrotationButton, this.CCWrotationButton);
    }

    async start() { }

    onResize(width: number, height: number) {
        if (this.background) this.background.resize(width, height); 
        if (this.CCWrotationButton) this.CCWrotationButton.resize(width, height);
        if (this.CWrotationButton) this.CWrotationButton.resize(width, height);
    }  
}
