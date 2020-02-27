import React from "react";
import { observer } from "mobx-react-lite";
import { AlgorithmsConstructorContextStore } from "../algorithmsConstructorContextStore";
import { PropsWithStore } from "../../../../typings/customTypings";
import { Local } from "../../../../core/localization/local";

export const AlgorithmsConstructorInstrumentsSidebar = observer(
    ({ store }: PropsWithStore<AlgorithmsConstructorContextStore>) => {
        const actions: Array<SidebarActionProps> = [
            {
                title: "AddNew",
                onClick: store.addNew,
            },
        ];

        return (
            <div className="instruments-sidebar">
                <ul className="sidebar-actions">
                    {actions.map((cfg, index) => (
                        <SidebarAction {...cfg} key={index} />
                    ))}
                    <li className="action">1</li>
                </ul>
            </div>
        );
    },
);

interface SidebarActionProps {
    title: string;
    onClick: () => void;
}

const SidebarAction = ({ onClick, title }: SidebarActionProps) => {
    return (
        <li className="action" onClick={onClick}>
            <Local id={title} />
        </li>
    );
};
