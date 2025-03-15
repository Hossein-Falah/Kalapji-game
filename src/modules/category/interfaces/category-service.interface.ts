import { CategoryDto, UpdateCategoryDto } from "../dto/category.dto"

export interface ICategoryService {
    create(categoryDto: CategoryDto): any;
    findAll(): any;
    findOne(id: string): any
    findOneBySlug(slug: string): any
    update(id: string, categoryDto: UpdateCategoryDto): any
    remove(id: string): any
}