import { observable } from "mobx";
import { AlgorithmBlockConnectionSlotStore } from "../blockConnectionSlot/algorithmBlockConnectionSlotStore";
import { Disposable } from "../../../../../typings/customTypings";

export class AlgorithmBlockConnectionStore implements Disposable {
    @observable public readonly from: AlgorithmBlockConnectionSlotStore;
    @observable public readonly to: AlgorithmBlockConnectionSlotStore;

    constructor(from: AlgorithmBlockConnectionSlotStore, to: AlgorithmBlockConnectionSlotStore) {
        this.from = from;
        this.to = to;
    }

    public dispose = () => {
        this.from.connection = undefined;
        this.to.connection = undefined;
    };
}
