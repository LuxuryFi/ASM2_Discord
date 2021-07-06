import { Body, Controller, Get, Post, Query, Render, Req, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { diskStorage } from 'multer';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerService } from './trainer.service';
import * as fs from 'fs'
import * as path from 'path'
import { extname } from 'path';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { Parser } from 'json2csv';

@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService:
        TrainerService) { }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/index.hbs')
    @Get('index')
    async index(@Request() req) {
        let trainers = await this.trainerService.findAll();
        return { trainers: trainers, user: req.user }
    }

    @Get('export')
    async exportCSV(@Req() req, @Res() res) {
        let trainers = await this.trainerService.findAll();
        let timestamp = new Date().getTime() / 1000;
        const fields = ['id','name','avatar','email','phone','password','role_id'];


        const parser = new Parser({fields});

        const csv =parser.parse(trainers);

        const filename = path.join(__dirname,'../','../','public/csv/trainer/', './' + timestamp.toString() + 'trainer.csv');

        console.log(filename)
        fs.writeFileSync(filename,"\uFEFF" + csv, 'utf-8');

        res.download(filename);
    }


    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/create.hbs')
    @Get('create')
    async create(@Req() req) {
        return { user: req.user}
     }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createOne(@Body() createTrainer: CreateTrainerDto, @UploadedFile() file: Express.Multer.File, @Res() res, @Req() req) {
        try {
            var avatar = file.filename;
            createTrainer.avatar = avatar

            console.log(createTrainer);
            await this.trainerService.createOne(createTrainer);
            res.status(302).redirect('/trainer/index')
        } catch (error) {
            console.log(error)
            res.status(302).redirect('/trainer/index')
        }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/update.hbs')
    @Get('update')
    async update(@Req() req, @Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        console.log(trainer)
        return { trainer: trainer, user: req.user }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async updateOne(@Body() updateTrainer: UpdateTrainerDto, @Res() res, @Req() req, @UploadedFile() file: Express.Multer.File) {
        try {
            var avatar = updateTrainer.old_image;
            if (file) {
                avatar = file.filename
            }
            let old_image = path.join(__dirname + '/..' + '/../' + 'public/uploads/trainers', updateTrainer.old_image);
            if (file) {
                if (updateTrainer.old_image && fs.existsSync(old_image)) {
                    fs.unlinkSync(old_image);
                }
            }
            updateTrainer.avatar = avatar;
            await this.trainerService.update(updateTrainer);
            res.status(302).redirect('/trainer/index')
        } catch (error) {
            throw error.message;
        }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.trainerService.deleteOne(query.id);
        res.status(302).redirect('/trainer/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/view.hbs')
    @Get('detail')
    async detail(@Req() req, @Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        return { trainer: trainer, user: req.user }
    }


}
