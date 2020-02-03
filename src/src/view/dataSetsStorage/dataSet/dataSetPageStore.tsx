import { action, computed, observable } from "mobx";
import { DataSetColumnStore } from "./dataSetColumnStore";

export class DataSetPageStore {
    @observable name?: string;
    @observable file?: File;
    @observable columns: Array<DataSetColumnStore> = [];

    @computed
    public get isNew(): boolean {
        return !this.id;
    }

    @action public setName = (value?: string) => this.name = value;
    @action public setFile = (value?: File) => {
        this.file = value;

        if (value) {
            const reader = new FileReader();
            reader.readAsText(value);
        } else {
            this.columns = [];
        }
    };

    constructor(public id?: string) {
    }

    public loadData = async () => {
        if (this.isNew) {
            return;
        }

        // TODO: stub
    };

    public save = async () => {
        // TODO: stub
    };
}

