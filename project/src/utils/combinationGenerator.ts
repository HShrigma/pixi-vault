import { DoorCommand, DoorDirection } from "./types/vaultRegistries";

const getRandomCommand = ():DoorCommand =>{
    const dir = Math.random() > .5 ? DoorDirection.CW : DoorDirection.CCW;
    const amount = Math.floor(Math.random() * (9) + 1);
    return { direction: dir, amount }
}

const getRandomCombination = (): DoorCommand[] => {
    let commands = [];
    for (let index = 0; index < 3; index++) commands.push(getRandomCommand());
    return commands;
}
export const CombinationGenerator = {
    getRandomCombination,
}
