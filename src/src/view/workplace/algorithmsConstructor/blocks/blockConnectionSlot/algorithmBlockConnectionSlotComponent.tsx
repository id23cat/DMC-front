import { observer } from "mobx-react-lite";
import { PropsWithStore } from "../../../../../typings/customTypings";
import { AlgorithmBlockConnectionSlotStore, ConnectionType } from "./algorithmBlockConnectionSlotStore";
import { Circle, Group } from "react-konva";
import { Text as KonvaText } from "react-konva/lib/ReactKonvaCore";
import React from "react";

const connectionSlotRadius = 7;

export const AlgorithmBlockConnectionSlot = observer(({ store }: PropsWithStore<AlgorithmBlockConnectionSlotStore>) => {
    return (
        <Group x={store.x} y={store.y}>
            <Circle radius={connectionSlotRadius} fill="black" />
            <KonvaText
                y={-15}
                x={store.type === ConnectionType.In ? -80 : 20}
                align={ConnectionType.In ? "right" : "right"}
                fontSize={12}
                text={store.contract}
                fill="black"
            />
        </Group>
    );
});
