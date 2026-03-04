import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";

export class CCWButton extends RotationButton{
    constructor(){
        const position = new Vector2(0, 0.1);
        super(position);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CCW;
    }
}