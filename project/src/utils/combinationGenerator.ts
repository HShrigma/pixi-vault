import { DoorCommand, DoorDirection } from "./types/vaultRegistries";

const getRandomCommand = ():DoorCommand =>{
    const dir = Math.random() > .5 ? DoorDirection.CW : DoorDirection.CCW;
    const amount = Math.floor(Math.random() * (9) + 1);
    return { direction: dir, amount }
}

export const CombinationGenerator = {
    getRandomCommand,
}
