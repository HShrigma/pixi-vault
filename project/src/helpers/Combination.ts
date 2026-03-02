import { DoorCommand, DoorDirection } from "../utils/types/vaultRegistries";

export class Combination{
    commands: DoorCommand[];
    currentIndex: number;
    currentAmount: number;

    onDirectionPushedResult?: (success: boolean) => void;
    onCombinationSolved?: () => void;

    constructor(commands: DoorCommand[]){
        this.commands = commands;
        this.currentIndex = 0;
        this.currentAmount = 0;
    }

    private getCurrentCommandRequired(): DoorCommand | undefined {
        if(!this.commands) return;
        if(this.commands.length === 0) return;
        return this.commands[this.currentIndex];
    }

    private solveCommand(){
        this.currentIndex++;
        this.currentAmount = 0;
    }
    public pushDirection(direction: DoorDirection){
        let command = this.getCurrentCommandRequired();
        if(!command) return;
        this.currentAmount += direction === command.direction ? 1 : -1;

        const result = this.currentAmount >= command.amount;
        if (result) this.solveCommand();

        if (this.currentIndex === this.commands.length){
            this.onCombinationSolved?.();
        }

        this.onDirectionPushedResult?.(result);
    }
}