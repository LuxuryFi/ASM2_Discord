
require('dotenv').config({})
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
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdminModule, AuthModule, StaffModule, TraineeModule, TrainerModule, CategoryModule, SubjectModule, CourseModule, CourseDetailModule, RegistrationModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        "dist/**/*.entity.{js,ts}"
      ],
      migrations: [
        "src/migrations/**/*.ts"
      ],
      cli: {
        "migrationsDir": "src/migrations"
      },
      synchronize: false,
      autoLoadEntities: true
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
