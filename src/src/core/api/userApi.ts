import { AuthenticationRequestDto, AuthenticationResultDto, UserDto } from "./dtos";
import { DmcRestApi } from "./dmcRestApi";

export class UserApi {
    public static signIn = async (data: AuthenticationRequestDto): Promise<AuthenticationResultDto> => {
        return DmcRestApi.post<AuthenticationResultDto>("/authenticate", data);
    };

    public static signUp = async (data: UserDto) => {
        return DmcRestApi.post("/register", data);
    };
}
