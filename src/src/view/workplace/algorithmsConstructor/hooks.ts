import {
    AlgorithmsBlocksConnectionContext,
    AlgorithmsConstructorContextStore,
} from "./algorithmsConstructorContextStore";
import { useContext } from "react";
import { AlgorithmsConstructorContext } from "./algorithmsConstructorPage";

export const useAlgorithmsConstructorContext = (): AlgorithmsConstructorContextStore => {
    return useContext(AlgorithmsConstructorContext)!;
};

export const useAlgorithmsBlocksConnectionContext = (): AlgorithmsBlocksConnectionContext => {
    return useAlgorithmsConstructorContext().connectionContext;
};
