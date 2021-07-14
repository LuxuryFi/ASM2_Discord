import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from '../database/entities/staff.entity';
@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) { }
    // Create connection to database by data mapping. We will put Entity Staff to Repository then inject
    // it to service

    async createOne(createStaff: CreateStaffDto) {
        let staff = await this.staffRepository.create(createStaff); // Create new  staff
        await this.staffRepository.save(staff); //Save staff to database
    }

    async findOne(id: number) {
        const staff = await this.staffRepository.findOne(id); // Find one staff

        if (!staff) {
            throw new HttpException('Staff not found', 404);
        }
        return staff;
    }

    async findAll() {
        const staffs =  await this.staffRepository.find(); //Find all staff

        if (!staffs) {
            throw new HttpException('Staff not found', 404);
        }

        return staffs;
    }


    async deleteOne(id: number): Promise<void> {
        await this.staffRepository.delete(id); //Delete one staff
    }

    async updateOne(updateStaff: UpdateStaffDto){
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
            const result = await this.staffRepository.findOne(updateStaff.id);
            return result;
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
