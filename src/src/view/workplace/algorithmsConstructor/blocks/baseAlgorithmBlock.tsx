import { Rect } from "react-konva";
import React, { useCallback } from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { BaseAlgorithmBlockStore } from "./baseAlgorithmBlockStore";
import { observer } from "mobx-react-lite";
import { useACContextMenuManager, useAlgorithmsConstructorContext } from "../hooks";
import { MenuOptionItem } from "../contextMenu/algorithmsConstructorContextMenuWrapper";

export const BaseAlgorithmBlock = observer(({ store }: PropsWithStore<BaseAlgorithmBlockStore>) => {
    const context = useAlgorithmsConstructorContext();
    const contextMenuWrapper = useACContextMenuManager();

    const onClick = useCallback(
        e => {
            context.selectBlock(store);
            e.cancelBubble = true;
        },
        [context, store],
    );

    const options: Array<MenuOptionItem> = [
        {
            text: "Remove",
            onClick: () => context.deleteBlock(store),
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
            onContextMenu={e => contextMenuWrapper.show(e, options)}
        />
    );
});
