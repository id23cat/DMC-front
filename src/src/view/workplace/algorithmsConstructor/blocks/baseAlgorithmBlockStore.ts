import { action, observable } from "mobx";
import Konva from "konva";
import { AlgorithmBlockConnection } from "./algorithmBlocksConnection/algorithmBlockConnection";
import {
    AlgorithmBlockConnectionSlotStore,
    ConnectionSlotData,
    ConnectionType,
} from "./blockConnectionSlot/algorithmBlockConnectionSlotStore";

let counter = 0;

export class BaseAlgorithmBlockStore {
    @observable public x: number = 100;
    @observable public y: number = 100;
    @observable public width: number = 100;
    @observable public height: number = 150;

    @observable public id?: string;
    @observable public name: string;
    @observable public connectionSlots: Array<AlgorithmBlockConnectionSlotStore> = [];
    @observable public in: Array<AlgorithmBlockConnection> = [];
    @observable public out: Array<AlgorithmBlockConnection> = [];

    constructor() {
        // TODO: stub; remove after setting data
        this.name = "TEST_" + counter++;
        const inConnections: Array<ConnectionSlotData> = [
            {
                contract: "0_test_in_" + counter,
                contractType: "type",
                type: ConnectionType.In,
            },
        ];
        const outConnections: Array<ConnectionSlotData> = [
            {
                contract: "0_test_from_" + counter,
                contractType: "type",
                type: ConnectionType.Out,
            },
        ];

        this.connectionSlots = inConnections
            .map(
                (value, index) =>
                    new AlgorithmBlockConnectionSlotStore(
                        this,
                        value.contract,
                        value.type,
                        value.type,
                        computeYOfConnectionSlot(this.height, inConnections.length, index),
                    ),
            )
            .concat(
                outConnections.map(
                    (value, index) =>
                        new AlgorithmBlockConnectionSlotStore(
                            this,
                            value.contract,
                            value.type,
                            value.type,
                            computeYOfConnectionSlot(this.height, inConnections.length, index),
                        ),
                ),
            );
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

function computeYOfConnectionSlot(height: number, arrayLength: number, index: number) {
    return (height / (arrayLength + 1)) * (index + 1);
}
