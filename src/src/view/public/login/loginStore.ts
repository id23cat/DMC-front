import { action, observable } from "mobx";
import { userContextStore } from "../../../stores/userContextStore";
import { routingStore } from "../../../stores/routingStore";
import { notifications } from "../../../components/notifications/notifications";

export class LoginStore {
    @observable public login?: string;
    @observable public password?: string;

    @action public setLogin = (value?: string) => this.login = value;
    @action public setPassword = (value?: string) => this.password = value;

    public signIn = async () => {
        const result = { succeeded: true };

        if (result.succeeded) {
            await userContextStore.loadContext();
            await routingStore.gotoBase();
        } else {
            notifications.error("InvalidLoginOrPassword");
        }
    };
}
