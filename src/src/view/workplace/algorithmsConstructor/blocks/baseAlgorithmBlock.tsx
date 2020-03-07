import { Rect } from "react-konva";
import React, { useCallback } from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { BaseAlgorithmBlockStore } from "./baseAlgorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useAlgorithmsConstructorContext } from "../hooks";
import { MenuOption } from "../../../../components/contextMenu/contextMenuComponent";
import { contextMenuManager } from "../../../../components/contextMenu/contextMenuManager";

export const BaseAlgorithmBlock = observer(({ store }: PropsWithStore<BaseAlgorithmBlockStore>) => {
    const context = useAlgorithmsConstructorContext();

    const onClick = useCallback(
        e => {
            context.selectBlock(store);
            e.cancelBubble = true;
        },
        [context, store],
    );

    const options: Array<MenuOption> = [
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
    ];

    return (
        <Rect
            x={store.x}
            y={store.y}
            draggable
            height={store.height}
            width={store.width}
            strokeWidth={1}
            stroke={context.selectedBlock === store ? "red" : "black"}
            onClick={onClick}
            onDragEnd={store.onDragEndHandler}
            onContextMenu={e => contextMenuManager.show(e, options)}
        />
    );
});
