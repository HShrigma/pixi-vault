import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/registries";
import { DoorHandle } from "../DoorHandle";

export class CCWButton extends RotationButton{
    constructor(handle: DoorHandle){
        const position = new Vector2(0.4, 0.1);
        const spritePath = "left-arrow-button-icon";
        super(position, handle, spritePath);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CCW;
    }
}