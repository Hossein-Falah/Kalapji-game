import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        description: "The title of the category",
        example: "Category 1",
        required: true,
    })
    @IsString({ message: "نام دسته بندی باید متن باشد" })
    @IsNotEmpty({ message: "نام دسته بندی اجباری است" })
    title: string;
    @ApiPropertyOptional({
        description: "The description of the category",
        example: "Description of the category",
        required: false,
    })
    @IsString({ message: "توضیحات دسته بندی باید متن باشد" })
    @IsOptional()
    description: string;
    @ApiProperty({
        type: "string",
        format: "binary",
        description: "The image of the category",
        example: "Image of the category",
        required: true,
    })
    @IsString({ message: "تصویر دسته بندی باید به صورت ادرس عکس باشد" })
    @IsNotEmpty({ message: "تصویر دسته بندی اجباری است" })
    image: string;
    @ApiProperty({
        description: "The slug of the category",
        example: "slug-of-the-category",
        required: true,
    })
    @IsString({ message: "اسلاگ دسته بندی باید متن باشد" })
    @IsNotEmpty({ message: "اسلاگ دسته بندی اجباری است" })
    slug: string;
    @ApiPropertyOptional({
        description: "The parent of the category",
        example: "Parent of the category",
        required: false,
    })
    @IsUUID(undefined, { message: "شناسه والد باید به صورت UUID باشد" })
    @IsOptional()
    parent: string;
}

export class UpdateCategoryDto extends PartialType(CategoryDto) {}