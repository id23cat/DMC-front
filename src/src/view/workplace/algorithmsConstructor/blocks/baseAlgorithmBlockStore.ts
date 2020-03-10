import { action, observable } from "mobx";
import Konva from "konva";
import { AlgorithmBlockConnection, Connection } from "./algorithmBlocksConnection/algorithmBlockConnection";

let counter = 0;

export class BaseAlgorithmBlockStore {
    @observable public x: number = 100;
    @observable public y: number = 100;
    @observable public width: number = 100;
    @observable public height: number = 150;

    @observable public name: string;
    @observable public id?: string;
    @observable public in: Array<AlgorithmBlockConnection> = [];
    @observable public out: Array<AlgorithmBlockConnection> = [];

    constructor() {
        // TODO: stub; remove after setting data
        this.name = "TEST_" + counter++;
        this.in = [
            new AlgorithmBlockConnection(
                new Connection("0_test_in_" + counter),
                new Connection("0_test_in_" + counter, this),
            ),
        ];
        this.out = [
            new AlgorithmBlockConnection(
                new Connection("1_test_from_" + counter, this),
                new Connection("1_test_from_" + counter),
            ),
        ];
    }

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
