import { Body, Controller, Get , Post, Query, Render, Req, Request, Res} from '@nestjs/common';
import { query } from 'express';
import { createCourseDetailDto } from './dto/create-course-detail.dto';
import { updateCourseDetailDto } from './dto/update-course-detail.dto';
import { CourseDetailService } from './course-detail.service';

@Controller('course-detail')
export class CourseDetailController {
    constructor(private readonly CourseDetailService:
        CourseDetailService){}

    @Render ('course-detail/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let course_detail = await this.CourseDetailService.findAll();
        return {course_detail: course_detail}
    }

    @Render('course_detail/create.hbs')
    @Get('create')
    async create () {}

    @Post('create')
    createOne(@Body() createCourseDetail : createCourseDetailDto, @Res() res)
    {
        try
        {
            this.CourseDetailService.createOne(createCourseDetail);
            res.status(302).redirect('/course_detail/index');
        }
        catch(error)
        {
            console.log('Function: Create one trainee');
            console.log(error);
        }
    }

    @Render('course_detail/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let course_detail = this.CourseDetailService.findOne(query.id);
        return { course_detail: course_detail}
    }

    @Post('update')
    async updateOne(@Body() updateCourseDetail : updateCourseDetailDto, @Res() res) {
        console.log(updateCourseDetail)
        try {
            this.CourseDetailService.updateOne(updateCourseDetail);
            res.status(302).redirect('/course_detail/index')
        } catch (error) {
            console.log(error)
        }

    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.CourseDetailService.deleteOne(query.id);
        res.status(302).redirect('/course_detail/index')
    }

    @Render('course_detail/view.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let course_detail = this.CourseDetailService.findOne(query.id);
        return { course_detail : course_detail}
    }

}
