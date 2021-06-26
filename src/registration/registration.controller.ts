import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { CourseDetailService } from 'src/course_detail/course-detail.service';
import { TraineeService } from 'src/trainee/trainee.service';
import { createRegisDto } from './dto/create-regis.dto';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
    constructor(
        private readonly coursedetailService: CourseDetailService,
        private readonly registrationService: RegistrationService,
        private readonly traineeService: TraineeService
    ){}

    @Render('registration/index.hbs')
    @Get('index')
    async index(){
        let registration =await this.coursedetailService.findAll();

        return {registration: registration}
    }

    @Render('registration/create.hbs')
    @Get('create')
    async create(){
        let coursedetails = await this.coursedetailService.findAll();
        let trainees = await this.traineeService.findAll();
        return {coursedetails: coursedetails, trainees: trainees}
    }

    @Post('create')
    async createOne(@Body() createRegis : createRegisDto, @Res() res){
       await this.registrationService.create(createRegis);
        res.status(302).redirect('/registration/create')
    }

    @Render('registration/list.hbs')
    @Get('detail')
    async detail(@Res()  res, @Query() query){
        let trainees = await this.registrationService.findAllTraineeByCourse(query.course_id,query.subject_id,query.trainer_id);
        let courses = {
            course_id : query.course_id,
            subject_id: query.subject_id,
            trainer_id: query.trainer_id
        }
        console.log(trainees)
        return {trainees : trainees, courses: courses}
    }

    @Get('delete')
    async delete(@Res() res, @Query() query){
        await this.registrationService.delete(query.course_id,query.subject_id,query.trainer_id,query.trainee_id)
        res.status(302).redirect('/registration/detail?course_id=' + query.course_id + '&subject_id=' + query.subject_id + '&trainer_id=' +query.trainer_id)
    }

    @Render('registration/create.hbs')
    @Get('add')
    async add(@Query() query){
        let courses = await this.coursedetailService.findMany(query.course_id,query.subject_id,query.trainer_id)
        let trainees = await this.traineeService.findAll();
        console.log(trainees)
        return  {coursedetails : courses, trainees: trainees}
    }

}
