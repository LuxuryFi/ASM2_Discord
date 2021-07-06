import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { resolveSoa } from 'dns';
import { AdminService } from 'src/admin/admin.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService,
        private readonly adminService: AdminService){}

    @Post()
    async validateUser(@Body() body, @Res() res){
        try {
            const { username , password} = body;
            const result = await this.authService.validateUser(username, password);

            res.send(result);
        } catch (error) {
            console.log("validate")
            console.log(error);
        }
    }

    @Get()
    async getUserList(@Body() body, @Res() res){
        try {
            const admins = await this.adminService.findAll();
            res.send(admins);
        } catch (error) {
            console.log("validate")
            console.log(error);
        }
    }

}
