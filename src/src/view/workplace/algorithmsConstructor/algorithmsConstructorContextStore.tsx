import { action, computed, observable } from "mobx";
import { AlgorithmBlockStore } from "./blocks/algorithmBlockStore";

export class AlgorithmsConstructorContextStore {
    @observable name?: string;
    @observable isPublic: boolean = false;
    @observable blocks: Array<AlgorithmBlockStore> = [];
    @observable selectedBlock?: AlgorithmBlockStore;

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
    public selectBlock = (value?: AlgorithmBlockStore) => {
        this.selectedBlock = value;
    };

    @action
    public addNew = () => {
        this.blocks.push(new AlgorithmBlockStore());
    };
}