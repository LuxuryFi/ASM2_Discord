import { Controller, Request, Get, Next, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('auth/login.hbs')
  @Get()
  async loginin(@Req() req, @Res() res, @Next() next) {
    if (req.user && (req.user.role_id == 'trainee' || req.user.role_id == 'trainer')) {
      await res.redirect('/user/index');
    }
    if (req.user && (req.user.role_id == 'staff' || req.user.role_id == 'admin')) {
      await res.redirect('/index');
    }
    else {

    }
  }

  @UseGuards(LoginGuard)
  @Post()
  async login(@Req() req, @Res() res, @Next() next) {
    if (req.user.role_id == 'trainee' || req.user.role_id == 'trainer') {
      await res.redirect('/user/index')
    }
    else if (req.user.role_id == 'staff' || req.user.role_id == 'admin') {
      await res.redirect('index')
    }
    else {
      next();
    }

  }

  @Render('index.hbs')
  @Get('index')
  getAnCoHo(@Request() req) {
    console.log(req.user)
    return {user: req.user}
  }


  @Get('logout')
  logout(@Req() request, @Res() res){
    request.logout()
    res.redirect('/');
  }

}
