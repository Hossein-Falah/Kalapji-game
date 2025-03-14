import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserEntity } from "../entities/user.entity";
import { Roles } from "src/common/enums/role.enum";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private userModel: Repository<UserEntity>
    ) {}

    public async findByPhone(phone:string): Promise<UserEntity | null> {
        return await this.userModel.findOne({ where: { phone } });
    }

    public async createUser(phone:string): Promise<UserEntity> {
        const count = await this.userModel.count();

        const user = this.userModel.create({ 
            phone,
            role: count === 0 ? Roles.Admin : Roles.User
        })
        return await this.userModel.save(user);
    }
}