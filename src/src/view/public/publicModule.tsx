import { IRoute, RoutesModule } from "../../core/routing/routesModule";
import React from "react";
import { Login } from "./login/login";

const routes: Array<IRoute> = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        redirectTo: "/login"
    },
];

export const PublicModule = () => <RoutesModule routes={routes}/>;
