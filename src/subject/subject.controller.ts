import { Body, Controller, Get , Post, Query, Render, Req, Request, Res} from '@nestjs/common';
import axios from 'axios';
import { query } from 'express';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-topic.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService){}
    // localhost:3000/subject/index GET

    @Render('subjects/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let subjects = await this.subjectService.findAll();
        return {subjects: subjects}
    }

    // localhost:3000/subject/create GET

    @Render('subjects/create.hbs')
    @Get('create')
    async create () {}

    // localhost:3000/subject/create POST

    @Post('create')
    createOne(@Body() createSubject : CreateSubjectDto, @Res() res) {
        try {
            this.subjectService.createOne(createSubject);
            res.status(302).redirect('/subject/index');
        } catch (error) {
            console.log('Function: Create One Subject');
            console.log(error);
        }
    }

    @Render('subjects/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let subject = await this.subjectService.findOne(query.id);
        return { subject : subject}
    }

    @Post('update')
    async updateOne(@Body() updateSubject : UpdateSubjectDto, @Res() res) {
        console.log(updateSubject)
        try {
            this.subjectService.updateOne(updateSubject);
            res.status(302).redirect('/subject/index')
        } catch (error) {
            console.log(error)
        }
    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.subjectService.deleteOne(query.id);
        res.status(302).redirect('/subject/index')
    }

    @Render('subjects/detail.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let subject = this.subjectService.findOne(query.id);
        return { subject : subject}
    }

    // localhost:3000/subject/update




}
