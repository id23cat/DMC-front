import React from "react";
import { observer } from "mobx-react-lite";
import { AlgorithmsConstructorContextStore } from "../algorithmsConstructorContextStore";
import { PropsWithStore } from "../../../../typings/customTypings";
import { Local } from "../../../../core/localization/local";
import { ListGroup, ListGroupItem } from "reactstrap";

type Props = PropsWithStore<AlgorithmsConstructorContextStore>;

export const AlgorithmsConstructorInstrumentsSidebar = observer(({ store }: Props) => {
    const actions: Array<SidebarActionProps> = [
        {
            title: "AddNew",
            onClick: store.addNewBlock,
        },
    ];

    return (
        <div className="instruments-sidebar">
            <ListGroup flush className="actions">
                {actions.map(({ onClick, title }, index) => (
                    <ListGroupItem className="action" key={index} action onClick={onClick}>
                        <Local id={title} />
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
});

interface SidebarActionProps {
    title: string;
    onClick: () => void;
}
