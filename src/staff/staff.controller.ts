import { Body, Controller, Get, Post, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service';
import * as path from 'path'
import * as fs from 'fs'
import { UpdateStaffDto } from './dto/update-staff.dto';
// import { Role } from 'src/role/role.enum';
// import { RolesGuard } from 'src/role/role.guard';
// import { Roles } from 'src/role/roles.decorator';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService : StaffService){}

    // @Roles(Role.Admin,Role.Staff)
    // @UseGuards(RolesGuard)
    @Render('staffs/index.hbs')
    @Get('index')
    async index(@Req() req){
        let staffs = await this.staffService.findAll();
        return {user: req.user,staffs: staffs}
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    @Render('staffs/create.hbs')
    @Get('create')
    create(@Req() req){
        return {user: req.user}
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/staffs/')
            , filename: (req, file, cb) => {
                const randomName = file.originalname
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createOne(@Body() createStaff: CreateStaffDto, @UploadedFile() file: Express.Multer.File ,@Req() req, @Res() res){
        try {
            createStaff.avatar = file.filename;
            await this.staffService.createOne(createStaff);
            res.status(302).redirect('/staff/index')
        } catch (error) {
            return {message : 'Create Failed'}
        }
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Res() res, @Query() query){
        await this.staffService.deleteOne(query.id);
        res.status(302).redirect('/staff/index')
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    @Render('staffs/update.hbs')
    @Get('update')
    async update(@Req() req,@Query() query){
        let staff = await this.staffService.findOne(query.id);
        return {user: req.user,staff : staff}
    }

    // @Roles(Role.Admin)
    // @UseGuards(RolesGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/staffs/')
            , filename: (req, file, cb) => {
                const randomName = file.originalname
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))

    async updateOne(@Body() updateStaff : UpdateStaffDto, @UploadedFile() file: Express.Multer.File, @Req() req,@Res() res, @Query() query){
        try {
            var avatar = updateStaff.old_image;
            if (file) {
                var avatar = file.filename;
            }
            let old_image = path.join(__dirname, '/../','/../', 'public/uploads/staffs/', updateStaff.old_image )
            if (file) {
                if (updateStaff.old_image && fs.existsSync(old_image)){
                    fs.unlinkSync(old_image);
                }
            }
            updateStaff.avatar = avatar
            this.staffService.updateOne(updateStaff);
            res.status(302).redirect('/staff/index');
        } catch (error) {
            console.log("Function: update Staff");
            console.log(error);
        }
    }

    // @Roles(Role.Admin,Role.Staff)
    // @UseGuards(RolesGuard)
    @Render('staffs/view.hbs')
    @Get('detail')
    async detail(@Req() req,@Res() res, @Query() query){
        let staff = await this.staffService.findOne(query.id);
        return {user: req.user,staff :  staff}
    }
}
