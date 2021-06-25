import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoryService){}

    @Render('categories/index.hbs')
    @Get('index')
    async index() {
        let categories = await this.categoriesService.findAll();
        return {categories : categories};
    }

    @Render('categories/create.hbs')
    @Get('create')
    create(){}

    @Post('create')
    async createOne(@Body() createCategory : CreateCategoryDto, @Res() res){
        await this.categoriesService.createOne(createCategory);
        res.status(302).redirect('/category/index')
    }

    @Render('categories/update.hbs')
    @Get('update')
    async update(@Query() query){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category}
    }

    @Post('update')
    async updateOne(@Body() updateCategory : UpdateCategoryDto, @Res() res){
        await this.categoriesService.updateOne(updateCategory);
        res.status(302).redirect('/category/index')
    }

    @Render('categories/detail.hbs')
    @Get('detail')
    async detail(@Query() query){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category};
    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res){
        this.categoriesService.deleteOne(query.id);
        res.status(302).redirect('/category/index')
    }
}
