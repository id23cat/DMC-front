import React from "react";
import { Local } from "../../../core/localization/local";
import useAsyncEffect from "use-async-effect";
import { routingStore } from "../../../stores/routingStore";
import { userContextStore } from "../../../stores/userContextStore";

export const SignOut = () => {
    useAsyncEffect(async () => {
        try {
            userContextStore.isAuthenticated = false;
            await userContextStore.loadContext();
        } finally {
            routingStore.gotoBase();
        }
    });

    return (
        <div>
            <Local id="SignOut" />
        </div>
    );
};
