import React from "react";
import { userContextStore } from "../../../stores/userContextStore";
import { Redirect } from "react-router-dom";
import { GuardProps } from "./index";
import { Observer } from "mobx-react-lite";

export const authenticated = ({ component: Component }: GuardProps) => {
    return (
        <Observer>
            {() => userContextStore.isAuthenticated
                ? <Component />
                : <Redirect to={{ pathname: "/login" }} />}
        </Observer>
    );
};
