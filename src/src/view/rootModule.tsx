import { Route, RoutesModule } from "../core/routing/routesModule";
import React from "react";
import { SignOut } from "./public/signOut/signOut";
import { InternalModule } from "./internal/internalModule";
import { userContextStore } from "../stores/userContextStore";
import { PublicModule } from "./public/publicModule";
import { observer } from "mobx-react-lite";

const routes: Array<Route> = [
    {
        path: "/signOut",
        component: SignOut,
    },
    {
        path: "/",
        component: observer(() => userContextStore.isAuthenticated ? <InternalModule /> : <PublicModule />),
    },
];

export const RootModule = () => <RoutesModule routes={routes} />;
