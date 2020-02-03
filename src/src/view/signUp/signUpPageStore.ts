import { action, observable } from "mobx";
import { ValidationFunction } from "../../components/forms/validations";

export class SignUpPageStore {
    @observable login?: string;
    @observable password?: string;
    @observable confirmPassword?: string;

    @action setLogin = (value?: string) => this.login = value;
    @action setPassword = (value?: string) => this.password = value;
    @action setConfirmPassword = (value?: string) => this.confirmPassword = value;

    public passwordsShouldBeEqual: ValidationFunction<string | undefined> = () => {
        return this.password !== this.confirmPassword ? "passwordsShouldBeEqual" : undefined;
    };

    public submit = async () => {
        // TODO: add
    };
}
