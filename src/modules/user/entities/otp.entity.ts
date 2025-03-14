import { Column, Entity, OneToOne } from "typeorm";
import { EntityNames } from "src/common/enums/entity.enum";
import { UserEntity } from "./user.entity";
import { AbstractEntity } from "src/common/abstracts/base.entity";

@Entity(EntityNames.Otp)
export class OtpEntity extends AbstractEntity {
    @Column()
    code:number;
    @Column({ nullable: true })
    expiresIn:Date;
    @Column()
    userId:string;
    @OneToOne(() => UserEntity, user => user.otp, { onDelete: "CASCADE" })
    user: UserEntity;
}