export class VaultDoorProcessor{
    state: DoorState;
    combination: DoorCommand[];
    currentIndex: number;

    public onDoorStateChanged?: (state: DoorState) => void;
    public onCommandSucceeded?: (command: DoorCommand) => void;
    public onCommandFailed?: (command: DoorCommand) => void;

    constructor(){
        this.state = DoorState.Closed;
        this.combination = [];
        this.currentIndex = 0;
    }

    private isCommandCorrect(command: DoorCommand) {
        const currentCombination = this.getCurrentCommandRequired();
        if(!currentCombination) return false;
        return currentCombination.amount === command.amount && currentCombination.direction === command.direction
    }

    private getCurrentCommandRequired(){
        if(!this.combination) return;
        if(this.combination.length === 0) return;
        return this.combination[this.currentIndex];
    }

    public setCombination(combination: DoorCommand[]) {
        this.combination = combination;
    } 

    public pushCommand(command: DoorCommand) {
        if(this.state === DoorState.Opened) return;

        if(this.isCommandCorrect(command)){
            this.currentIndex++;
            this.onCommandSucceeded?.(command);
            if(this.currentIndex >= this.combination.length)
                this.onDoorStateChanged?.(this.state);
            return;
        }
        this.onCommandFailed?.(command);
    }

}