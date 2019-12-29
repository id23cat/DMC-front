import { Route, RoutesModule } from "../../core/routing/routesModule";
import React from "react";
import { Login } from "./login/login";

const routes: Array<Route> = [
    {
        path: "/",
        exact: true,
        redirectTo: "/login",
    },
    {
        path: "/login",
        component: Login,
    },
];

export const PublicModule = () => <RoutesModule routes={routes} />;
