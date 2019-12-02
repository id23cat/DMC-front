import { action, observable } from "mobx";
import { routingStore } from "../../../stores/routingStore";
import { notifications } from "../../../components/notifications/notifications";
import { AccountApi } from "../../../core/api/accountApi";

export class SignUpStore {
    @observable public username?: string;
    @observable public password?: string;
    @observable public repeatPassword?: string;

    @action public setLogin = (value?: string) => this.username = value;
    @action public setPassword = (value?: string) => this.password = value;
    @action public setRepeatPassword = (value?: string) => this.repeatPassword = value;

    public repeatPasswordValidation = () => {
        return this.repeatPassword !== this.password ? "repeatPasswordNotEqual" : undefined;
    };

    public signUp = async () => {
        await AccountApi.signUp({
            password: this.password!,
            username: this.username!,
        });
        notifications.success("SuccessfullyRegistered");
        routingStore.gotoBase();
    };
}
