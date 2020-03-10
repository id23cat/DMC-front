import { action, observable } from "mobx";
import { BaseAlgorithmBlockStore } from "../baseAlgorithmBlockStore";

export class AlgorithmBlockConnection {
    @observable public readonly from: Connection;
    @observable public readonly to: Connection;

    @action public connectFrom = (value?: BaseAlgorithmBlockStore) => {
        this.from.block = value;
    };

    @action public connectTo = (value?: BaseAlgorithmBlockStore) => {
        this.to.block = value;
    };

    constructor(from: Connection, to: Connection) {
        this.from = from;
        this.to = to;
    }
}

export class Connection {
    @observable public block?: BaseAlgorithmBlockStore;
    /**
     * Generally name of variable
     */
    @observable public contract: string;

    constructor(contract: string, block?: BaseAlgorithmBlockStore) {
        this.block = block;
        this.contract = contract;
    }
}
