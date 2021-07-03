import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoryService){}

    @Render('categories/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let categories = await this.categoriesService.findAll();
        return {categories : categories, user: req.user};
    }

    @Render('categories/create.hbs')
    @Get('create')
    create(@Req() req){
        return { user: req.user};
    }

    @Post('create')
    async createOne(@Body() createCategory : CreateCategoryDto, @Res() res){
        await this.categoriesService.createOne(createCategory);
        res.status(302).redirect('/category/index')
    }

    @Render('categories/update.hbs')
    @Get('update')
    async update(@Query() query, @Req() req){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category, user: req.user}
    }

    @Post('update')
    async updateOne(@Body() updateCategory : UpdateCategoryDto, @Res() res){
        await this.categoriesService.updateOne(updateCategory);
        res.status(302).redirect('/category/index')
    }

    @Render('categories/detail.hbs')
    @Get('detail')
    async detail(@Query() query, @Req() req){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category, user: req.user};
    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res){
        this.categoriesService.deleteOne(query.id);
        res.status(302).redirect('/category/index')
    }
}
