import { Route, RoutesModule } from "../../core/routing/routesModule";
import React from "react";

const routes: Array<Route> = [
    {
        path: "/",
        component: () => <></>,
    },
];

export const InternalModule = () => <RoutesModule routes={routes} />;
