import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Render('layouts.hbs')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Render('index.hbs')
  @Get('An')
  getAn(): string {
    return null;
  }

  @Render('trainee/view.hbs')
  @Get('AnCoHo')
  getAnCoHo(): string {
    return null;
  }

}
