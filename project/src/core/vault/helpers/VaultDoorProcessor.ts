import { Debug } from "../../../utils/debug";
import { CommandPushResult, DoorCommand, DoorDirection, DoorState } from "../../../utils/types/vaultRegistries";
import { Combination } from "./Combination";

export class VaultDoorProcessor{
    state: DoorState;
    combination: Combination;
    debug: boolean;

    public onStateChanged?: (state: DoorState) => void;
    public onCommandSolved?: () => void;
    public onCommandInProgress?: () => void;
    public onCommandFailed?: () => void;

    constructor(commands: DoorCommand[] = [], debug: boolean = false) {
        this.state = DoorState.Closed;
        this.debug = debug;
        this.combination = new Combination(commands, debug);
        this.combination.onDirectionPushedResult = (result: CommandPushResult) => this.onDirectionPushedResultHandler(result);
        this.combination.onCombinationSolved = () => this.onCombinationSolvedHandler();
    }

    public setCombination(commands: DoorCommand[]) {
        if (this.state !== DoorState.Opened) this.combination.setCommands(commands);
    }

    public setState(state: DoorState) 
    { 
        this.state = DoorState.Opened;
        this.state = state;
        this.onStateChanged?.(this.state);
    }
    
    private onDirectionPushedResultHandler(result: CommandPushResult){
        switch (result) {
            case CommandPushResult.Solved:
                if (this.debug) Debug.log("Command was solved.");
                this.onCommandSolved?.();
                break;
            case CommandPushResult.InProgress:
                if (this.debug) Debug.log("Command not solved yet.");
                this.onCommandInProgress?.();
                break;
            case CommandPushResult.Failed:
                if (this.debug) Debug.log("Command failed. Wrong direction.");
                this.onCommandFailed?.();
                break;
            default:
                if (this.debug) Debug.warn("Unknown CommandPushResult:", result);
                break;
        }
        if(result){
            return;
        }
    }

    private onCombinationSolvedHandler() {
        if(this.debug) Debug.log("Door opened!");
        this.setState(DoorState.Opened);
    }

    public pushDirection(direction: DoorDirection) {
        switch(this.state){
            case DoorState.Closed:
                this.combination.pushDirection(direction);
                break;
            case DoorState.Opened:
                break;
            default:
                if (this.debug) Debug.warn("No such state:", this.state);
        }
    }
    
}