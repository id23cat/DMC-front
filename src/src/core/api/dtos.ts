export interface AuthenticationRequestDto {
    username: string;
    password: string;
}

export interface UserDto {
    username: string;
    password: string;
}

export interface AuthenticationResultDto {
    token: string;
}

export interface UserContext {
    id?: string;
    username?: string;
}
