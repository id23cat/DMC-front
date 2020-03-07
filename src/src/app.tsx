import React, { useState } from "react";
import "./styles/styles.scss";
import { MainLayout } from "./components/layouts/mainLayout";
import { Router } from "react-router-dom";
import { routingStore } from "./stores/routingStore";
import { RootModule } from "./view/rootModule";
import { useAsyncEffect } from "use-async-effect";
import { observer } from "mobx-react-lite";
import { RawIntlProvider } from "react-intl";
import { localStore } from "./stores/localStore";
import { LoadingAnimationWrapper } from "./components/layouts/loading/loadingAnimationWrapper";
import { NotificationsContainer } from "./components/notifications/notificationsManager";
import { ApiErrorHandler } from "./core/api/errors/apiErrorHandler";
import { UserAccountService } from "./core/services/userAccountService";
import { ContextMenuComponent } from "./components/contextMenu/contextMenuComponent";
import { contextMenuManager } from "./components/contextMenu/contextMenuManager";

export const App = observer(() => {
    const [isContextLoaded, setIsContextLoaded] = useState<boolean>(false);
    useAsyncEffect(async () => {
        await UserAccountService.loadContext();
        setIsContextLoaded(true);
    }, []);

    return (
        <RawIntlProvider value={localStore.intlShape}>
            <Router history={routingStore.history}>
                <ApiErrorHandler>
                    <MainLayout>{isContextLoaded && <RootModule />}</MainLayout>
                </ApiErrorHandler>
            </Router>
            <ContextMenuComponent store={contextMenuManager} />
            <NotificationsContainer />
            <LoadingAnimationWrapper />
        </RawIntlProvider>
    );
});
