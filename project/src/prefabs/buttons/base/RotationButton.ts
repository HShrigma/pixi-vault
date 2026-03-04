import { Color, Container, Graphics, } from "pixi.js";
import { DoorDirection } from "../../../utils/types/vaultRegistries";
import { Vector2 } from "pixi-spine";
import { DoorHandle } from "../../DoorHandle";

export class RotationButton extends Container{
    protected rotationDir: DoorDirection = 0;
    onPressed?: (direction: DoorDirection) => void;
    protected bg: Graphics;
    protected baseSize = 80; 
    protected padding = 20; 
    private handle: DoorHandle;

    constructor(position: Vector2, handle: DoorHandle){
        super();
        this.handle = handle;
        this.bg = new Graphics()
            .beginFill(new Color())
            .drawRoundedRect(0, 0, this.baseSize, this.baseSize, 12)
            .endFill();
        this.bg.pivot.set(0.5);
        this.addChild(this.bg);

        this.interactive = true;
        this.cursor = "pointer";
        this.on("pointerdown", () => this.push());
        this.on("pointerenter", () => this.scale.set(1.1));
        this.on("pointerleave", () => this.scale.set(1.0));
        
        this._normalizedX = position.x;
        this._normalizedY = position.y;

        this.resize(window.innerWidth, window.innerHeight);
    }

    private _normalizedX: number = 0.5;
    private _normalizedY: number = 0.5;
    
    public get normalizedPosition(): Vector2 {
        return new Vector2(this._normalizedX, this._normalizedY);
    }
    
    public set normalizedPosition(pos: Vector2) {
        this._normalizedX = pos.x;
        this._normalizedY = pos.y;
    }

    private push(){
        if(this.handle.isSpinning) return;
        this.onPressed?.(this.rotationDir);
    }

    public resize(width: number, height: number){
        // Calculate scale factor based on screen size
        const minDimension = Math.min(width, height);
        const baseDimension = 800;
        
        const scaleFactor = Math.max(0.6, Math.min(1.2, minDimension / baseDimension));
        const buttonSize = this.baseSize * scaleFactor;
        
        this.bg.clear();
        this.bg.beginFill(new Color())
            .drawRoundedRect(0, 0, buttonSize, buttonSize, 12 * scaleFactor)
            .endFill();
        this.bg.pivot.set(buttonSize / 2, buttonSize / 2);
        
        if (this._normalizedX === 0) {
            this.position.set(this.padding + buttonSize/2, this._normalizedY * height);
        } else if (this._normalizedX === 1) {
            this.position.set(width - this.padding - buttonSize/2, this._normalizedY * height);
        } else {
            this.position.set(this._normalizedX * width, this._normalizedY * height);
        }
        
        this.scale.set(1);
    }
}