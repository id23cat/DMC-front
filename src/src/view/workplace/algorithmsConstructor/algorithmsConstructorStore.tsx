import { action, computed, observable } from "mobx";

export class AlgorithmsConstructorStore {
    @observable name?: string;
    @observable isPublic: boolean = false;

    @computed
    public get isNew(): boolean {
        return !this.id;
    }

    constructor(public id?: string) {
    }

    @action setName = (value?: string) => this.name = value;
    @action setIsPublic = (value: boolean) => this.isPublic = value;

    public loadData = async () => {
        if (this.isNew) {
            return;
        }

        // TODO: add
    };

    public save = async () => {
        // TODO: add
    };
}
