import { rootViewStore } from "../stores/rootViewStore";
import { useEffect } from "react";

export const useLayoutClassName = (className?: string) => {
    useEffect(() => {
        const previousClassName = rootViewStore.layoutClassName;
        rootViewStore.setLayoutClassName(className);
        return () => rootViewStore.setLayoutClassName(previousClassName);
    }, [className]);
};
