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

  @Render('trainee/create.hbs')
  @Get('AnCoHo1')
  getAnCoHo(): string {
    return null;
  }

  @Render('trainee/view.hbs')
  @Get('AnCoHo2')
  getAnCoHo2(): string {
    return null;
  }

  @Render('trainee/update.hbs')
  @Get('AnCoHo3')
  getAnCoHo3(): string {
    return null;
  }

  @Render('trainee/index.hbs')
  @Get('AnCoHo4')
  getAnCoHo4(): string {
    return null;
  }

}
