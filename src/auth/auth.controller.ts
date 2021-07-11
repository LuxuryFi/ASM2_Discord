import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { resolveSoa } from 'dns';
import { AdminService } from 'src/admin/admin.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService,
        private readonly adminService: AdminService){} //inject adminservice and authservice to controller

    @Post()
    async validateUser(@Body() body, @Res() res){ //Pass body and response
        try {
            const { username , password} = body; //Get username and password from body form
            const result = await this.authService.validateUser(username, password); // call authservice validateUser to validate user
        } catch (error) {
            console.log("Error") // Thrown error if wrong password
            console.log(error);
        }
    }

    @Get()
    async getUserList(@Body() body, @Res() res){
        try {
            const admins = await this.adminService.findAll(); //Get all admin user
            res.send('an oi la an');
        } catch (error) {
            console.log("validate")
            console.log(error);
        }
    }

}
