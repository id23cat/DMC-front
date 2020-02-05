import { runInAction } from "mobx";
import { userContextStore } from "../../stores/userContextStore";
import { UserApi } from "../api/userApi";

export class UserAccountService {
    private static accessTokenKey = "user_access_token";

    public static signIn = async (username: string, password: string) => {
        const { token } = await UserApi.signIn({ username, password });
        runInAction(() => {
            userContextStore.isAuthenticated = true;
            localStorage.setItem(UserAccountService.accessTokenKey, token);
        });

        await UserAccountService.loadContext();
    };

    public static signUp = async (username: string, password: string) => {
        return UserApi.signUp({ username, password });
    };

    public static signOut = async () => {
        userContextStore.isAuthenticated = false;
        localStorage.removeItem(UserAccountService.accessTokenKey);
        await UserAccountService.loadContext();
    };

    public static loadContext = async () => {
        // TODO: add
        if (localStorage.getItem(UserAccountService.accessTokenKey)) {
            userContextStore.isAuthenticated = true;
        }
    };

    public static getUserAccessToken = (): string | null => {
        return localStorage.getItem(UserAccountService.accessTokenKey);
    };
}
