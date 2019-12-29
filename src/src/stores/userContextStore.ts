import { observable } from "mobx";

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
}

export const userContextStore = new UserContextStore();
