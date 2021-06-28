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
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const trainee = await this.traineeService.findByEmail(username, pass);
        const admin = await this.adminService.findByEmail(username, pass);
        const trainer = await this.trainerService.findByEmail(username, pass);
        const staff = await this.staffService.findByEmail(username, pass);


        if (trainee && trainee.email === username && trainee.password === pass) {
            const { password, ...result } = trainee;
            return result;
        }
        else if (admin && admin.email === username && admin.password === pass) {
            const { password, ...result } = admin;
            return result;
        }
        else if (trainer && trainer.email === username && trainer.password === pass) {
            const { password, ...result } = trainer;
            return result;
        }
        else if (staff && staff.email === username &&staff.password === pass) {
            const { password, ...result } = staff;
            return result;
        }
        return null;
    }
}
