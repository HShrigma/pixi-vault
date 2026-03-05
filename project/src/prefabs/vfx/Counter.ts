import { Container, Text } from "pixi.js";
import { gsap } from "gsap";

export class Counter extends Container {
    private count: number = 0;
    private textDisplay: Text;
    private counting: boolean = false;
    private timer: gsap.core.Tween | null = null;

    constructor() {
        super();

        this.textDisplay = new Text(this.count.toString());
        this.textDisplay.style = { fill: "#fff", fontSize: 28, align: "right", fontFamily: "sans", fontWeight: "bold" };
        this.textDisplay.anchor.set(1,0.5);
        this.textDisplay.position.set(-443,-37);

        this.addChild(this.textDisplay);
    }

    public increment(): void {
        this.count++;
        if(this.count > 999) this.count = 0;
        this.updateText();
    }

    public setCount(value: number): void {
        this.count = value;
        this.updateText();
    }

    private updateText(): void {
        if (this.counting) {
            this.textDisplay.visible = true;
            this.textDisplay.text = this.count.toString();
        }
        else 
            this.textDisplay.visible = false;
    }

    public restartCounter(){
        this.setCount(-1);
        this.counting = true;
        this.textDisplay.style.fill = "#fff";
        this.textDisplay.style.fontSize= 28;
        this.textDisplay.visible = true;
        this.scheduleNextIncrement();
    }

    public setWinText(){
        this.counting = false;
        this.textDisplay.style.fill = "#0f0";
        this.textDisplay.style.fontSize= 25;
        this.textDisplay.text = "WIN";
        this.scheduleBlink();
    }
    public setLoseText(){
        this.counting = false;
        this.textDisplay.style.fill = "#f00";
        this.textDisplay.style.fontSize = 25;
        this.textDisplay.text = "LOSE";
        this.scheduleBlink();
    }

    private scheduleBlink(): void {
        if (this.counting) return;

        this.textDisplay.visible = this.textDisplay.visible ? false : true;

        this.timer = gsap.delayedCall(.3, () => {
            this.scheduleBlink();
        });
    }
    private scheduleNextIncrement(): void {
        if (!this.counting) return;

        this.increment();

        this.timer = gsap.delayedCall(1, () => {
            this.scheduleNextIncrement();
        });
    }
}