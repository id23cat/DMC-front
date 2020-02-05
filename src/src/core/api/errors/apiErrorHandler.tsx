import React, { PropsWithChildren, useEffect } from "react";
import { ApiError } from "./apiError";
import { routingStore } from "../../../stores/routingStore";
import { notifications } from "../../../components/notifications/notifications";
import { Local } from "../../localization/local";

export const ApiErrorHandler = ({ children }: PropsWithChildren<{}>) => {
    useEffect(() => {
        window.addEventListener("unhandledrejection", onUnhandledRejection);
        return () => window.removeEventListener("unhandledrejection", onUnhandledRejection);
    }, []);

    return <>{children}</>;
};

const onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    const error = event.reason;
    if (error instanceof (ApiError)) {
        handleApiError(error);
    }
};

const handleApiError = (error: ApiError): void => {
    if (error.response.status === 401) {
        handleUnauthorized();
        return;
    }

    notifications.error(<Local id="UnexpectedErrorHappened" values={error} />);
};

const handleUnauthorized = (): void => {
    routingStore.goto("/login");
};
