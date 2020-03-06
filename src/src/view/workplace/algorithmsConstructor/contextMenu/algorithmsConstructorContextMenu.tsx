import React from "react";
import { observer } from "mobx-react-lite";
import { KeyOrJSX, PropsWithStore } from "../../../../typings/customTypings";
import { ListGroup, ListGroupItem } from "reactstrap";
import { ensureLocal } from "../../../../core/localization/local";
import { AlgorithmsConstructorContextMenuManager } from "./algorithmsConstructorContextMenuManager";

type Props = PropsWithStore<AlgorithmsConstructorContextMenuManager>;

export const AlgorithmsConstructorContextMenu = observer(({ store }: Props) => {
    return (
        <div
            style={{
                top: store.top,
                left: store.left,
            }}
            hidden={!store.display}
            className="context-menu"
        >
            <ListGroup>
                {store.options.map(({ text, onClick }, index) => (
                    <ListGroupItem
                        action
                        className="clickable menu-option"
                        key={index}
                        onClick={_ => store.onClickWrapper(onClick)}
                    >
                        {ensureLocal(text)}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
});

export interface MenuOptionItem {
    text: KeyOrJSX;
    onClick: () => void;
}
