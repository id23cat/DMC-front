import { Circle, Group, Label, Rect, Text as KonvaText } from "react-konva";
import React, { useCallback, useMemo } from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { BaseAlgorithmBlockStore } from "./baseAlgorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useAlgorithmsConstructorContext } from "../hooks";
import { contextMenuManager } from "../../../../components/contextMenu/contextMenuManager";

const fontSize = 18;
const labelVerticalOffset = 10;
const connectionSlotRadius = 7;

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
    const inConnectionSlots = useMemo(
        () =>
            store.in.map((c, index) => (
                <Circle
                    key={index}
                    y={computeYOfConnectionSlot(store.height, store.in.length, index)}
                    radius={connectionSlotRadius}
                    fill="black"
                />
            )),
        [store.height, store.in],
    );
    const outConnectionSlots = useMemo(
        () =>
            store.out.map((c, index) => (
                <Circle
                    key={index}
                    x={store.width}
                    y={computeYOfConnectionSlot(store.height, store.out.length, index)}
                    radius={connectionSlotRadius}
                    fill="black"
                />
            )),
        [store.height, store.out, store.width],
    );

    return (
        <Group x={store.x} y={store.y} draggable>
            <Rect
                height={store.height}
                width={store.width}
                strokeWidth={1}
                fill="white"
                stroke={context.selectedBlock === store ? "red" : "black"}
                onClick={onClick}
                onDragEnd={store.onDragEndHandler}
                onContextMenu={e => contextMenuManager.show(e, options)}
            />
            <Label y={labelVerticalOffset}>
                <KonvaText align="center" width={store.width} fontSize={fontSize} text={store.name} fill="black" />
            </Label>
            {inConnectionSlots}
            {outConnectionSlots}
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
                subMenu: store.out.map(e => ({
                    title: <>{e.from.contract}</>,
                    onClick: () => console.log(e.from.contract),
                })),
            },
            {
                title: "ConnectToVariable",
                subMenu: store.in.map(e => ({
                    title: <>{e.to.contract}</>,
                    onClick: () => console.log(e.to.contract),
                })),
            },
        ],
        [store, context],
    );
};

function computeYOfConnectionSlot(height: number, arrayLength: number, index: number) {
    return (height / (arrayLength + 1)) * (index + 1);
}
