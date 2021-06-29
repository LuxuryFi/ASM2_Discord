import { Controller, Get, Query, Render } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { CourseDetailService } from 'src/course_detail/course-detail.service';
import { RegistrationService } from 'src/registration/registration.service';
import { SubjectService } from 'src/subject/subject.service';
import { TrainerService } from 'src/trainer/trainer.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly coursedetailService: CourseDetailService,
        private readonly subjectService: SubjectService,
        private readonly trainerService: TrainerService,
        private readonly registrationService: RegistrationService,
        private readonly courseService: CourseService
    ) { }

    @Render('users/index.hbs')
    @Get('index')
    index() {

    }

    @Render('users/traineeCourse.hbs')
    @Get('coursetrainee')
    async getTraineeCourse(@Query() query){
        const courses = await this.coursedetailService.findByCourse(query.trainer_id);
        return {courses: courses}
    }

    @Render('users/trainerCourse.hbs')
    @Get('coursetrainer')
    getTrainerCourse(){

    }

    @Render('users/layout.hbs')
    @Get('test')
    test() {

    }


    @Render('users/courseList.hbs')
    @Get('course')
    async getCourseLList() {
        const courses = await this.coursedetailService.findAll();
        return {courses:courses}

    }

    @Render('users/traineeList.hbs')
    @Get('student')
    async getTraineeList(@Query() query){
        const trainees = await this.registrationService.findAllTraineeByCourse(query.course_id, query.subject_id,query.trainer_id);
        return {trainees: trainees}
    }


}
