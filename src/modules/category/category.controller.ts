import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SwaggerConsmes } from 'src/common/enums/swagger.consumes.enum';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CATEGORY_SERVICE } from './constants/token.constant';
import { ICategoryService } from './interfaces/category-service.interface';

@Controller('category')
@ApiTags("Category 📂")
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private categoryService: ICategoryService) {}

  @Post()
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  
  @Get("/:slug")
  findBySlug(@Param("slug") slug:string) {
    return this.categoryService.findOneBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() categoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, categoryDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
