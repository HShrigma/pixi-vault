import { Vector2 } from "pixi-spine";
import { RotationButton } from "./base/RotationButton";
import { DoorDirection } from "../../utils/types/vaultRegistries";
import { DoorHandle } from "../DoorHandle";

export class CWButton extends RotationButton{
    constructor(handle: DoorHandle){
        const position = new Vector2(1, 0.1);
        super(position, handle);
        this.normalizedPosition = position;
        this.rotationDir = DoorDirection.CW;
    }
}