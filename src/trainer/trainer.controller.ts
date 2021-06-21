import { Body, Controller, Get , Post, Query, Render, Req, Request, Res} from '@nestjs/common';
import { query } from 'express';
import { createTrainerDTO } from './dto/create-trainer.dto';
import { updateTrainerDTO } from './dto/update-trainer.dto';
import { TrainerService } from './trainer.service';


@Controller('trainer')
export class TrainerController {
    constructor(private readonly trainerService:
        TrainerService){}

    @Render ('trainer/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let trainer = await this.trainerService.findAll();
        return {trainer: trainer}
    }

    @Render('subjects/create.hbs')
    @Get('create')
    async create () {}

    @Post('create')
    createOne(@Body() createTrainer : createTrainerDTO, @Res() res)
    {
        try
        {
            this.trainerService.createOne(createTrainer);
            res.status(302).redirect('/trainer/index');
        }
        catch(error)
        {
            console.log('Function: Create one trainee');
            console.log(error);
        }
    }

    @Render('trainer/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let trainer = this.trainerService.findOne(query.id);
        return { trainer : trainer}
    }

    @Post('update')
    async updateOne(@Body() updateTrainer : updateTrainerDTO, @Res() res) {
        console.log(updateTrainer)
        try {
            this.trainerService.updateOne(updateTrainer);
            res.status(302).redirect('/subject/index')
        } catch (error) {
            console.log(error)
        }

    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.trainerService.deleteOne(query.id);
        res.status(302).redirect('/trainer/index')
    }

    @Render('trainer/detail.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let trainer = this.trainerService.findOne(query.id);
        return { trainer : trainer}
    }


}
