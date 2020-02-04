import { runInAction } from "mobx";
import { userContextStore } from "../../stores/userContextStore";
import { UserApi } from "../api/userApi";

export class UserAccountService {
    public static signIn = async (username: string, password: string) => {
        const { token } = await UserApi.signIn({ username, password });
        runInAction(() => {
            userContextStore.isAuthenticated = true;
            userContextStore.token = token;
        });

        await UserAccountService.loadContext();
    };

    public static signUp = async (username: string, password: string) => {
        return UserApi.signUp({ username, password });
    };

    public static signOut = async () => {
        // TODO: add
        userContextStore.isAuthenticated = false;
        await UserAccountService.loadContext();
    };

    public static loadContext = async () => {
        // TODO: add
    };
}
