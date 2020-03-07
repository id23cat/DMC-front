import { AlgorithmsConstructorContextStore } from "./algorithmsConstructorContextStore";
import { useContext } from "react";
import { AlgorithmsConstructorContext } from "./algorithmsConstructorPage";

export const useAlgorithmsConstructorContext = (): AlgorithmsConstructorContextStore => {
    return useContext(AlgorithmsConstructorContext)!;
};
