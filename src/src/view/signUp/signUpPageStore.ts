import { action, observable } from "mobx";

export class SignUpPageStore {
    @observable login?: string;
    @observable password?: string;
    @observable confirmPassword?: string;

    @action setLogin = (value?: string) => this.login = value;
    @action setPassword = (value?: string) => this.password = value;
    @action setConfirmPassword = (value?: string) => this.confirmPassword = value;

    public submit = async () => {
    };
}
