import { Body, Controller, Get, Next, Post, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import * as path from 'path'
import { CreateTraineeDto } from './dto/create-trainee.dto';
import * as fs from 'fs';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
// import { Roles } from 'src/role/roles.decorator';
// import { Role } from 'src/role/role.enum';
// import { RolesGuard } from 'src/role/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { Parser} from 'json2csv'

@Controller('trainee')
export class TraineeController {
    constructor(private readonly traineeService: TraineeService) {}

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let trainees = await this.traineeService.findAll();


        return { trainees: trainees, user: req.user }
    }

    // @Roles(Role.Admin,Role.Staff)
    // @UseGuards(RolesGuard)
    @Get('export')
    async exportCSV(@Req() req, @Res() res) {
        let trainees = await this.traineeService.findAll();
        let timestamp = new Date().getTime() / 1000;
        const fields = ['id','name','avatar','email','phone','password','role_id'];


        const parser = new Parser({fields});

        const csv =parser.parse(trainees);

        const filename = path.join(__dirname,'../','../','public/csv/trainee/', './' + timestamp.toString() + 'trainee.csv');

        console.log(filename)
        fs.writeFileSync(filename,"\uFEFF" + csv, 'utf-8');

        res.download(filename);
    }


    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/create.hbs')
    @Get('create')
    create() { }


    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainees/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = file.originalname
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createOne(@Body() createTrainee: CreateTraineeDto, @UploadedFile() file: Express.Multer.File, @Req() req, @Res() res , @Next() next) {
        try {
            createTrainee.avatar = '';

            if (file.filename) {
                createTrainee.avatar = file.filename;
            }

            console.log(createTrainee)

            await this.traineeService.createOne(createTrainee);
            res.status(302).redirect('/trainee/index')
        } catch (error) {
            console.log("Function: createOneTrainee");
            next(error);
        }

    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async delete(@Res () res, @Query() query) {
        await this.traineeService.deleteOne(query.id);
        res.status(302).redirect('/trainee/index')
    }


    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/view.hbs')
    @Get('detail')
    async detail(@Query() query, @Req() req) {
        let trainee = await this.traineeService.findOne(query.id);
        console.log(trainee)
        return { trainee: trainee , user:req.user }
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/update.hbs')
    @Get('update')
    async update(@Query() query, @Req() req) {
        let trainee = await this.traineeService.findOne(query.id);
        return { trainee: trainee, user:req.user}
    }



    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/index.hbs')
    @Get('search')
    async search(@Body() body,@Query() query, @Req() req) {

        const name = query.search;
        let trainees = await this.traineeService.findByName(name);
        console.log(trainees)
        return { trainees: trainees, user:req.user}
    }




    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../' + 'public/uploads/trainees/')
            , filename: (req, file, cb) => {
                const randomName = file.originalname
                cb(null, `${randomName}`)
            }
        })
    }))
    async updateOne(@Body() updateTrainee: UpdateTraineeDto, @UploadedFile() file: Express.Multer.File, @Query() Query, @Res() Res, @Req() req) {
        try {
            var avatar = updateTrainee.old_image;

            if (file) {
                avatar = file.filename
            }

            let old_image = path.join(__dirname + '/..' + '/../' + 'public/uploads/trainees', updateTrainee.old_image);
            if (file) {
                if (updateTrainee.old_image && fs.existsSync(old_image)) {
                    fs.unlinkSync(old_image);
                }
            }
            updateTrainee.avatar = avatar;

            await this.traineeService.updateOne(updateTrainee);
            Res.status(302).redirect('/trainee/index')
        } catch (error) {
            console.log("Function: updateOneTrainee");
            console.log(error);
        }

    }
}
