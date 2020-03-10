import { Group, Rect, Text as KonvaText } from "react-konva";
import React, { useCallback, useMemo } from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { BaseAlgorithmBlockStore } from "./baseAlgorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useAlgorithmsConstructorContext } from "../hooks";
import { contextMenuManager } from "../../../../components/contextMenu/contextMenuManager";
import { AlgorithmBlockConnectionSlot } from "./blockConnectionSlot/algorithmBlockConnectionSlotComponent";

const labelVerticalOffset = 10;

export const BaseAlgorithmBlock = observer(({ store }: PropsWithStore<BaseAlgorithmBlockStore>) => {
    const context = useAlgorithmsConstructorContext();

    const onClick = useCallback(
        e => {
            context.selectBlock(store);
            e.cancelBubble = true;
        },
        [context, store],
    );

    const options = useContextMenuOptions(store);
    const connectionSlots = useMemo(
        () => store.connectionSlots.map((c, index) => <AlgorithmBlockConnectionSlot key={index} store={c} />),
        [store.connectionSlots],
    );

    return (
        <Group x={store.x} y={store.y} draggable onDragEnd={store.onDragEndHandler}>
            <Rect
                height={store.height}
                width={store.width}
                strokeWidth={1}
                fill="white"
                stroke={context.selectedBlock === store ? "red" : "black"}
                onClick={onClick}
                onContextMenu={e => contextMenuManager.show(e, options)}
            />
            <KonvaText
                y={labelVerticalOffset}
                align="center"
                width={store.width}
                fontSize={14}
                text={store.name}
                fill="black"
            />
            {connectionSlots}
        </Group>
    );
});

const useContextMenuOptions = (store: BaseAlgorithmBlockStore) => {
    const context = useAlgorithmsConstructorContext();

    return useMemo(
        () => [
            {
                title: "Remove",
                onClick: () => context.deleteBlock(store),
            },
            {
                title: "ConnectFromVariable",
                subMenu: store.outConnectionSlots.map(e => ({
                    title: <>{e.contract}</>,
                    onClick: () => console.log(e.contract),
                })),
            },
            {
                title: "ConnectToVariable",
                subMenu: store.inConnectionSlots.map(e => ({
                    title: <>{e.contract}</>,
                    onClick: () => console.log(e.contract),
                })),
            },
        ],
        [store, context],
    );
};
