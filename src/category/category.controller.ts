import { Body, Controller, Get, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService : CategoryService){}

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('categories/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let categories = await this.categoriesService.findAll();
        return {categories : categories, user: req.user};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('categories/create.hbs')
    @Get('create')
    create(@Req() req){
        return { user: req.user};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Body() createCategory : CreateCategoryDto, @Res() res){
        await this.categoriesService.createOne(createCategory);
        res.status(302).redirect('/category/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('categories/update.hbs')
    @Get('update')
    async update(@Query() query, @Req() req){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('update')
    async updateOne(@Body() updateCategory : UpdateCategoryDto, @Res() res){
        await this.categoriesService.updateOne(updateCategory);
        res.status(302).redirect('/category/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('categories/detail.hbs')
    @Get('detail')
    async detail(@Query() query, @Req() req){
        let category = await this.categoriesService.findOne(query.id);
        return {category : category, user: req.user};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res){
        this.categoriesService.deleteOne(query.id);
        res.status(302).redirect('/category/index')
    }
}
