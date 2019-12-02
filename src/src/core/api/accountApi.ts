import { HttpApi } from "./http/httpApi";

export class AccountApi {
    public static signIn = async (data: SignInDataContract) => {
        return HttpApi.post("/authenticate", data);
    };

    public static signUp = async (data: SignInDataContract) => {
        return HttpApi.post("/register", data);
    };
}

interface SignInDataContract {
    username: string;
    password: string;
}
