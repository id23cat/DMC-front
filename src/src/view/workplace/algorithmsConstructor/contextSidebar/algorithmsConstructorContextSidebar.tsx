import React from "react";
import { PropsWithStore } from "../../../../typings/customTypings";
import { AlgorithmsConstructorContextStore } from "../algorithmsConstructorContextStore";
import { observer } from "mobx-react-lite";
import { Button } from "reactstrap";
import { Local } from "../../../../core/localization/local";

type Props = PropsWithStore<AlgorithmsConstructorContextStore>;

export const AlgorithmsConstructorContextSidebar = observer(({ store }: Props) => {
    const { selectedBlock } = store;

    return (
        <div className="context-sidebar">
            {selectedBlock && (
                <>
                    <h4>
                        {selectedBlock && selectedBlock.name}
                        <hr />
                    </h4>
                    <Button color="primary" onClick={_ => store.deleteCurrentSelectedBlock()}>
                        <Local id="Remove" />
                    </Button>
                </>
            )}
        </div>
    );
});
