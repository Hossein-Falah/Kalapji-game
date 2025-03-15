import { Inject, Injectable } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { ICategoryService } from './interfaces/category-service.interface';
import { CATEGORY_REPOSITORY } from './constants/token.constant';
import { ICategoryRepository } from './interfaces/category-repository';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY) private categoryRepository: ICategoryRepository) {}

  create(categoryDto: CategoryDto) {
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  findOneBySlug(slug: string) {
    return `This action returns a #${slug} category`;
  }

  update(id: string, categoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
