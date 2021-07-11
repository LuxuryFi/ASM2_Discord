import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from 'src/database/entities/staff.entity';
@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) { }
    // Create connection to database by data mapping. We will put Entity Staff to Repository then inject
    // it to service

    async createOne(createStaff: CreateStaffDto) {
        let staff = await this.staffRepository.create(createStaff); // Create new  staff
        await this.staffRepository.save(staff); //Save staff to database
    }

    async findOne(id: number): Promise<Staff> {
        return await this.staffRepository.findOne(id); // Find one staff
    }

    async findAll(): Promise<Staff[]> {
        return await this.staffRepository.find(); //Find all staff
    }

    async deleteOne(id: number): Promise<void> {
        await this.staffRepository.delete(id); //Delete one staff
    }

    async updateOne(updateStaff: UpdateStaffDto): Promise<void> {
        try {
            await this.staffRepository.update( //Update staff
                { id: updateStaff.id }, //
                {
                    name: updateStaff.name,
                    avatar: updateStaff.avatar,
                    phone: updateStaff.phone,
                    email: updateStaff.email,
                    password: updateStaff.password
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async findByEmail(username : string, password: string){
        return await getConnection() //User query builder to customize query
        .createQueryBuilder()
        .select('staff') // select a staff
        .from(Staff,'staff')  // from staff
        .where('staff.email = :email', {email : username}) // where staff.email = email

        .andWhere('staff.password = :password', {password : password}) // and where staff.password = password
        .getOne() //Get only one first record
    }
}
