import { IRoute, RoutesModule } from "../../core/routing/routesModule";
import React from "react";

const routes: Array<IRoute> = [
    {},
    {
        path: "/",
        redirectTo: "/internal",
        exact: true,
    }
];

export const InternalModule = () => <RoutesModule routes={routes}/>;
