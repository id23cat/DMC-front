import { observable } from "mobx";
import { AlgorithmBlockConnectionSlotStore } from "../blockConnectionSlot/algorithmBlockConnectionSlotStore";

export class AlgorithmBlockConnectionStore {
    @observable public readonly from: AlgorithmBlockConnectionSlotStore;
    @observable public readonly to: AlgorithmBlockConnectionSlotStore;

    constructor(from: AlgorithmBlockConnectionSlotStore, to: AlgorithmBlockConnectionSlotStore) {
        this.from = from;
        this.to = to;
    }
}
