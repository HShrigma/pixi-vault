import { Debug } from "./debug";
import { DoorCommand, DoorDirection } from "./types/registries";

const getCommandFromString = (input: string, debug: boolean = false): DoorCommand | undefined => {
    let items = input.toUpperCase().split(' ');
    if(items.length !== 2) return;

    let amount = Number.parseInt(items[0]);
    if (debug) Debug.log("amount:", amount);
    if(!amount) return;

    let direction = items[1] === "CW" ?  DoorDirection.CW : 
        items[1] === "CCW" ? DoorDirection.CCW : undefined;
    if (debug) Debug.log("direction:", direction);
    if(direction === undefined) return;

    return { amount: amount, direction: direction };
}

const parseCommands = (input: string, debug: boolean = false): DoorCommand[] | undefined => {
    const splitInput = input.trim().split(",");
    let res: DoorCommand[] = [];
    splitInput.forEach(rawCommand => { 
        let command = getCommandFromString(rawCommand);
        if(!command) return;
        if (debug) Debug.log("Command: ", command, "valid. Pushing");
        res.push(command);
    });
    if (debug) Debug.log("RES:", res, "inputs:", splitInput);
    if(res.length !== splitInput.length) return;
    return res;
}

const commandsToString = (commands: DoorCommand[]) => {
    if(!commands) return;
    return commands.map(command => `${command.amount} ${command.direction === DoorDirection.CW ? "CW" : "CCW"}`).join(", ");
}

export const CommandInterpreter = {
    parseCommands,
    commandsToString
}