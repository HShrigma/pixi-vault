import { Debug } from "../utils/debug";
import { DoorCommand, DoorDirection, DoorState } from "../utils/types/vaultRegistries";
import { Combination } from "./Combination";

export class VaultDoorProcessor{
    state: DoorState;
    combination: Combination;
    debug: boolean;

    public onDoorStateChanged?: (state: DoorState) => void;
    public onCommandSolved?: () => void;
    public onCommandUnsolved?: () => void;

    constructor(commands: DoorCommand[], debug: boolean = false) {
        this.state = DoorState.Closed;
        this.debug = debug;
        this.combination = new Combination(commands);
        this.combination.onDirectionPushedResult = (success: boolean) => this.onDirectionPushedResultHandler(success);
        this.combination.onCombinationSolved = () => this.onCombinationSolvedHandler();
    }

    private onDirectionPushedResultHandler(result: boolean){
        if(result){
            if(this.debug) Debug.log("Command was solved.");
            this.onCommandSolved?.();
            return;
        }
        if (this.debug) Debug.log("Command not solved yet.");
        this.onCommandUnsolved?.();
    }

    private onCombinationSolvedHandler() {
        this.state = DoorState.Opened
        this.onDoorStateChanged?.(this.state);
    }

    public pushDirection(direction: DoorDirection) {
        this.combination.pushDirection(direction);
    }
    
}