import { action, observable } from "mobx";
import { RefObject } from "react";
import Konva from "konva";
import { MenuOption } from "./contextMenuComponent";

export class ContextMenuManager {
    public ref?: RefObject<any>;

    @observable public options: Array<MenuOption> = [];

    @action public show = (e: Konva.KonvaEventObject<PointerEvent>, options: Array<MenuOption>) => {
        this.ref!.current!.handleContextClick(e.evt);
        this.options = options;
    };
}

export const contextMenuManager = new ContextMenuManager();
