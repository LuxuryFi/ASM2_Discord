import { Body, Controller, Get , Post, Query, Render, Req, Request, Res, UseGuards} from '@nestjs/common';
import axios from 'axios';
import { query } from 'express';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-topic.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService){}
    // localhost:3000/subject/index GET

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('subjects/index.hbs')
    @Get('index')
    async index (@Request() req) {
        let subjects = await this.subjectService.findAll();
        return {subjects: subjects, user: req.user}
    }

    // localhost:3000/subject/create GET

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('subjects/create.hbs')
    @Get('create')
    async create (@Req() req) {
        return {user: req.user}
    }

    // localhost:3000/subject/create POST

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
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

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('subjects/update.hbs')
    @Get('update')
    async update (@Req() req, @Query() query) {
        let subject = await this.subjectService.findOne(query.id);
        return { subject : subject, user: req.user}
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
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

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        console.log(query.id);
        await this.subjectService.deleteOne(query.id);
        res.status(302).redirect('/subject/index')
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('subjects/detail.hbs')
    @Get('detail')
    async detail (@Req() req, @Query() query) {
        let subject = this.subjectService.findOne(query.id);
        return { subject : subject, user: req.user}
    }

    // localhost:3000/subject/update




}
