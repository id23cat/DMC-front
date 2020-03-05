import { AlgorithmsConstructorContextStore } from "./algorithmsConstructorContextStore";
import { useContext } from "react";
import { AlgorithmsConstructorContext } from "./algorithmsConstructorPage";
import { AlgorithmsConstructorContextMenuManager } from "./contextMenu/algorithmsConstructorContextMenuManager";

export const useAlgorithmsConstructorContext = (): AlgorithmsConstructorContextStore => {
    return useContext(AlgorithmsConstructorContext)!;
};

export const useACContextMenuManager = (): AlgorithmsConstructorContextMenuManager => {
    return useContext(AlgorithmsConstructorContext)!.contextMenuStore;
};
