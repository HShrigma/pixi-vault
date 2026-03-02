export class Combination{
    commands: DoorCommand[];
    currentIndex: number;

    onCommandPushedResult?: (success: boolean) => void;
    onCombinationSolved?: () => void;

    constructor(commands: DoorCommand[]){
        this.commands = commands;
        this.currentIndex = 0;
    }

    private getCurrentCommandRequired(): DoorCommand | undefined {
        if(!this.commands) return;
        if(this.commands.length === 0) return;
        return this.commands[this.currentIndex];
    }

    private isCommandCorrect(command: DoorCommand): boolean {
        const currentCombination = this.getCurrentCommandRequired();
        if(!currentCombination) return false;
        return currentCombination.amount === command.amount && currentCombination.direction === command.direction
    }

    public pushCommand(command: DoorCommand) {
        const result = this.isCommandCorrect(command);
        this.onCommandPushedResult?.(result);
        if(!result) return;
        this.currentIndex++;
        if (this.currentIndex >= this.commands.length) this.onCombinationSolved?.();
    }
}