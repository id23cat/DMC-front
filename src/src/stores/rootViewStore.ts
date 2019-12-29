import { action, computed, observable } from "mobx";
import { AccountMenuItem, NavItemConfig } from "../components/layouts/header/header";
import { userContextStore } from "./userContextStore";
import { routingStore } from "./routingStore";

const navItems: Array<NavItemConfig> = [];

const accountMenuItems: Array<AccountMenuItem> = [
    {
        title: "SignOut",
        onClick: () => routingStore.goto("/signOut"),
        withDivider: true,
    },
];

const defaultAccountActions: Array<AccountMenuItem> = [
    {
        title: "SignIn",
        onClick: () => routingStore.goto("/login"),
    },
    {
        title: "SignUp",
        onClick: () => routingStore.goto("/signUp"),
    },
];

class RootViewStore {
    @observable private loadingCount: number = 0;

    @computed
    public get navItems(): Array<NavItemConfig> | undefined {
        if (!userContextStore.isAuthenticated) {
            return undefined;
        }

        return navItems;
    }

    @computed
    public get accountMenuItems(): Array<AccountMenuItem> | undefined {
        if (!userContextStore.isAuthenticated) {
            return defaultAccountActions;
        }

        return accountMenuItems;
    }

    @computed
    public get loadingIsShown(): boolean {
        return this.loadingCount > 0;
    }

    @action
    public showLoading(): void {
        this.loadingCount++;
    }

    @action
    public hideLoading(): void {
        this.loadingCount = this.loadingCount > 0 ? this.loadingCount - 1 : 0;
    }
}

export const rootViewStore = new RootViewStore();
