import config from "../config";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import { Player } from "../prefabs/Player";
import Scene from "../core/Scene";
import SpineAnimation from "../core/SpineAnimation";
import { RotationButton } from "../prefabs/RotationButton";
import { DoorDirection } from "../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";
import { CCWButton } from "../prefabs/CCWButton";
import { CWButton } from "../prefabs/CWButton";
import { Vault } from "../prefabs/Vault";

export default class Game extends Scene {
    name = "Game";

    private player!: Player;
    private background!: ParallaxBackground;
    private CWrotationButton!: RotationButton;
    private CCWrotationButton!: RotationButton;
    private vault!: Vault;

    load() {
        this.background = new ParallaxBackground(config.backgrounds.forest);
        this.player = new Player();

        this.vault = new Vault();

        this.CCWrotationButton = new CCWButton(new Vector2(0,0));
        this.CWrotationButton = new CWButton(new Vector2(140, 0));

        this.CWrotationButton.onPressed = (direction: DoorDirection) => this.vault.pushDirection(direction);
        this.CCWrotationButton.onPressed = (direction: DoorDirection) => this.vault.pushDirection(direction);

        this.player.x = window.innerWidth / 2;
        this.player.y = window.innerHeight - this.player.height / 3;

        this.background.initPlayerMovement(this.player);

        this.addChild(this.background, this.player, this.CWrotationButton, this.CCWrotationButton, this.vault);
    }

    async start() {
        // Example of how to play a spine animation
        const vine = new SpineAnimation("vine-pro");

        vine.stateData.setMix("grow", "grow", 0.5);

        vine.x = 0;
        vine.y = window.innerHeight / 2 - 50;

        this.background.addChild(vine);

        while (vine) {
            await vine.play("grow");
        }
    }

    onResize(width: number, height: number) {
        if (this.player) {
            this.player.x = width / 2;
            this.player.y = height - this.player.height / 3;
        }

        if (this.background) {
            this.background.resize(width, height);
        }
    }
}
