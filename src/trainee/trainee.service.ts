import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { Trainee } from 'src/database/entities/trainee.entity';
@Injectable()
export class TraineeService {
    constructor(@InjectRepository(Trainee) private traineeRepository : Repository<Trainee> ){}

    async createOne(createTrainee : CreateTraineeDto) {
        let trainee = await this.traineeRepository.create(createTrainee);
        this.traineeRepository.save(trainee);
    }

    async findOne(id : number) : Promise<Trainee> {
        return await this.traineeRepository.findOne(id);
    }

    async findAll() : Promise<Trainee[]> {
        return await this.traineeRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.traineeRepository.delete(id);
    }

    async updateOne(updateTrainee: UpdateTraineeDto) : Promise<void> {
        await this.traineeRepository.update(
            {id : updateTrainee.id},
            {
                name: updateTrainee.name,
                avatar : updateTrainee.avatar,
                phone : updateTrainee.phone,
                email: updateTrainee.email,
                password : updateTrainee.password
            }
        )
    }
}
