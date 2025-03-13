import { Column, Entity } from "typeorm";
import { EntityNames } from "src/common/enums/entity.enum";
import { AbstractEntity } from "src/common/abstracts/base.entity";
import { Roles } from "src/common/enums/role.enum";

@Entity(EntityNames.User)
export class UserEntity extends AbstractEntity {
    @Column({ nullable: true, unique: true })
    username:string;
    @Column({ nullable: true, unique: true })
    phone:string;
    @Column({ nullable: true, unique: true })
    email:string;
    @Column({ default: Roles.User })
    role:string;
    @Column({ nullable: true })
    password:string;
}