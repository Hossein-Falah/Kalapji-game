export type AuthResponse = {
    message: string;
    accessToken: string;
    refreshToken: string;
}

export type SendOtpResponse = {
    message: string;
    code: string;
}
