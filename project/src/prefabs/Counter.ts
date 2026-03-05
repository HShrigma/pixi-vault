import { Container, Text } from "pixi.js";
import { gsap } from "gsap";

export class Counter extends Container {
    private count: number = 0;
    private textDisplay: Text;
    private enabled: boolean = false;
    private timer: gsap.core.Tween | null = null;

    constructor() {
        super();

        this.textDisplay = new Text(this.count.toString());
        this.textDisplay.style = { fill: "#fff", fontSize: 28, align: "right", fontFamily: "sans", fontWeight: "bold" };
        this.textDisplay.anchor.set(1,0.5);
        this.textDisplay.position.set(-445,-37);

        this.addChild(this.textDisplay);
        this.restartCounter();
    }

    public increment(): void {
        this.count++;
        if(this.count > 999) this.count = 0;
        this.updateText();
    }

    public decrement(): void {
        this.count--;
        if(this.count < 0) this.count = 0;
        this.updateText();
    }

    public setCount(value: number): void {
        this.count = value;
        this.updateText();
    }

    private updateText(): void {
        if (this.enabled) {
            this.textDisplay.visible = true;
            this.textDisplay.text = this.count.toString();
        }
        else 
            this.textDisplay.visible = false;
    }

    public restartCounter(){
        this.setCount(-1);
        this.enabled = true;
        this.scheduleNextIncrement();
    }

    private scheduleNextIncrement(): void {
        if (!this.enabled) return;

        this.increment();

        this.timer = gsap.delayedCall(1, () => {
            this.scheduleNextIncrement();
        });
    }
}