import { action, computed, observable } from "mobx";
import { BaseAlgorithmBlockStore } from "./blocks/baseAlgorithmBlockStore";
import { pull } from "lodash";
import { RefObject } from "react";
import { Stage } from "react-konva";
import Konva from "konva";
import { AlgorithmsConstructorContextMenuManager } from "./contextMenu/algorithmsConstructorContextMenuManager";

export class AlgorithmsConstructorContextStore {
    public contextMenuStore: AlgorithmsConstructorContextMenuManager = new AlgorithmsConstructorContextMenuManager(
        this.stageRef,
    );

    @observable name?: string;
    @observable isPublic: boolean = false;
    @observable blocks: Array<BaseAlgorithmBlockStore> = [];
    @observable selectedBlock?: BaseAlgorithmBlockStore;

    @computed
    public get isNew(): boolean {
        return !this.id;
    }

    constructor(public stageRef: RefObject<Stage>, public id?: string) {}

    @action setName = (value?: string) => (this.name = value);
    @action setIsPublic = (value: boolean) => (this.isPublic = value);

    public loadData = async () => {
        if (this.isNew) {
            return;
        }

        // TODO: add
    };

    public save = async () => {
        // TODO: add
    };

    @action
    public selectBlock = (value?: BaseAlgorithmBlockStore) => {
        this.selectedBlock = value;
    };

    @action
    public onClickHandler = (e: Konva.KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault();
        this.contextMenuStore.hide();
    };

    @action
    public onContextMenuClickHandler = (e: Konva.KonvaEventObject<PointerEvent>) => {
        e.evt.preventDefault();
        this.contextMenuStore.hide();
    };

    @action
    public clearSelectedBlock = () => {
        this.selectBlock();
    };

    @action
    public addNewBlock = () => {
        this.blocks.push(new BaseAlgorithmBlockStore());
    };

    @action
    public deleteCurrentSelectedBlock = () => {
        this.deleteBlock(this.selectedBlock!);
    };

    @action
    public deleteBlock = (block: BaseAlgorithmBlockStore) => {
        pull(this.blocks, block);
        if (this.selectedBlock === block) {
            this.clearSelectedBlock();
        }
    };
}
