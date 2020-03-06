import { action, observable } from "mobx";
import { RefObject } from "react";
import { Stage } from "react-konva";
import Konva from "konva";
import { MenuOptionItem } from "./algorithmsConstructorContextMenu";

export class AlgorithmsConstructorContextMenuManager {
    private readonly defaultOffsetForMenu: number = 4;

    @observable public display: boolean = false;
    @observable public top: number = 0;
    @observable public left: number = 0;
    @observable public options: Array<MenuOptionItem> = [];

    constructor(public stageRef: RefObject<Stage>) {}

    @action public show = (e: Konva.KonvaEventObject<PointerEvent>, options: Array<MenuOptionItem>) => {
        e.evt.preventDefault();
        e.cancelBubble = true;
        if (e.target === this.stageRef.current!.getStage()) {
            this.display = false;
            return;
        }

        const stage = this.stageRef.current!.getStage();
        const containerRect = stage.container().getBoundingClientRect();
        this.top = containerRect.top + stage.getPointerPosition()!.y + this.defaultOffsetForMenu;
        this.left = containerRect.left + stage.getPointerPosition()!.x + this.defaultOffsetForMenu;
        this.options = options;

        this.display = true;
    };

    @action public hide = () => {
        this.display = false;
    };

    @action public onClickWrapper = (onClick: () => void) => {
        this.hide();
        onClick();
    };
}
