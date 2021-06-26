import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { CourseDetailController } from './course-detail.controller';
import { CourseDetailService } from './course-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDetail])],
  controllers: [CourseDetailController],
  providers: [CourseDetailService]
})
export class CourseDetailModule {}
