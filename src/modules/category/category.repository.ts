import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ICategoryRepository } from "./interfaces/category-repository";
import { CategoryEntity } from "./entities/category.entity";

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        @InjectRepository(CategoryEntity) private categoryModel: Repository<CategoryEntity>
    ) {}
}