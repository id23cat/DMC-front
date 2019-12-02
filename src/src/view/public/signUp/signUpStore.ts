import { action, observable } from "mobx";
import { routingStore } from "../../../stores/routingStore";
import { notifications } from "../../../components/notifications/notifications";

export class SignUpStore {
    @observable public login?: string;
    @observable public password?: string;
    @observable public repeatPassword?: string;

    @action public setLogin = (value?: string) => this.login = value;
    @action public setPassword = (value?: string) => this.password = value;
    @action public setRepeatPassword = (value?: string) => this.repeatPassword = value;

    public repeatPasswordValidation = () => {
        return this.repeatPassword !== this.password ? "repeatPasswordNotEqual" : undefined;
    };

    public signUp = async () => {
        notifications.success("SuccessfullyRegistered");
        routingStore.gotoBase();
    };
}
