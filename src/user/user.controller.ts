import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Render('users/index.hbs')
    @Get('index')
    index() {

    }
}
