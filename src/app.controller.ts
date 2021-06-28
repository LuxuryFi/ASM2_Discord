import { Controller, Get, Next, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('auth/login.hbs')
  @Get()
  async loginin(@Req() req, @Res() res, @Next() next) {
    console.log(req.user)
    if (req.user && (req.user.role_id == 'trainee' || req.user.role_id == 'trainer')) {
      await res.status(200).redirect('/');
    }
    if (req.user && (req.user.role_id == 'staff' || req.user.role_id == 'admin')) {
      await res.status(200).redirect('/index');
    }
    else {
      // next();
    }
  }

  @UseGuards(LoginGuard)
  @Post()
  login(@Req() req, @Res() res, @Next() next) {
    console.log('user',req.user)
    if (req.user.role_id == 'trainee' || req.user.role_id == 'trainer') {
      res.redirect('/')
    }
    else {
      res.redirect('index')
    }
  }

  @Render('index.hbs')
  @Get('index')
  getAnCoHo(): string {
    return null;
  }


  @Get('logout')
  logout(@Req() request, @Res() res){
    request.logout()
    res.redirect('/');
  }

}
