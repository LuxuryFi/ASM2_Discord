import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { resolveSoa } from 'dns';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

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
}
