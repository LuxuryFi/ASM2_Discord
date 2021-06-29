import {
    Injectable
} from '@nestjs/common';
import {
    InjectRepository
} from '@nestjs/typeorm';
import {
    getConnection,
    Repository
} from 'typeorm';
import {
    createCourseDetailDto
} from './dto/create-course-detail.dto';
import {
    CourseDetail
} from '../database/entities/coursedetail.entity';
import {
    updateCourseDetailDto
} from './dto/update-course-detail.dto';
import {
    Course
} from 'src/database/entities/course.entity';

@Injectable()
export class CourseDetailService {
    constructor(@InjectRepository(CourseDetail) private coursedetailRepository: Repository<CourseDetail>) { }

    async create(createDetail: createCourseDetailDto) {
        let coursedetail = await this.coursedetailRepository.create(createDetail);
        await this.coursedetailRepository.save(coursedetail);
    }

    async findOne(course_id: number, subject_id: number, trainer_id: number): Promise<CourseDetail> {
        return await getConnection().createQueryBuilder()
            .select('detail', 'course.id, trainer.id,subject.id')
            .from(CourseDetail, 'detail')
            .innerJoinAndSelect("detail.course", "course",)
            .innerJoinAndSelect("detail.subject", "subject",)
            .innerJoinAndSelect("detail.trainer", "trainer")
            .where("course.id = :id1", {
                id1: course_id
            })
            .andWhere("subject.id = :id2", {
                id2: subject_id
            })
            .andWhere("trainer.id = :id3", {
                id3: trainer_id
            })
            .getOne();
    }

    async findMany(course_id: number, subject_id: number, trainer_id: number): Promise<CourseDetail[]> {
        return await getConnection().createQueryBuilder()
            .select('detail', 'course.id, trainer.id,subject.id')
            .from(CourseDetail, 'detail')
            .innerJoinAndSelect("detail.course", "course",)
            .innerJoinAndSelect("detail.subject", "subject",)
            .innerJoinAndSelect("detail.trainer", "trainer")
            .where("course.id = :id1", {
                id1: course_id
            })
            .andWhere("subject.id = :id2", {
                id2: subject_id
            })
            .andWhere("trainer.id = :id3", {
                id3: trainer_id
            })
            .getMany();
    }





    async findAll(): Promise<CourseDetail[]> {

        return await getConnection().createQueryBuilder()
            .select('detail', 'course.id, trainer.id,subject.id')
            .from(CourseDetail, 'detail')
            .innerJoinAndSelect("detail.course", "course",)
            .innerJoinAndSelect("detail.subject", "subject",)
            .innerJoinAndSelect("detail.trainer", "trainer")
            .getMany();
    }

    async update(updateDetail: updateCourseDetailDto) {
        await getConnection().createQueryBuilder()
            .update(CourseDetail)
            .set({
                course_id: updateDetail.course_id,
                subject_id: updateDetail.subject_id,
                trainer_id: updateDetail.trainer_id
            })
            .where("course.id = :id1", {
                id1: updateDetail.course_oldid
            })
            .andWhere("subject.id = :id2", {
                id2: updateDetail.subject_oldid
            })
            .andWhere("trainer.id = :id3", {
                id3: updateDetail.trainer_oldid
            })
            .execute();
    }

    async delete(course_id: number, subject_id: number, trainer_id: number) {
        await getConnection().createQueryBuilder()
            .delete()
            .from(CourseDetail)
            .where("course.id = :id1", {
                id1: course_id
            })
            .andWhere("subject.id = :id2", {
                id2: subject_id
            })
            .andWhere("trainer.id = :id3", {
                id3: trainer_id
            })
            .execute()
    }

    async findByCourse(trainer_id: number): Promise<CourseDetail[]> {
        try {
            return await getConnection().createQueryBuilder()
                .select('detail', 'course.id, trainer.id,subject.id')
                .from(CourseDetail, 'detail')
                .innerJoinAndSelect("detail.course", "course",)
                .innerJoinAndSelect("detail.subject", "subject",)
                .innerJoinAndSelect("detail.trainer", "trainer",)
                .where("trainer.id = :id1", {
                    id1: trainer_id
                })
                .getMany();
        } catch (error) {
            console.log("Function: Hehe");
            console.log(error);
        }
    }
}
