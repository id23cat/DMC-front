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
        const result = await UserApi.getUserContext();
        runInAction(() => {
            Object.assign(userContextStore, result);
            userContextStore.isAuthenticated = !!result.id;
        });
    };

    public static getUserAccessToken = (): string | null => {
        return localStorage.getItem(UserAccountService.accessTokenKey);
    };
}
