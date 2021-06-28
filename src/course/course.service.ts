import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

    async createOne(createCourse: CreateCourseDto) {
        let course = this.courseRepository.create(createCourse);
        await this.courseRepository.save(course);
    }

    async findOne(id: number) {
        return await getConnection().createQueryBuilder()
        .select(['course','category.category_name'])
        .from(Course,'course')
        .innerJoinAndSelect('course.category','category')
        .where('course.id = :id', {id : id})
        .getOne()
    }

    async findAll(): Promise<Course[]> {
        return await getConnection().createQueryBuilder()
            .select(['course', 'category.category_name'])
            .from(Course, 'course')
            .innerJoinAndSelect("course.category", "category")
            //.where("course.id = :id, {id=1}")
            .getMany();
    }

    async updateOne(updateCourse: UpdateCourseDto) {
        this.courseRepository.update({ id: updateCourse.id }, {
            course_name: updateCourse.course_name,
            course_description: updateCourse.course_description, category_id: updateCourse.category_id
        })
    }

    async deleteOne(id: number) {
        await this.courseRepository.delete(id);
    }


}
