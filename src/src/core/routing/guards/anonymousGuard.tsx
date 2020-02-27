import { GuardProps } from "./index";
import { userContextStore } from "../../../stores/userContextStore";
import { Redirect } from "react-router-dom";
import React from "react";
import { routingStore } from "../../../stores/routingStore";
import { Observer } from "mobx-react-lite";

export const anonymous = ({ component: Component }: GuardProps) => {
    return (
        <Observer>
            {() =>
                !userContextStore.isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect to={{ pathname: routingStore.basePath }} />
                )
            }
        </Observer>
    );
};
