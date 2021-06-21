import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

    async createOne(createCategory : CreateCategoryDto): Promise<void> {
        let category = this.categoryRepository.create(createCategory);
        await this.categoryRepository.save(category);
    }

    async findOne(id:number) : Promise<Category> {
        return  await this.categoryRepository.findOne(id);
    }

    async findAll() : Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async updateOne(updateCategory : UpdateCategoryDto) : Promise<void> {
        await this.categoryRepository.update(
            {id: updateCategory.id},
            {
                category_name : updateCategory.category_name,
                category_description: updateCategory.category_description,
            }
        )
    }

    async deleteOne(id :number) : Promise<void> {
        this.categoryRepository.delete(id);
    }
}
