import { observable } from "mobx";

class UserContextStore {
    @observable public token?: string;
    @observable public isAuthenticated: boolean;
    @observable public id?: string;

    constructor() {
        //TODO: change
        this.isAuthenticated = true;
    }
}

export const userContextStore = new UserContextStore();
