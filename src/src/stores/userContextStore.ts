import { observable } from "mobx";

class UserContextStore {
    @observable public isAuthenticated: boolean;
    @observable public id?: string;

    constructor() {
        this.isAuthenticated = false;
    }

    public loadContext = async () => {
        // TODO: add
    };
}

export const userContextStore = new UserContextStore();
