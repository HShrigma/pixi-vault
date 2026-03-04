import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";

export class CWButton extends RotationButton{
    constructor(){
        const position = new Vector2(1, 0.1);
        super(position);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CW;
    }
}