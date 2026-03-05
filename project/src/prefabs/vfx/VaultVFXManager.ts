import { Container } from "pixi.js";
import { ShineVFX } from "./ShineVFX";
import { Counter } from "../Counter";

export class VaultVFXManger extends Container{
    shineFX!: ShineVFX;
    counter!: Counter;
    
    constructor(){
        super();
        this.shineFX = new ShineVFX();
        this.counter = new Counter();
        this.addChild(this.shineFX);
        this.addChild(this.counter);
    }

    public handleOpened(){
        this.shineFX.playShines();
    }

    public handleClosed(){
        this.shineFX.stopShines();
        this.counter.restartCounter();
    }

    public handleSpinout(){

    }
}