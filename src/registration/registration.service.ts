import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { Registration } from 'src/database/entities/registration.entity';
import { Subject } from 'src/database/entities/subject.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { getConnection, Repository } from 'typeorm';
import { createRegisDto } from './dto/create-regis.dto';

@Injectable()
export class RegistrationService {
    constructor(@InjectRepository(Registration) private readonly registrationRepository : Repository<Registration> ){}
    async create(createRegis : createRegisDto){

        let result = JSON.parse(createRegis.course_detail_value)

        createRegis.course_id = result.course_id;
        createRegis.trainer_id = result.trainer_id;
        createRegis.subject_id = result.subject_id;

        console.log(result)

        let registration = await this.registrationRepository.create(createRegis);
        await this.registrationRepository.save(registration);
    }

    async findAll() : Promise<Registration[]> {
        return await getConnection().createQueryBuilder().
        select('registration', 'course_detail.trainer')
        .from(Registration,'registration')
        .innerJoinAndSelect("registration.course_detail", "course_detail")
        .innerJoinAndSelect("registration.trainee", "trainee")
        .innerJoinAndMapOne('registration.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('registration.subject',Subject, 'subject', 'course_detail.subject_id = subject.id')
        .innerJoinAndMapOne('registration.course',Course, 'course', 'course_detail.course_id = course.id')
        .getMany();
    }

    async findAllTraineeByCourse(course_id :number, subject_id:number, trainer_id : number) {
        return await getConnection().createQueryBuilder().
        select('registration', 'course_detail.trainer')
        .from(Registration,'registration')
        .innerJoinAndSelect("registration.course_detail", "course_detail")
        .innerJoinAndSelect("registration.trainee", "trainee")
        .innerJoinAndMapOne('registration.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('registration.subject',Subject, 'subject', 'course_detail.subject_id = subject.id')
        .innerJoinAndMapOne('registration.course',Course, 'course', 'course_detail.course_id = course.id')
        .where("course.id = :id1", {id1: course_id})
        .andWhere("subject.id = :id2", {id2: subject_id})
        .andWhere("trainer.id = :id3", {id3: trainer_id})
        .getMany();
    }


    async findAllTrainee(trainee_id : number) : Promise<Registration[]>{
        return await getConnection().createQueryBuilder().
        select('registration', 'course_detail.trainer')
        .from(Registration,'registration')
        .innerJoinAndSelect("registration.course_detail", "course_detail")
        .innerJoinAndSelect("registration.trainee", "trainee")
        .innerJoinAndMapOne('registration.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('registration.subject',Subject, 'subject', 'course_detail.subject_id = subject.id')
        .innerJoinAndMapOne('registration.course',Course, 'course', 'course_detail.course_id = course.id')
        .where("trainee.id = :id3", {id3: trainee_id})
        .getMany();
    }


    async findOne(course_id :number, subject_id:number, trainer_id : number, trainee_id: number){
        return await getConnection().createQueryBuilder().
        select('registration', 'course_detail.trainer')
        .from(Registration,'registration')
        .innerJoinAndSelect("registration.course_detail", "course_detail")
        .innerJoinAndSelect("registration.trainee", "trainee")
        .innerJoinAndMapOne('registration.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('registration.subject',Subject, 'subject', 'course_detail.subject_id = subject.id')
        .innerJoinAndMapOne('registration.course',Course, 'course', 'course_detail.course_id = course.id')
        .where("course.id = :id1", {id1: course_id})
        .andWhere("subject.id = :id2", {id2: subject_id})
        .andWhere("trainer.id = :id3", {id3: trainer_id})
        .andWhere("trainee.id = :id4",{id4: trainee_id})
        .getOneOrFail();
    }

    async delete(course_id :number, subject_id:number, trainer_id : number, trainee_id: number){
        await getConnection().createQueryBuilder()
        .delete()
        .from(Registration)
        .andWhere("registration.subject_id = :id2", {id2: subject_id})
        .andWhere("registration.trainer_id = :id3", {id3: trainer_id})
        .andWhere("registration.trainee_id = :id4",{id4: trainee_id})
        .execute()
    }




}
