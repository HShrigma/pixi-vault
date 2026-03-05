import { Container } from "pixi.js";
import { ShineVFX } from "./ShineVFX";

export class VaultVFXManger extends Container{
    shineFX!: ShineVFX;
    
    constructor(){
        super();
        this.shineFX = new ShineVFX();
        this.addChild(this.shineFX);
    }

    public handleOpened(){
        this.shineFX.playShines();
    }
    public handleClosed(){
        this.shineFX.stopShines();
    }
    public handleSpinout(){

    }
}