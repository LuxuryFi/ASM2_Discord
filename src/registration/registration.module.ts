import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
import { Category } from 'src/database/entities/category.entity';
import { Course } from 'src/database/entities/course.entity';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { Subject } from 'src/database/entities/subject.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { SubjectService } from 'src/subject/subject.service';
import { TrainerService } from 'src/trainer/trainer.service';
import { Registration } from 'src/database/entities/registration.entity';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { Trainee } from 'src/database/entities/trainee.entity';
import { TraineeService } from 'src/trainee/trainee.service';
import { CourseDetailService } from 'src/course_detail/course-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee, CourseDetail,Category,Subject,Course,Trainer,Registration])],
  controllers: [RegistrationController],
  providers: [TraineeService,CourseDetailService, RegistrationService,SubjectService,TrainerService,CourseService,CategoryService]
})
export class RegistrationModule {}
