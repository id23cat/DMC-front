import { Route, RoutesModule } from "../core/routing/routesModule";
import React from "react";
import { anonymous } from "../core/routing/guards/anonymousGuard";
import { Login } from "./public/login/login";
import { SignUp } from "./public/signUp/signUp";
import { SignOut } from "./public/signOut/signOut";

const routes: Array<Route> = [
    {
        path: "/login",
        component: Login,
        guards: [anonymous],
    },
    {
        path: "/signUp",
        component: SignUp,
        guards: [anonymous],
    },
    {
        path: "/signOut",
        component: SignOut,
    },
    {
        path: "/",
        redirectTo: "/login",
        exact: true,
    },
];

export const RootModule = () => <RoutesModule routes={routes}/>;
