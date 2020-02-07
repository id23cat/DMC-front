import { observable } from "mobx";
import { userContextStore } from "../../stores/userContextStore";

export class UserAccountStore {
    @observable username?: string;

    constructor() {
        this.username = userContextStore.username;
    }
}
