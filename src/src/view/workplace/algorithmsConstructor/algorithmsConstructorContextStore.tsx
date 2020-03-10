import { action, computed, observable } from "mobx";
import { BaseAlgorithmBlockStore } from "./blocks/baseAlgorithmBlockStore";
import { pull } from "lodash";
import { AlgorithmBlockConnectionStore } from "./blocks/algorithmBlocksConnection/algorithmBlockConnectionStore";
import { AlgorithmBlockConnectionSlotStore } from "./blocks/blockConnectionSlot/algorithmBlockConnectionSlotStore";

export class AlgorithmsConstructorContextStore {
    @observable name?: string;
    @observable isPublic: boolean = false;
    @observable blocks: Array<BaseAlgorithmBlockStore> = [];
    @observable connections: Array<AlgorithmBlockConnectionStore> = [];
    @observable selectedBlock?: BaseAlgorithmBlockStore;
    @observable connectionContext: AlgorithmsBlocksConnectionContext = new AlgorithmsBlocksConnectionContext(this);

    @computed
    public get isNew(): boolean {
        return !this.id;
    }

    constructor(public id?: string) {}

    @action setName = (value?: string) => (this.name = value);
    @action setIsPublic = (value: boolean) => (this.isPublic = value);

    public loadData = async () => {
        if (this.isNew) {
            return;
        }

        // TODO: add
    };

    public save = async () => {
        // TODO: add
    };

    @action
    public selectBlock = (value?: BaseAlgorithmBlockStore) => {
        this.selectedBlock = value;
    };

    @action
    public clearSelectedBlock = () => {
        this.selectBlock();
    };

    @action
    public addNewBlock = () => {
        this.blocks.push(new BaseAlgorithmBlockStore());
    };

    @action
    public deleteCurrentSelectedBlock = () => {
        this.deleteBlock(this.selectedBlock!);
    };

    @action
    public deleteBlock = (block: BaseAlgorithmBlockStore) => {
        if (this.selectedBlock === block) {
            this.clearSelectedBlock();
        }
        pull(this.blocks, block);
    };
}

export class AlgorithmsBlocksConnectionContext {
    @observable public from?: AlgorithmBlockConnectionSlotStore;
    @observable public to?: AlgorithmBlockConnectionSlotStore;

    @action public setFrom = (value: AlgorithmBlockConnectionSlotStore) => {
        this.from = value;

        if (this.to) {
            this.addNewConnection();
        }
    };

    @action public setTo = (value: AlgorithmBlockConnectionSlotStore) => {
        this.to = value;

        if (this.from) {
            this.addNewConnection();
        }
    };

    constructor(private readonly constructorContextStore: AlgorithmsConstructorContextStore) {}

    @action
    private addNewConnection = () => {
        this.constructorContextStore.connections.push(new AlgorithmBlockConnectionStore(this.from!, this.to!));
        this.from = undefined;
        this.to = undefined;
    };
}
