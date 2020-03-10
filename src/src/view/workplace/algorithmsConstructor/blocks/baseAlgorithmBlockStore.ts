import { action, computed, observable } from "mobx";
import Konva from "konva";
import {
    AlgorithmBlockConnectionSlotStore,
    ConnectionSlotData,
    ConnectionType,
} from "./blockConnectionSlot/algorithmBlockConnectionSlotStore";
import { Disposable } from "../../../../typings/customTypings";

let counter = 0;

export class BaseAlgorithmBlockStore implements Disposable {
    @observable public x: number = 100;
    @observable public y: number = 100;
    @observable public width: number = 100;
    @observable public height: number = 150;

    @observable public id?: string;
    @observable public name: string;
    @observable public connectionSlots: Array<AlgorithmBlockConnectionSlotStore> = [];

    @computed public get inConnectionSlots(): Array<AlgorithmBlockConnectionSlotStore> {
        return this.connectionSlots.filter(e => e.type === ConnectionType.In);
    }

    @computed public get outConnectionSlots(): Array<AlgorithmBlockConnectionSlotStore> {
        return this.connectionSlots.filter(e => e.type === ConnectionType.Out);
    }

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

    @action onDragMoveHandler = (e: Konva.KonvaEventObject<DragEvent>) => {
        this.setX(e.target.x());
        this.setY(e.target.y());
    };

    public dispose = () => {
        this.connectionSlots.forEach(e => e.dispose());
    };
}

function computeYOfConnectionSlot(height: number, arrayLength: number, index: number) {
    return (height / (arrayLength + 1)) * (index + 1);
}
