import { action, runInAction } from "mobx";
import { userContextStore } from "../../stores/userContextStore";
import { UserApi } from "../api/userApi";
import { ApiError } from "../api/errors/apiError";

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
        UserAccountService.clearAccountData();
        await UserAccountService.loadContext();
    };

    public static loadContext = async () => {
        try {
            const result = await UserApi.getUserContext();
            runInAction(() => {
                Object.assign(userContextStore, result);
                userContextStore.isAuthenticated = !!result.id;
            });
        } catch (e) {
            const error = e as ApiError;
            if (error.response.status === 401) {
                UserAccountService.clearAccountData();
            } else {
                throw e;
            }
        }
    };

    public static getUserAccessToken = (): string | null => {
        return localStorage.getItem(UserAccountService.accessTokenKey);
    };

    @action
    private static clearAccountData = () => {
        userContextStore.isAuthenticated = false;
        userContextStore.username = undefined;
        userContextStore.id = undefined;
        localStorage.removeItem(UserAccountService.accessTokenKey);
    };
}
