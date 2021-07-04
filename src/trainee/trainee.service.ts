import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Like, Repository } from 'typeorm';
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

    async findByEmail(username : string, password: string){
        return await getConnection()
        .createQueryBuilder()
        .select('trainee')
        .from(Trainee,'trainee')
        .where('trainee.email = :email', {email : username})
        .andWhere('trainee.password = :password', {password : password})
        .getOne()
    }

    async findByName(name: string) : Promise<Trainee[]> {
        const regex = `%${name}%`;
        return this.traineeRepository.find({
            where : [
            {
                name: Like(regex)
            }, {
                email: Like(regex)
            }, {
                phone: Like(regex)
            }
            ]
        })
    }


}
