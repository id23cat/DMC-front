import React from "react";
import { observer } from "mobx-react-lite";
import { AlgorithmsConstructorStore } from "./algorithmsConstructorStore";

interface Props {
    store: AlgorithmsConstructorStore;
}

export const AlgorithmsConstructorSidebar = observer(({ store }: Props) => {
    return (
        <div className="algorithms-constructor-sidebar">
        </div>
    );
});
