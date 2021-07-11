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
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { Parser } from 'json2csv';


//  Define class below as a controller
@Controller('staff') //from now, to access to any route in this controller, we need to put /staff before: For example: localhost:3000/staff/route
export class StaffController {
    constructor(private readonly staffService : StaffService){}

    @Roles(Role.Admin,Role.Staff) //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this roiute
    @Render('staffs/index.hbs') // URL path for render view
    @Get('index') // route name. So path is localhost:3000/staff/index GET
    async index(@Req() req){ // function will be occured when access to this route with request paramter
        let staffs = await this.staffService.findAll(); // Call to staff service and function findall to get all staff
        return {user: req.user,staffs: staffs} //Return user information and staff list
    }


    @Get('export') // route name. So path is localhost:3000/staff/export GET
    async exportCSV(@Req() req, @Res() res) {
        let staffs = await this.staffService.findAll();  // Call to staff service and function findall to get all staff
        let timestamp = new Date().getTime() / 1000; //Get currenttime by number and divide by 1000
        const fields = ['id','name','avatar','email','phone','password','role_id']; //List column in csv file
        const parser = new Parser({fields}); //Create new parser from json2csv library and config column name with fields array
        const csv =parser.parse(staffs); //Pass value to csv
        //Create filename for new csv
        const filename = path.join(__dirname,'../','../','public/csv/staff/', './' + timestamp.toString() + 'staff.csv');
        fs.writeFileSync(filename,"\uFEFF" + csv, 'utf-8'); //Use writefileSync to create file and pass csv to.
        res.download(filename); //Download created file
    }

    @Roles(Role.Admin,Role.Staff) //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this roiute
    @Render('staffs/create.hbs') // URL path for render view
    @Get('create') // route name. So path is localhost:3000/staff/create GET
    create(@Req() req){  // function will be occured when access to this route with request paramter
        return {user: req.user} //Return user information
    }

    @Roles(Role.Admin,Role.Staff) //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard)  // Use guard for this roiute
    @Post('create') // route name. So path is localhost:3000/staff/create POST
    @UseInterceptors(FileInterceptor('avatar', { //Config Multer
        storage: diskStorage({ //config storage information for upload file
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/staffs/') // config destination// config destination
            , filename: (req, file, cb) => {
                //config filename
                const randomName = file.originalname
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    // function will be occured when access to this route with request paramter
    async createOne(@Body() createStaff: CreateStaffDto, @UploadedFile() file: Express.Multer.File ,@Req() req, @Res() res){
        try {
            createStaff.avatar = file.filename;
            await this.staffService.createOne(createStaff); // Call to staff service and function createone to add new staff
            res.status(302).redirect('/staff/index')
        } catch (error) { // thrown error if there are any exception
            return {message : 'Create Failed'}
        }
    }

    @Roles(Role.Admin,Role.Staff) //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this route
    @Get('delete') // route name. So path is localhost:3000/staff/delete GET
    async deleteOne(@Res() res, @Query() query){     // function will be occured when access to this route with request paramter
        await this.staffService.deleteOne(query.id);   // Call to staff service and function deleteone to delete a staff with id in parameter
        res.status(302).redirect('/staff/index')
    }

    @Roles(Role.Admin,Role.Staff)  //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this route
    @Render('staffs/update.hbs') // URL path for render view
    @Get('update') // route name. So path is localhost:3000/staff/update GET
    async update(@Req() req,@Query() query){ // function will be occured when access to this route with request paramter
        // Query is query string
        let staff = await this.staffService.findOne(query.id); // Call to staff service and function findone to delete a staff with id in parameter
        return {user: req.user,staff : staff}
    }

    @Roles(Role.Admin,Role.Staff)  //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this route
    @Post('update') // route name. So path is localhost:3000/staff/update POST
    @UseInterceptors(FileInterceptor('avatar', { ///Config Multer
        storage: diskStorage({ //config storage information for upload file
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/staffs/') // config destination
            , filename: (req, file, cb) => { // config filename
                const randomName = file.originalname
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    // function will be occured when access to this route with request paramter
    async updateOne(@Body() updateStaff : UpdateStaffDto, @UploadedFile() file: Express.Multer.File, @Req() req,@Res() res, @Query() query){
        try {
            var avatar = updateStaff.old_image; //get old avatar
            if (file) { // check if  upload file
                var avatar = file.filename; //set avatar = new file nam,e
            }
            let old_image = path.join(__dirname, '/../','/../', 'public/uploads/staffs/', updateStaff.old_image ) //old avatar path
            if (file) { // check if upload file
                if (updateStaff.old_image && fs.existsSync(old_image)){
                    fs.unlinkSync(old_image); //delete old avatar
                }
            }
            updateStaff.avatar = avatar
            this.staffService.updateOne(updateStaff);  // Call to staff service and function findone to update a staff with id in parameter
            res.status(302).redirect('/staff/index'); //Redirect
        } catch (error) {
            console.log("Function: update Staff");
            console.log(error);
        }
    }

    @Roles(Role.Admin,Role.Staff) //Authorization: only admin and staff role can access to this route
    @UseGuards(RolesGuard) // Use guard for this route
    @Render('staffs/view.hbs') // URL path for render view
    @Get('detail') // route name. So path is localhost:3000/staff/detail GET
    async detail(@Req() req,@Res() res, @Query() query){     // function will be occured when access to this route with request paramter

        let staff = await this.staffService.findOne(query.id);
        return {user: req.user,staff :  staff}
    }
}
