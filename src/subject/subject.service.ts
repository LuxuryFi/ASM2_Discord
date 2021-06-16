import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from '../database/entities/subject.entity';
import { UpdateSubjectDto } from './dto/update-topic.dto';
@Injectable()
export class SubjectService {
    constructor (@InjectRepository(Subject) private subjectRepository: Repository<Subject>) {}

    async createOne(createSubject : CreateSubjectDto)  {
        let subject = await this.subjectRepository.create(createSubject);
        this.subjectRepository.save(subject);

        // INSERT INTO SUBJECT (name,description) VALUES ('anluon', 'ratlaluonnhe')
    }

    async findOne(id : number) : Promise<Subject> {
        return await this.subjectRepository.findOne(id);
    }

    async findAll() : Promise<Subject[]> {
        return await this.subjectRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.subjectRepository.delete(id);
    }

    async updateOne(updateSubject: UpdateSubjectDto) : Promise<void> {
        let sub_name =  updateSubject.sub_name
        let sub_description = updateSubject.sub_description

        this.subjectRepository.update(
            {id: updateSubject.old_id},
            {
                sub_name,
                sub_description
            }
        )
    }

}
