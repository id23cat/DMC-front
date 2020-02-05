import { action, computed, observable } from "mobx";
import { AccountMenuItem, NavItemConfig } from "../components/layouts/header/header";
import { userContextStore } from "./userContextStore";
import { routingStore } from "./routingStore";
import { UserAccountService } from "../core/services/userAccountService";

const navItems: Array<NavItemConfig> = [
    {
        href: "/data-sets",
        title: "DataSetsStorage",
    },
    {
        href: "/workplace",
        title: "Workplace",
    },
];

const accountMenuItems: Array<AccountMenuItem> = [
    {
        title: "Account",
        onClick: () => routingStore.goto("/account"),
    },
    {
        title: "SignOut",
        onClick: UserAccountService.signOut,
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
    @observable public layoutClassName?: string;

    @computed
    public get navItems(): Array<NavItemConfig> | undefined {
        if (!userContextStore.isAuthenticated) {
            return undefined;
        }

        return navItems;
    }

    @action public setLayoutClassName = (value?: string) => {
        this.layoutClassName = value;
    };

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
