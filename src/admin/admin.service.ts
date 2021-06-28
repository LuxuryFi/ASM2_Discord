import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/database/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(@InjectRepository(Admin) private adminRepository : Repository<Admin> ){}

    async findAll(){
        return await this.adminRepository.find();
    }

    async findByEmail(username: string, password: string){
        return await this.adminRepository.findOne({
            where: [
                {password:password},
                {admin_email:username}
            ]
        })
    }


}
