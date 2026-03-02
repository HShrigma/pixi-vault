export enum DoorState { Closed, Opened };
export enum DoorDirection {CW, CCW};
export type DoorCommand = {direction: DoorDirection, amount: number};

export enum CommandPushResult{
    Solved,
    Failed,
    InProgress,
};

export enum VaultState {
    Closed,
    Spinout,
    Opened,
};