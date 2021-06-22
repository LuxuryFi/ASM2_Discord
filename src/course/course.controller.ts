import { Body, Controller, Get , Post, Query, Render, Req, Request, Res} from '@nestjs/common';
import { query } from 'express';
import { createCourseDto } from './dto/create-course.dto';
import { updateCourseDto } from './dto/update-course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService:
        CourseService){}

    @Render ('course/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let course = await this.courseService.findAll();
        return {course: course}
    }

    @Render('course/create.hbs')
    @Get('create')
    async create () {}

    @Post('create')
    createOne(@Body() createCourse : createCourseDto, @Res() res)
    {
        try
        {
            this.courseService.createOne(createCourse);
            res.status(302).redirect('/course/index');
        }
        catch(error)
        {
            console.log('Function: Create one trainee');
            console.log(error);
        }
    }

    @Render('course/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let course = this.courseService.findOne(query.id);
        return { course : course}
    }

    @Post('update')
    async updateOne(@Body() updateCourse : updateCourseDto, @Res() res) {
        console.log(updateCourse)
        try {
            this.courseService.updateOne(updateCourse);
            res.status(302).redirect('/course/index')
        } catch (error) {
            console.log(error)
        }

    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.courseService.deleteOne(query.id);
        res.status(302).redirect('/course/index')
    }

    @Render('course/view.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let course = this.courseService.findOne(query.id);
        return { course : course}
    }

}
