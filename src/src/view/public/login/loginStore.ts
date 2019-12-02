import { action, observable } from "mobx";
import { userContextStore } from "../../../stores/userContextStore";
import { routingStore } from "../../../stores/routingStore";
import { notifications } from "../../../components/notifications/notifications";
import { AccountApi } from "../../../core/api/accountApi";

export class LoginStore {
    @observable public username?: string;
    @observable public password?: string;

    @action public setUsername = (value?: string) => this.username = value;
    @action public setPassword = (value?: string) => this.password = value;

    public signIn = async () => {
        await AccountApi.signIn({
            username: this.username!,
            password: this.password!,
        });

        // if (result.succeeded) {
        //     await userContextStore.loadContext();
        //     await routingStore.gotoBase();
        // } else {
        //     notifications.error("InvalidLoginOrPassword");
        // }
    };
}
