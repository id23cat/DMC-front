import { action, observable } from "mobx";

class UserContextStore {
    @observable public isAuthenticated: boolean;

    constructor() {
        this.isAuthenticated = false;
    }

    @action
    public loadContext = async () => {
    }
}

export const userContextStore = new UserContextStore();
