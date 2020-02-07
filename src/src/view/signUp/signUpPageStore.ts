import { action, observable } from "mobx";
import { ValidationFunction } from "../../components/forms/validations";
import { UserAccountService } from "../../core/services/userAccountService";
import { routingStore } from "../../stores/routingStore";

export class SignUpPageStore {
    @observable username?: string;
    @observable password?: string;
    @observable confirmPassword?: string;

    @action setUsername = (value?: string) => this.username = value;
    @action setPassword = (value?: string) => this.password = value;
    @action setConfirmPassword = (value?: string) => this.confirmPassword = value;

    public passwordsShouldBeEqual: ValidationFunction<string | undefined> = () => {
        return this.password !== this.confirmPassword ? "passwordsShouldBeEqual" : undefined;
    };

    public submit = async () => {
        await UserAccountService.signUp(this.username!, this.password!);
        routingStore.gotoBase();
    };
}
