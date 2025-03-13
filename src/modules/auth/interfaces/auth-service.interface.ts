export interface IAuthService {
    sendOtp(): Promise<void>;
    checkOtp(): Promise<void>;
    refreshToken(): Promise<void>;
    logout(): Promise<void>;
}