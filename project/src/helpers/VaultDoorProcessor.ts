import { Combination } from "./Combination";

export class VaultDoorProcessor{
    state: DoorState;
    combination: Combination;

    public onDoorStateChanged?: (state: DoorState) => void;
    public onCommandSucceeded?: () => void;
    public onCommandFailed?: () => void;

    constructor(commands: DoorCommand[]){
        this.state = DoorState.Closed;
        this.combination = new Combination(commands);
        this.combination.onCommandPushedResult = (success: boolean) => this.onCommandPushedResultHandler(success);
        this.combination.onCombinationSolved = () => this.onCombinationSolvedHandler();
    }

    public pushCommand(command: DoorCommand) {
        if(this.state === DoorState.Opened) return;
        this.combination.pushCommand(command);
    }

    private onCommandPushedResultHandler(result: boolean){
        result ? this.onCommandSucceeded?.() : this.onCommandFailed?.();
    }
    private onCombinationSolvedHandler() {
        this.state = DoorState.Opened
        this.onDoorStateChanged?.(this.state);
    }
}