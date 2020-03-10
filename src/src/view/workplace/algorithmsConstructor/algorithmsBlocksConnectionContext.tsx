import { action, observable } from "mobx";
import { AlgorithmBlockConnectionSlotStore } from "./blocks/blockConnectionSlot/algorithmBlockConnectionSlotStore";
import { AlgorithmBlockConnectionStore } from "./blocks/algorithmBlocksConnection/algorithmBlockConnectionStore";

export class AlgorithmsBlocksConnectionContext {
    @observable public from?: AlgorithmBlockConnectionSlotStore;
    @observable public to?: AlgorithmBlockConnectionSlotStore;

    @action public setFrom = (value: AlgorithmBlockConnectionSlotStore) => {
        this.from = value;
        this.addNewConnection();
    };

    @action public setTo = (value: AlgorithmBlockConnectionSlotStore) => {
        this.to = value;
        this.addNewConnection();
    };

    @action
    private addNewConnection = () => {
        // TODO: add check of contracts typings
        if (!this.from || !this.to) {
            return;
        }
        const connection = new AlgorithmBlockConnectionStore(this.from, this.to);
        this.from.connect(connection);
        this.to.connect(connection);
        this.from = undefined;
        this.to = undefined;
    };
}
