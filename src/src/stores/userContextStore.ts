import { action, observable } from "mobx";

class UserContextStore {
    @observable public isAuthenticated: boolean;
    @observable public id?: string;

    constructor() {
        //TODO: change
        this.isAuthenticated = true;
    }

    public loadContext = async () => {
        // TODO: add
    };

    @action
    public signOut = async () => {
        // TODO: add
        this.isAuthenticated = false;
        await this.loadContext();
    }
}

export const userContextStore = new UserContextStore();
