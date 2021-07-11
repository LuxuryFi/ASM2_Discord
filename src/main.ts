// Import libraries using in this file

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path'; // join path url
import * as hbs from 'hbs'; // handlebars engine
import * as fs from 'fs'; //  read/write file
import * as layouts from 'handlebars-layouts'; //support hbs layouts with "extend, content" keyword
import * as session from 'express-session' // session in express
import flash = require('connect-flash'); // make flash, it's support for session
import * as passport from 'passport' //

async function bootstrap() { // init function. This is startup function when our app start
  //Create NestJs Application using Express as HTTP server
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useStaticAssets(join(__dirname, '..', '/public')); // Set static folder
  app.setBaseViewsDir(join(__dirname, '..', '/views')); // Set view folder
  app.setViewEngine('hbs'); // Set view engine

  // helper for checking selected item for update function
  hbs.handlebars.registerHelper('selected', function (options, value) {
    if (options == value) {
      return ' selected';
    } else {
      return '';
    }
  })
  //helper for check admin display
  hbs.handlebars.registerHelper('admin', function (role) {
    if (role == 'admin') {
      return 'hidden';
    } else {
      return '';
    }
  })
  //helper for check trainer display
  hbs.handlebars.registerHelper('trainer', function (role) {
    if (role == 'trainer') {
      return 'hidden';
    } else {
      return '';
    }
  })
    //helper for check trainee display
  hbs.handlebars.registerHelper('trainee', function (role) {
    if (role == 'trainee') {
      return 'hidden';
    } else {
      return '';
    }
  })
    //helper for check staff display
  hbs.handlebars.registerHelper('staff', function (role) {
    if (role == 'staff') {
      return 'hidden';
    } else {
      return '';
    }
  })

  app.enableCors();

  // config session in nest application
  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  // init a passport
  app.use(passport.initialize());
  // Start session for passport
  app.use(passport.session());
  // Use fllash for support and storage session
  app.use(flash());


  hbs.handlebars.registerPartial('layout', hbs.handlebars.compile(fs.readFileSync(join(__dirname, '..', 'views/layouts.hbs'), 'utf-8')));
  hbs.handlebars.registerHelper(layouts(hbs.handlebars));
  hbs.handlebars.registerPartial('user', hbs.handlebars.compile(fs.readFileSync(join(__dirname, '..', 'views/users/layout.hbs'), 'utf-8')));

  //App start and server will listen in port
  await app.listen(process.env.PORT);
}

//Start the boostrap function
bootstrap();
