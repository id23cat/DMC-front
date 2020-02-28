import { Rect } from "react-konva";
import React, { useCallback } from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { BaseAlgorithmBlockStore } from "./baseAlgorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useAlgorithmsConstructorContext } from "../hooks";

export const BaseAlgorithmBlock = observer(({ store }: PropsWithStore<BaseAlgorithmBlockStore>) => {
    const context = useAlgorithmsConstructorContext();
    const onDragEnd = useCallback(
        e => {
            store.setX(e.target.x());
            store.setY(e.target.y());
        },
        [store],
    );
    const onClick = useCallback(
        e => {
            context.selectBlock(store);
            e.cancelBubble = true;
        },
        [context, store],
    );

    return (
        <Rect
            x={store.x}
            y={store.y}
            draggable
            height={store.height}
            width={store.width}
            strokeWidth={1}
            stroke="black"
            onClick={onClick}
            onDragEnd={onDragEnd}
            onContextMenu={e => console.log("123")}
        />
    );
});
