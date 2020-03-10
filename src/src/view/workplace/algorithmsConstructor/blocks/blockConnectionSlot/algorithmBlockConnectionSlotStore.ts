import { action, computed } from "mobx";
import { BaseAlgorithmBlockStore } from "../baseAlgorithmBlockStore";

export enum ConnectionType {
    In = "In",
    Out = "Out",
}

export interface ConnectionSlotData {
    contract: string;
    contractType: string;
    type: ConnectionType;
}

export class AlgorithmBlockConnectionSlotStore {
    @computed
    public get absoluteX(): number {
        return this.owner.x + this.x;
    }

    @computed
    public get absoluteY(): number {
        return this.owner.y + this.y;
    }

    constructor(
        public readonly owner: BaseAlgorithmBlockStore,
        public readonly contract: string,
        public readonly contractType: string,
        public readonly type: ConnectionType,
        public readonly y: number,
        public readonly x: number = type === ConnectionType.In ? 0 : owner.x,
    ) {}

    @action
    private setData = (data: ConnectionSlotData) => {
        Object.assign(this, data);
    };
}
