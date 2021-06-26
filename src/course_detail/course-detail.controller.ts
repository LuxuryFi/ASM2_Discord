import { Body, Controller, Get, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
//import { Role } from 'src/role/role.enum';
//import { RolesGuard } from 'src/role/role.guard';
//import { Roles } from 'src/role/roles.decorator';
import { SubjectService } from 'src/subject/subject.service';
import { TrainerService } from 'src/trainer/trainer.service';
import { CourseDetailService } from './course-detail.service';
import { createCourseDetailDto } from './dto/create-course-detail.dto';
import { updateCourseDetailDto } from './dto/update-course-detail.dto';

@Controller('course-detail')
export class CourseDetailController {
    constructor(
        private readonly coursedetailService: CourseDetailService,
        private readonly subjectService: SubjectService,
        private readonly trainerService: TrainerService,
        private readonly courseService: CourseService,
        private readonly categoryService: CategoryService
    ) { }


    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Render('course-detail/index.hbs')
    @Get('index')
    async index() {
        let course_details = await this.coursedetailService.findAll();
       return {course_details : course_details}
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Render('course-detail/create.hbs')
    @Get('create')
    async create() {
        let courses = await this.courseService.findAll();
        let subjects = await this.subjectService.findAll();
        let trainers = await this.trainerService.findAll();

        return { courses: courses, subjects: subjects, trainers: trainers }
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Res() res, @Body() createCourseDetail: createCourseDetailDto) {
        await this.coursedetailService.create(createCourseDetail);
        res.status(302).redirect('/course-detail/index')
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Render('course-detail/detail.hbs')
    @Get('detail')
    async detail(@Query() query){
        let course_detail = await this.coursedetailService.findOne(query.course_id,query.subject_id,query.trainer_id);

        return {course_detail: course_detail}
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Render('course-detail/update.hbs')
    @Get('update')
    async update(@Query() query){
        let course_detail = await this.coursedetailService.findOne(query.course_id,query.subject_id,query.trainer_id);
        let courses = await this.courseService.findAll();
        let subjects = await this.subjectService.findAll();
        let trainers = await this.trainerService.findAll();

        return {course_detail: course_detail,courses: courses, subjects: subjects, trainers: trainers}
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Post('update')
    async updateOne(@Res() res,@Body() updateCourseDetail : updateCourseDetailDto){
        await this.coursedetailService.update(updateCourseDetail);
        res.status(302).redirect('/course-detail/index')
    }

    //@Roles(Role.Admin,Role.Staff)
    //@UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Res() res, @Query() query){
        await this.coursedetailService.delete(query.course_id,query.subject_id,query.trainer_id)
        res.status(302).redirect('/course-detail/index')
    }


}