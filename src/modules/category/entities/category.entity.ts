import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EntityNames } from "src/common/enums/entity.enum";
import { AbstractEntity } from "src/common/abstracts/base.entity";

@Entity(EntityNames.Categories)
export class CategoryEntity extends AbstractEntity {
    @Column({ type: "varchar", length: 255, nullable: false })
    title: string;
    @Column({ type: "varchar", length: 255, nullable: true })
    description: string;
    @Column({ type: "varchar", nullable: false })
    image: string;
    @Column({ type: "varchar", length: 255, nullable: false })
    slug: string;
    @ManyToOne(() => CategoryEntity, category => category.children, { nullable: true, onDelete: "CASCADE" })
    parent: CategoryEntity;
    @OneToMany(() => CategoryEntity, category => category.parent)
    children: CategoryEntity[];
}
