import { Test, TestingModule } from '@nestjs/testing';
import { CourseDetailService } from './course-detail.service';

describe('CourseDetailService', () => {
  let service: CourseDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseDetailService],
    }).compile();

    service = module.get<CourseDetailService>(CourseDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
