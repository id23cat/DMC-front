import { Rect } from "react-konva";
import React from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { AlgorithmBlockStore } from "./algorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useAlgorithmsConstructorContext } from "../hooks";

export const AlgorithmBlock = observer(({ store }: PropsWithStore<AlgorithmBlockStore>) => {
    const context = useAlgorithmsConstructorContext();

    return (
        <Rect
            x={store.x}
            y={store.y}
            draggable
            height={100}
            width={200}
            fill="red"
            onClick={e => {
                context.selectBlock(store);
                e.cancelBubble = true;
            }}
            onDragEnd={e => {
                store.setX(e.target.x());
                store.setY(e.target.y());
            }}
        />
    );
});
