import { action, observable } from "mobx";
import { UserAccountService } from "../../core/services/userAccountService";

export class LoginStore {
    @observable public username?: string;
    @observable public password?: string;

    @action public setLogin = (value?: string) => (this.username = value);
    @action public setPassword = (value?: string) => (this.password = value);

    @action
    public signIn = async () => {
        await UserAccountService.signIn(this.username!, this.password!);
    };
}
