import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {join} from 'path';
import * as hbs from 'hbs';
import * as fs from 'fs';
import * as layouts from 'handlebars-layouts';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname,'..','/public'));
  app.setBaseViewsDir(join(__dirname, '..', '/views'));
  app.setViewEngine('hbs');

  hbs.handlebars.registerPartial('layout', hbs.handlebars.compile(fs.readFileSync(join(__dirname, '..', 'views/layouts.hbs'), 'utf-8')));
  hbs.handlebars.registerHelper(layouts(hbs.handlebars));
  hbs.handlebars.registerPartial('index', hbs.handlebars.compile(fs.readFileSync(join(__dirname, '..', 'views/index.hbs'), 'utf-8')));

  await app.listen(3000);
}
bootstrap();
