import { HttpApi } from "./http/httpApi";
import { AuthenticationRequestDto, AuthenticationResultDto, UserDto } from "./dtos";

export class UserApi {
    public static signIn = async (data: AuthenticationRequestDto): Promise<AuthenticationResultDto> => {
        return HttpApi.post<AuthenticationResultDto>("/authenticate", data);
    };

    public static signUp = async (data: UserDto) => {
        return HttpApi.post("/register", data);
    };
}
