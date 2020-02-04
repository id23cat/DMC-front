import { routingStore } from "../../stores/routingStore";
import React from "react";
import { KeyOrJSX } from "../../typings/customTypings";
import { ensureLocal } from "../../core/localization/local";
import { Card } from "reactstrap";

const actions: Array<ActionOptions> = [
    {
        title: "Workplace_MyAlgorithms",
        href: "/workplace/algorithms",
    },
    {
        title: "Workplace_AlgorithmsConstructor",
        href: "/workplace/algorithms-constructor",
    },
    {
        title: "Workplace_AlgorithmsTesting",
        href: "/workplace/algorithms-testing",
    },
];

interface ActionOptions {
    title: KeyOrJSX;
    href: string;
}

export const WorkPlacePage = () => {
    return (
        <div className="workplace-page">
            {actions.map((v, index) => <WorkplaceAction key={index} {...v} />)}
        </div>
    );
};


const WorkplaceAction = ({ href, title }: ActionOptions) => {
    return (
        <Card className="clickable workplace-action" onClick={() => routingStore.goto(href)}>
            <span className="workplace-action-title">
                {ensureLocal(title)}
            </span>
        </Card>
    );
};
