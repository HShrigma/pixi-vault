import { Color, Container, Graphics, } from "pixi.js";
import { DoorDirection } from "../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";

export class RotationButton extends Container{
    protected rotationDir: DoorDirection = 0;
    onPressed?: (direction: DoorDirection) => void;

    constructor(position: Vector2){
        super();
        const bg = new Graphics()
            .beginFill(new Color())
            .drawRoundedRect(0, 0, 80, 80, 12)
            .endFill();

        this.addChild(bg);

        this.interactive = true;
        this.cursor = "pointer";
        this.position.copyFrom(position);

        this.on("pointerdown", () => this.push());
        this.on("pointerenter", () => this.scale.set(1.1));
        this.on("pointerleave", () => this.scale.set(1.0));
    }

    private push(){
        this.onPressed?.(this.rotationDir);
    }
}