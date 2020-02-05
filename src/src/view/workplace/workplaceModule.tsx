import { Route, RoutesModule } from "../../core/routing/routesModule";
import React from "react";
import { WorkPlacePage } from "./workPlacePage";
import { AlgorithmsConstructorPage } from "./algorithmsConstructor/algorithmsConstructorPage";

const routes: Array<Route> = [
    {
        path: "/workplace/algorithms",
        component: () => <></>,
    },
    {
        path: "/workplace/algorithms-constructor",
        component: AlgorithmsConstructorPage,
    },
    {
        path: "/workplace/algorithms-testing",
        component: () => <></>,
    },
    {
        path: "/",
        component: WorkPlacePage,
    },
];

export const WorkPlaceModule = () => <RoutesModule routes={routes} />;
