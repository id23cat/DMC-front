import { Route, RoutesModule } from "../../core/routing/routesModule";
import React from "react";
import { DataSetsStorageModule } from "./dataSetsStorage/dataSetsStorageModule";

const routes: Array<Route> = [
    {
        path: "/data-sets",
        component: DataSetsStorageModule,
    },
    {
        path: "/",
        component: () => <></>,
    },
];

export const InternalModule = () => <RoutesModule routes={routes} />;
