import { Route, RoutesModule } from "../core/routing/routesModule";
import React from "react";
import { DataSetsStorageModule } from "./dataSetsStorage/dataSetsStorageModule";
import { Login } from "./login/login";
import { SignUpPage } from "./signUp/signUpPage";
import { authenticated } from "../core/routing/guards/authenticationGuard";

const routes: Array<Route> = [
    {
        path: "/data-sets",
        guards: [authenticated],
        component: DataSetsStorageModule,
    },
    {
        path: "/workplace",
        guards: [authenticated],
        component: () => <></>,
    },
    {
        path: "/account",
        guards: [authenticated],
        component: () => <></>,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/signUp",
        component: SignUpPage,
    },
    {
        path: "/",
        exact: true,
        component: () => <></>,
    },
    {
        path: "/",
        redirectTo: "/",
    },
];

export const RootModule = () => <RoutesModule routes={routes} />;
