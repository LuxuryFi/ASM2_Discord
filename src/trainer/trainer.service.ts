import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { Trainer } from '../database/entities/trainer.entity';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
@Injectable()
export class TrainerService {
    constructor (@InjectRepository(Trainer) private trainerRepository: Repository<Trainer>) {}

    async createOne(createTrainer : CreateTrainerDto)  {
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

    async update(updateTrainer : UpdateTrainerDto) : Promise<void> {
        await this.trainerRepository.update(
            {id : updateTrainer.id},
            {
                name: updateTrainer.name,
                phone: updateTrainer.phone,
                avatar: updateTrainer.avatar,
                email: updateTrainer.email,
            }
        )
    }

    async findByEmail(username: string, password: string){
        return await this.trainerRepository.findOne({
            where: [
                {password:password},
                {email:username}
            ]
        })
    }

    async changePassword(username: string, password: string) {
        return await getConnection()
        .createQueryBuilder()
        .update(Trainer)
        .set({
            password: password
        })
        .where("email = :username", { username: username })
        .execute();
    }

}
