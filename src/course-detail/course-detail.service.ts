import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCourseDetailDto } from './dto/create-course-detail.dto';
import { CourseDetail } from '../database/entities/coursedetail.entity';
import { updateCourseDetailDto } from './dto/update-course-detail.dto';

@Injectable()
export class CourseDetailService {
    constructor (@InjectRepository(CourseDetail) private coursedetailRepository: Repository<CourseDetail>) {}

    async createOne(createCourseDetail : createCourseDetailDto)  {
        let coursedetail = await this.coursedetailRepository.create(createCourseDetail);
        this.coursedetailRepository.save(coursedetail);

    }

    async findOne(id : number) : Promise<CourseDetail> {
        return await this.coursedetailRepository.findOne(id);
    }

    async findAll() : Promise<CourseDetail[]> {
        return await this.coursedetailRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.coursedetailRepository.delete(id);
    }

    async updateOne(updateCourseDetail: updateCourseDetailDto) : Promise<void> {
        let course_id = updateCourseDetail.course_id
        let subject_id = updateCourseDetail.subject_id
        let trainer_id = updateCourseDetail.trainer_id
    }

}
