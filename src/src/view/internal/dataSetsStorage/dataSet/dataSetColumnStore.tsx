import { action, observable } from "mobx";
import { DataSetValueType } from "./dataSetValueType";

export class DataSetColumnStore {
    @observable name?: string;
    @observable type?: DataSetValueType;

    @action public setName = (value?: string) => this.name = value;
    @action public setType = (value?: DataSetValueType) => this.type = value;

    constructor(name: string, type?: DataSetValueType) {
        this.name = name;
        this.type = type;
    }
}
