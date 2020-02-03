import { action, observable } from "mobx";
import { userContextStore } from "../../stores/userContextStore";
import { routingStore } from "../../stores/routingStore";

export class LoginStore {
    @observable public login?: string;
    @observable public password?: string;

    @action public setLogin = (value?: string) => this.login = value;
    @action public setPassword = (value?: string) => this.password = value;

    @action
    public signIn = async () => {
        //TODO: stub
        userContextStore.isAuthenticated = true;
        await userContextStore.loadContext();
        routingStore.goto("/");
    };
}
