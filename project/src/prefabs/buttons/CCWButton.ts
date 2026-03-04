import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";

export class CCWButton extends RotationButton{
    constructor(position: Vector2){
        super(position);
        this.rotationDir = DoorDirection.CCW;
    }
}