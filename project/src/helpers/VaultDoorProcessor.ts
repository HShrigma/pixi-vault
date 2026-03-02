import { DoorCommand, DoorDirection, DoorState } from "../utils/types/vaultRegistries";
import { Combination } from "./Combination";

export class VaultDoorProcessor{
    state: DoorState;
    combination: Combination;

    public onDoorStateChanged?: (state: DoorState) => void;
    public onCommandSolved?: () => void;
    public onCommandUnsolved?: () => void;

    constructor(commands: DoorCommand[]){
        this.state = DoorState.Closed;
        this.combination = new Combination(commands);
        this.combination.onDirectionPushedResult = (success: boolean) => this.onDirectionPushedResultHandler(success);
        this.combination.onCombinationSolved = () => this.onCombinationSolvedHandler();
    }

    private onDirectionPushedResultHandler(result: boolean){
        result ? this.onCommandSolved?.() : this.onCommandUnsolved?.();
    }

    private onCombinationSolvedHandler() {
        this.state = DoorState.Opened
        this.onDoorStateChanged?.(this.state);
    }

    public pushDirection(direction: DoorDirection) {
        this.combination.pushDirection(direction);
    }
    
}