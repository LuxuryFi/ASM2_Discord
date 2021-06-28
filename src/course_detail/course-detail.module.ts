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
import { CourseDetailController } from './course-detail.controller';
import { CourseDetailService } from './course-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDetail,Category,Subject,Course,Trainer])],
  controllers: [CourseDetailController],
  providers: [CourseDetailService,SubjectService,TrainerService,CourseService,CategoryService]
})
export class CourseDetailModule {}
