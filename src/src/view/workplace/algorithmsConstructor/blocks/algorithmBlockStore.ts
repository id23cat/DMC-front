import { action, observable } from "mobx";

export class AlgorithmBlockStore {
    @observable public name?: string = "TEST";
    @observable public x: number = 100;
    @observable public y: number = 100;

    @action public setX = (value: number) => {
        this.x = value;
    };
    @action public setY = (value: number) => {
        this.y = value;
    };
}
