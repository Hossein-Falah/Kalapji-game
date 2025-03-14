import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    findByPhone(phone:string): Promise<UserEntity | null>;
    createUser(phone:string): Promise<UserEntity>;
}