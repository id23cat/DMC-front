import { action, computed, observable } from "mobx";
import { Dictionary } from "../typings/customTypings";
import { AccountMenuItem, NavItemConfig } from "../components/layouts/header/header";

const navItemsDictionary: Dictionary<Array<NavItemConfig>> = {
};

const accountMenuItemsDictionary: Dictionary<Array<AccountMenuItem>> = {};

class RootViewStore {
    @observable private loadingCount: number = 0;

    @computed
    public get navItems(): Array<NavItemConfig> | undefined {
        return undefined;
    }

    @computed
    public get accountMenuItems(): Array<AccountMenuItem> | undefined {
        return undefined;
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
