import { action, observable } from "mobx";
import Konva from "konva";

export class BaseAlgorithmBlockStore {
    @observable public x: number = 100;
    @observable public y: number = 100;
    @observable public width: number = 100;
    @observable public height: number = 150;

    @observable public name: string = "TEST";
    @observable public id?: string;
    @observable public in: Array<AlgorithmBlockConnection> = [];
    @observable public out: Array<AlgorithmBlockConnection> = [];

    @action public setX = (value: number) => {
        this.x = value;
    };

    @action public setY = (value: number) => {
        this.y = value;
    };

    @action onDragEndHandler = (e: Konva.KonvaEventObject<DragEvent>) => {
        this.setX(e.target.x());
        this.setY(e.target.y());
    };
}

class AlgorithmBlockConnection {
    @observable public from?: Connection;
    @observable public to?: Connection;

    constructor(from?: Connection, to?: Connection) {
        this.from = from;
        this.to = to;
    }
}

class Connection {
    @observable public block: BaseAlgorithmBlockStore;
    @observable public contract: string;

    constructor(block: BaseAlgorithmBlockStore, contract: string) {
        this.block = block;
        this.contract = contract;
    }
}
