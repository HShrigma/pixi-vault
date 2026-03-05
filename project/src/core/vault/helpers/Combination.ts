import { Debug } from "../../../utils/debug";
import { CommandPushResult, DoorCommand, DoorDirection } from "../../../utils/types/registries";

export class Combination{
    commands!: DoorCommand[];
    currentIndex!: number;
    currentAmount!: number;
    debug: boolean;

    onDirectionPushedResult?: (result: CommandPushResult) => void;
    onCombinationSolved?: () => void;

    constructor(commands: DoorCommand[] = [], debug: boolean = false){
        this.setCommands(commands);
        this.debug = debug;
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

    public setCommands (commands: DoorCommand[]){
        this.commands = commands;
        this.currentIndex = 0;
        this.currentAmount = 0;
    }
    public pushDirection(direction: DoorDirection){
        let command = this.getCurrentCommandRequired();
        if(!command) return; // handle empty commands edge case
        if(this.debug){
            Debug.log("Direction:", direction);
            Debug.log("Index:", this.currentIndex);
            Debug.log("Amount:", this.currentAmount);
        }

        // handle wrong input
        if(direction !== command.direction) 
        {
            this.onDirectionPushedResult?.(CommandPushResult.Failed);
            return;
        }

        // increment for correct input
        this.currentAmount ++; 
        const result = this.currentAmount >= command.amount;

        // update index and amount on solved
        if (result) this.solveCommand();
        this.onDirectionPushedResult?.(result ? CommandPushResult.Solved : CommandPushResult.InProgress);

        // signal combination solved once final command is solved
        if (this.currentIndex === this.commands.length){
            this.onCombinationSolved?.();
        }
    }
}