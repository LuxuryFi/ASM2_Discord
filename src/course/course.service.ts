import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCourseDto } from './dto/create-course.dto';
import { Course } from '../database/entities/course.entity';
import { updateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor (@InjectRepository(Course) private courseRepository: Repository<Course>) {}

    async createOne(createCourse : createCourseDto)  {
        let course = await this.courseRepository.create(createCourse);
        this.courseRepository.save(course);

    }

    async findOne(id : number) : Promise<Course> {
        return await this.courseRepository.findOne(id);
    }

    async findAll() : Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.courseRepository.delete(id);
    }

    async updateOne(updateCourse: updateCourseDto) : Promise<void> {
        let id = updateCourse.id
        let course_name = updateCourse.course_name
        let course_description = updateCourse.course_description
        let category_id = updateCourse.category_id
    
    }

}


