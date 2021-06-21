import { Body, Controller, Get , Post, Query, Render, Req, Request, Res} from '@nestjs/common';
import { query } from 'express';
import { createCourseDetailDto } from './dto/create-course-detail.dto';
import { updateCourseDetailDto } from './dto/update-course-detail.dto';
import { CourseDetailService } from './course-detail.service';

@Controller('course-detail')
export class CourseDetailController {

}
