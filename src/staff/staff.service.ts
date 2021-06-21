import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from 'src/database/entities/staff.entity';
@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository : Repository<Staff> ){}

    async createOne(createStaff : CreateStaffDto) {
        let staff = await this.staffRepository.create(createStaff);
        this.staffRepository.save(staff);
    }

    async findOne(id : number) : Promise<Staff> {
        return await this.staffRepository.findOne(id);
    }

    async findAll() : Promise<Staff[]> {
        return await this.staffRepository.find();
    }

    async deleteOne(id : number) : Promise<void> {
        await this.staffRepository.delete(id);
    }

    async updateOne(updateStaff: UpdateStaffDto) : Promise<void> {
        await this.staffRepository.update(
            {id : updateStaff.old_id},
            {
                name: updateStaff.name,
                avatar : updateStaff.avatar,
                phone : updateStaff.phone,
                email: updateStaff.email,
                password : updateStaff.password
            }
        )
    }
}
