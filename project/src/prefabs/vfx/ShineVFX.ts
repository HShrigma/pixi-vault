import { Container } from "pixi.js";
import { Shine } from "./Shine";
import { getRandomNumber } from "../../utils/misc";
import { Vector2 } from "pixi-spine";

export class ShineVFX extends Container {
    private shines!: Shine[]

    constructor(){
        super();
        this.init();
    }

    private init(){
        const shinesCount = getRandomNumber(6,8);
        const limits = new Vector2(160,100);

        this.shines = [];

        for (let index = 0; index < shinesCount; index++) {
            let tempPos = new Vector2(
                getRandomNumber(-limits.x, limits.x),
                getRandomNumber(-limits.y, limits.y)
            );
            this.shines.push(new Shine(tempPos));
        }
        this.shines.forEach(shine => this.addChild(shine));
    }

    public playShines(){
        this.shines.forEach(shine => shine.setOpened());
    }
    public stopShines(){
        this.shines.forEach(shine => shine.setClosed());
    }
}