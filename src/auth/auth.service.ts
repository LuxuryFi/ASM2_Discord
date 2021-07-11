import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { StaffService } from 'src/staff/staff.service';
import { TraineeService } from 'src/trainee/trainee.service';
import { TrainerService } from 'src/trainer/trainer.service';


@Injectable()
export class AuthService {
    constructor(
        private traineeService: TraineeService,
        private adminService: AdminService,
        private trainerService: TrainerService,
        private staffService: StaffService
    ) { } // Inject trainee service, admin service, trainer service, staff service to auth service

    async validateUser(username: string, pass: string): Promise<any> { // declare validate method with two paramter
        const trainee = await this.traineeService.findByEmail(username, pass); // validate trainee
        const admin = await this.adminService.findByEmail(username, pass); // validate admin
        const trainer = await this.trainerService.findByEmail(username, pass); //validate trainer
        const staff = await this.staffService.findByEmail(username, pass); // validate staff

        if (trainee && trainee.email === username && trainee.password === pass) {  //compare username and password
            const { password, ...result } = trainee; //get password and iterable value from trainee
            return result; //return rssult (item)
        }
        else if (admin && admin.email === username && admin.password === pass) {
            const { password, ...result } = admin; //get password and iterable value from trainee
            return result;  //return rssult (item)
        }
        else if (trainer && trainer.email === username && trainer.password === pass) {
            const { password, ...result } = trainer; //get password and iterable value from trainee
            return result;   //return rssult (item)
        }
        else if (staff && staff.email === username &&staff.password === pass) {
            const { password, ...result } = staff; //get password and iterable value from trainee
            return result;  //return rssult (item)
        }
        return null; // return null if has no item
    }
}
