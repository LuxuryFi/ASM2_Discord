import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import { TraineeModule } from './trainee/trainee.module';
import { TrainerModule } from './trainer/trainer.module';
import { CategoryModule } from './category/category.module';
import { SubjectModule } from './subject/subject.module';
import { CourseModule } from './course/course.module';
import { CourseDetailModule } from './course_detail/course-detail.module';
import { RegistrationModule } from './registration/registration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [AdminModule, StaffModule, TraineeModule, TrainerModule, CategoryModule, SubjectModule, CourseModule, CourseDetailModule, RegistrationModule,
  TypeOrmModule.forRootAsync({
    useFactory: async () => Object.assign( await getConnectionOptions(), {
      autoLoadEntities: true,
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
