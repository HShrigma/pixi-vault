import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";
import { DoorHandle } from "../DoorHandle";

export class CWButton extends RotationButton{
    constructor(handle: DoorHandle){
        const position = new Vector2(0.6, 0.1);
        const spritePath = "/Game/images/right-arrow-button-icon.png";
        super(position, handle, spritePath);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CW;
    }
}