import { Route, RoutesModule } from "../core/routing/routesModule";
import React from "react";
import { DataSetsStorageModule } from "./dataSetsStorage/dataSetsStorageModule";
import { Login } from "./login/login";
import { SignUpPage } from "./signUp/signUpPage";
import { authenticated } from "../core/routing/guards/authenticationGuard";
import { anonymous } from "../core/routing/guards/anonymousGuard";
import { WorkPlaceModule } from "./workplace/workplaceModule";
import { UserAccountPage } from "./account/userAccountPage";

const routes: Array<Route> = [
    {
        path: "/data-sets",
        guards: [authenticated],
        component: DataSetsStorageModule,
    },
    {
        path: "/workplace",
        guards: [authenticated],
        component: WorkPlaceModule,
    },
    {
        path: "/account",
        guards: [authenticated],
        component: UserAccountPage,
    },
    {
        path: "/login",
        component: Login,
        guards: [anonymous]
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
