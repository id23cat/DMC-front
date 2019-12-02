import React from "react";
import { Local } from "../../../core/localization/local";
import useAsyncEffect from "use-async-effect";
import { routingStore } from "../../../stores/routingStore";

export const SignOut = () => {
    useAsyncEffect(async () => {
        routingStore.gotoBase();
    });

    return (
        <div>
            <Local id="SignOut"/>
        </div>
    );
};
