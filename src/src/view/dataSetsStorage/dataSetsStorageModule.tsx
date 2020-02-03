import React from "react";
import { Route, RoutesModule } from "../../core/routing/routesModule";
import { DataSetsStorageListPage } from "./dataSetsStorageListPage";
import { DataSetPage } from "./dataSet/dataSetPage";

const routes: Array<Route> = [
    {
        path: "/data-sets/list",
        component: DataSetsStorageListPage,
    },
    {
        path: "/data-sets/add",
        exact: true,
        component: DataSetPage,
    },
    {
        path: "/data-sets/:id",
        exact: true,
        component: DataSetPage,
    },
    {
        path: "/data-sets",
        redirectTo: "/data-sets/list",
    },
];

export const DataSetsStorageModule = () => <RoutesModule routes={routes} />;
