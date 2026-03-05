import { VaultDoorProcessor } from "./helpers/VaultDoorProcessor";
import { DoorDirection, DoorState, VaultState } from "../../utils/types/registries";
import { CombinationGenerator } from "../../utils/combinationGenerator";
import { CommandInterpreter } from "../../utils/commandInterpreter";

export class VaultStateManager{
    processor: VaultDoorProcessor;
    debug: boolean;
    state!: VaultState;

    onStateChanged?: (state: VaultState) => void;
    onCommandInProgress?: () => void;
    onCommandSolved?: () => void;

    constructor(debug: boolean = true, debugProcessor: boolean = false) {
        this.processor = new VaultDoorProcessor([], debugProcessor);
        this.processor.onStateChanged = (state: DoorState) => this.handleDoorStateChanged(state);
        this.processor.onCommandFailed = () => this.setState(VaultState.Spinout);
        this.processor.onCommandInProgress = () => this.onCommandInProgress?.();
        this.processor.onCommandSolved = () => this.onCommandSolved?.();
        this.debug = debug;
    }

    public pushDirection(direction: DoorDirection) {
        if (this.state === VaultState.Closed) this.processor.pushDirection(direction)
    };
    
    public handleDoorStateChanged(state: DoorState){
        if (state === DoorState.Opened) this.setState(VaultState.Opened);
    }
   
    public setState(state: VaultState){
        this.state = state;
        this.handleStateChanged();
        this.onStateChanged?.(this.state);
    }

    private handleStateChanged(){
        switch(this.state){
            case VaultState.Closed: 
                this.refreshCombination();
                break;
            case VaultState.Spinout:
                break;
            case VaultState.Opened:
                break;
            default: break;
        }
    }

    private refreshCombination(){
        const combination = CombinationGenerator.getRandomCombination();
        this.processor.setState(DoorState.Closed);
        this.processor.setCombination(combination);
        if(this.debug) console.log("Combination:", CommandInterpreter.commandsToString(combination));
    }
}