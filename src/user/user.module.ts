import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CourseService } from 'src/course/course.service';
import { CourseDetailService } from 'src/course_detail/course-detail.service';
import { Category } from 'src/database/entities/category.entity';
import { Course } from 'src/database/entities/course.entity';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { Registration } from 'src/database/entities/registration.entity';
import { Subject } from 'src/database/entities/subject.entity';
import { Trainee } from 'src/database/entities/trainee.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { RegistrationController } from 'src/registration/registration.controller';
import { RegistrationService } from 'src/registration/registration.service';
import { SubjectService } from 'src/subject/subject.service';
import { TraineeService } from 'src/trainee/trainee.service';
import { TrainerController } from 'src/trainer/trainer.controller';
import { TrainerService } from 'src/trainer/trainer.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee, CourseDetail,Category,Subject,Course,Trainer,Registration])],
  controllers: [UserController],
  providers: [UserService,TraineeService,CourseDetailService, RegistrationService,SubjectService,TrainerService,CourseService,CategoryService]
})
export class UserModule {}
