import { Body, Controller, Get , Post, Query, Render, Req, Request, Res, UseGuards} from '@nestjs/common';
import { query } from 'express';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseService } from './course.service';
import { CategoryService } from 'src/category/category.service';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService:
        CourseService, private readonly categoryService : CategoryService){}

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render ('courses/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let courses = await this.courseService.findAll();
        return {courses: courses, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('courses/create.hbs')
    @Get('create')
    async create (@Req() req) {
        let categories = await this.categoryService.findAll();
        return {categories: categories, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Body() createCourse : CreateCourseDto, @Res() res)
    {
        try
        {
            await this.courseService.createOne(createCourse);
            res.status(302).redirect('/course/index');
        }
        catch(error)
        {
            console.log('Function: Create one trainee');
            console.log(error);
        }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('courses/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let course = await this.courseService.findOne(query.id);
        let categories = await this.categoryService.findAll();
        return { course : course, categories : categories, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('update')
    async updateOne(@Body() updateCourse : UpdateCourseDto, @Res() res) {
        console.log(updateCourse)
        try {
            this.courseService.updateOne(updateCourse);
            res.status(302).redirect('/course/index')
        } catch (error) {
            console.log(error)
        }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.courseService.deleteOne(query.id);
        res.status(302).redirect('/course/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('courses/view.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let course = this.courseService.findOne(query.id);
        return { course : course, user: req.user}
    }

}
