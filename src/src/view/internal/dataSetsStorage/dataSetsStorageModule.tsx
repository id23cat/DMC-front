import React from "react";
import { Route, RoutesModule } from "../../../core/routing/routesModule";
import { DataSetsStorageListPage } from "./dataSetsStorageListPage";

const routes: Array<Route> = [
    {
        path: "/data-sets/list",
        component: DataSetsStorageListPage,
    },
    {
        path: "/data-sets/:id",
        exact: true,
        component: () => <></>,
    },
    {
        path: "/data-sets",
        redirectTo: "/data-sets/list",
    },
];

export const DataSetsStorageModule = () => <RoutesModule routes={routes} />;
