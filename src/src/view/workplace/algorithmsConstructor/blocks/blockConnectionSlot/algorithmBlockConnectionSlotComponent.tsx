import { observer } from "mobx-react-lite";
import { PropsWithStore } from "../../../../../typings/customTypings";
import { AlgorithmBlockConnectionSlotStore, ConnectionType } from "./algorithmBlockConnectionSlotStore";
import { Circle, Group } from "react-konva";
import { Text as KonvaText } from "react-konva/lib/ReactKonvaCore";
import React from "react";
import { useAlgorithmsBlocksConnectionContext } from "../../hooks";

const connectionSlotRadius = 7;

export const AlgorithmBlockConnectionSlot = observer(({ store }: PropsWithStore<AlgorithmBlockConnectionSlotStore>) => {
    const connectionContext = useAlgorithmsBlocksConnectionContext();
    const isSelectedForConnection = connectionContext.to === store || connectionContext.from === store;

    return (
        <Group x={store.x} y={store.y}>
            <Circle radius={connectionSlotRadius} fill={isSelectedForConnection ? "red" : "black"} />
            <KonvaText
                y={-15}
                x={store.type === ConnectionType.In ? -80 : 20}
                align={ConnectionType.In ? "right" : "right"}
                fontSize={12}
                text={store.contract}
                fill={isSelectedForConnection ? "red" : "black"}
            />
        </Group>
    );
});
