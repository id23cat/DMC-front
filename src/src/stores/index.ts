import { userContextStore } from "./userContextStore";
import { rootViewStore } from "./rootViewStore";
import { routingStore } from "./routingStore";
import { localStore } from "./localStore";
import { contextMenuManager } from "../components/contextMenu/contextMenuManager";

// Keep all global stores here
const stores = {
    userContextStore,
    rootViewStore,
    routingStore,
    localStore,
    contextMenuManager,
};
// for debug purposes
(window as any).stores = stores;
