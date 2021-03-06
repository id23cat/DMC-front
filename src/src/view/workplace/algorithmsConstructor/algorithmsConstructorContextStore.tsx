import { action, computed, observable } from "mobx";
import { BaseAlgorithmBlockStore } from "./blocks/baseAlgorithmBlockStore";
import { pull } from "lodash";
import { AlgorithmBlockConnectionStore } from "./blocks/algorithmBlocksConnection/algorithmBlockConnectionStore";
import { AlgorithmsBlocksConnectionContext } from "./algorithmsBlocksConnectionContext";

export class AlgorithmsConstructorContextStore {
    @observable name?: string;
    @observable isPublic: boolean = false;
    @observable blocks: Array<BaseAlgorithmBlockStore> = [];
    @observable selectedBlock?: BaseAlgorithmBlockStore;
    @observable connectionContext: AlgorithmsBlocksConnectionContext = new AlgorithmsBlocksConnectionContext();

    @computed get allConnections(): Array<AlgorithmBlockConnectionStore> {
        return this.blocks.flatMap(e => e.inConnectionSlots.filter(c => c.connection).map(c => c.connection!));
    }

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
        block.dispose();
        pull(this.blocks, block);
    };
}
