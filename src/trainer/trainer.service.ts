import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTrainerDTO } from './dto/create-trainer.dto';
import { Trainer } from '../database/entities/trainer.entity';
import { updateTrainerDTO } from './dto/update-trainer.dto';
@Injectable()
export class TrainerService {
    constructor (@InjectRepository(Trainer) private trainerRepository: Repository<Trainer>) {}

    async createOne(createTrainer : createTrainerDTO)  {
        let trainer = await this.trainerRepository.create(createTrainer);
        this.trainerRepository.save(trainer);

    }

    async findOne(id : number) : Promise<Trainer> {
        return await this.trainerRepository.findOne(id);
    }

    async findAll() : Promise<Trainer[]> {
        return await this.trainerRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.trainerRepository.delete(id);
    }

    async updateOne(updateTrainer: updateTrainerDTO) : Promise<void> {
        let id = updateTrainer.id
        let name = updateTrainer.name
        let avatar = updateTrainer.avatar
        let phone = updateTrainer.phone
        let email = updateTrainer.email
        let passsword = updateTrainer.passsword
        let role_id = updateTrainer.role_id
    
    }

}

