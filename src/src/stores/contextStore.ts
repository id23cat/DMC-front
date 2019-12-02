import { action, observable } from "mobx";

class ContextStore {
    @observable public isAuthenticated: boolean;

    constructor() {
        this.isAuthenticated = false;
    }

    @action
    public loadContext = async () => {
        // TODO: stub
    }
}

export const contextStore = new ContextStore();
