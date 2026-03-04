import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";
import { DoorHandle } from "../DoorHandle";

export class CCWButton extends RotationButton{
    constructor(handle: DoorHandle){
        const position = new Vector2(0, 0.1);
        super(position, handle);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CCW;
    }
}