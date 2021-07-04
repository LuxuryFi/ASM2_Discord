import { Body, Controller, Get, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { CourseDetailService } from 'src/course_detail/course-detail.service';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
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

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('registrations/index.hbs')
    @Get('index')
    async index(@Req() req){
        let registration =await this.registrationService.findAll();
        return {trainees: registration,  user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('registrations/create.hbs')
    @Get('create')
    async create(@Req() req){
        let coursedetails = await this.coursedetailService.findAll();
        let trainees = await this.traineeService.findAll();
        return {coursedetails: coursedetails, trainees: trainees, user: req.users}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Body() createRegis : createRegisDto, @Res() res){
        await this.registrationService.create(createRegis);
        res.status(302).redirect('/registration/create')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('registrations/index.hbs')
    @Get('detail')
    async detail(@Res()  res,@Req() req, @Query() query){
        let trainees = await this.registrationService.findAllTraineeByCourse(query.course_id,query.subject_id,query.trainer_id);
        let courses = {
            course_id : query.course_id,
            subject_id: query.subject_id,
            trainer_id: query.trainer_id
        }
        return {trainees : trainees, courses: courses, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async delete(@Res() res, @Query() query){
        await this.registrationService.delete(query.course_id,query.subject_id,query.trainer_id,query.trainee_id)
        res.status(302).redirect('/registration/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('registrations/create.hbs')
    @Get('add')
    async add(@Query() query,@Req() req){
        let courses = await this.coursedetailService.findMany(query.course_id,query.subject_id,query.trainer_id)
        let trainees = await this.traineeService.findAll();
        return  {coursedetails : courses, trainees: trainees, user: req.user}
    }
}
