import React from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { AlgorithmsConstructorContextStore } from "../algorithmsConstructorContextStore";
import { observer } from "mobx-react-lite";

type Props = PropsWithStore<AlgorithmsConstructorContextStore>;

export const AlgorithmsConstructorContextSidebar = observer(({ store }: Props) => {
    const { selectedBlock } = store;

    return (
        <div className="context-sidebar">
            <h4>
                {selectedBlock && selectedBlock.name}
                <hr />
            </h4>
        </div>
    );
});
