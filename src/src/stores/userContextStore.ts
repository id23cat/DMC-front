import { observable } from "mobx";

class UserContextStore {
    @observable public isAuthenticated: boolean = false;
    @observable public id?: string;
}

export const userContextStore = new UserContextStore();
