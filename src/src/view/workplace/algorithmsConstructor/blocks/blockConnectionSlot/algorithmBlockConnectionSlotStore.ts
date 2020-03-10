import { action, computed, observable } from "mobx";
import { BaseAlgorithmBlockStore } from "../baseAlgorithmBlockStore";
import { AlgorithmBlockConnectionStore } from "../algorithmBlocksConnection/algorithmBlockConnectionStore";
import { Disposable } from "../../../../../typings/customTypings";

export enum ConnectionType {
    In = "In",
    Out = "Out",
}

export interface ConnectionSlotData {
    contract: string;
    contractType: string;
    type: ConnectionType;
}

export class AlgorithmBlockConnectionSlotStore implements Disposable {
    @observable public connection?: AlgorithmBlockConnectionStore;

    @computed
    public get absoluteX(): number {
        return this.owner.x + this.x;
    }

    @computed
    public get absoluteY(): number {
        return this.owner.y + this.y;
    }

    @action
    public connect = (connection: AlgorithmBlockConnectionStore) => {
        this.connection?.dispose();
        this.connection = connection;
    };

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

    public dispose = () => {
        this.connection?.dispose();
    };
}
