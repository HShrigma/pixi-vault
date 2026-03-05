import { DoorCommand, DoorDirection } from "./types/registries";

const getRandomCommand = (dir: DoorDirection | undefined): DoorCommand => {
    if (dir === undefined)
        dir = Math.random() > .5 ? DoorDirection.CW : DoorDirection.CCW;
    else 
        dir = dir === DoorDirection.CW ? DoorDirection.CCW : DoorDirection.CW;
    const amount = Math.floor(Math.random() * (9) + 1);
    return { direction: dir, amount }
}

const getRandomCombination = (): DoorCommand[] => {
    let commands = [];
    let lastDirection: DoorDirection | undefined;
    for (let index = 0; index < 3; index++) {
        const command = getRandomCommand(lastDirection); 
        lastDirection = command.direction;
        commands.push(command);
    };
    return commands;
}
export const CombinationGenerator = {
    getRandomCombination,
}
