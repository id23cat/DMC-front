import { action, observable, runInAction } from "mobx";
import { userContextStore } from "../../../stores/userContextStore";

export class LoginStore {
    @observable public login?: string;
    @observable public password?: string;

    @action public setLogin = (value?: string) => this.login = value;
    @action public setPassword = (value?: string) => this.password = value;

    @action
    public signIn = async () => {
        //TODO: stub

        await userContextStore.loadContext();
        const flag = userContextStore.isAuthenticated;
        runInAction(() => {
            userContextStore.isAuthenticated = true;

        });
    };
}
