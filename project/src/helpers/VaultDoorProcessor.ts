import { Debug } from "../utils/debug";
import { CommandPushResult, DoorCommand, DoorDirection, DoorState } from "../utils/types/vaultRegistries";
import { Combination } from "./Combination";

export class VaultDoorProcessor{
    state: DoorState;
    combination: Combination;
    debug: boolean;

    public onDoorStateChanged?: (state: DoorState) => void;
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
        this.combination.setCommands(commands);
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
        this.state = DoorState.Opened;
        if(this.debug) Debug.log("Door opened!");
        this.onDoorStateChanged?.(this.state);
    }

    public pushDirection(direction: DoorDirection) {
        this.combination.pushDirection(direction);
    }
    
}