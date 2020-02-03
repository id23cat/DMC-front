import { Route, RoutesModule } from "../core/routing/routesModule";
import React from "react";
import { SignOut } from "./signOut/signOut";
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
        path: "/signOut",
        component: SignOut,
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
        component: () => <></>,
    },
];

export const RootModule = () => <RoutesModule routes={routes} />;
