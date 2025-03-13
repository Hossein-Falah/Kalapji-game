import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user-repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor() {}

    
}