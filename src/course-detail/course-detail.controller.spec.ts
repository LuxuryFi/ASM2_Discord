import { Test, TestingModule } from '@nestjs/testing';
import { CourseDetailController } from './course-detail.controller';

describe('CourseDetailController', () => {
  let controller: CourseDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseDetailController],
    }).compile();

    controller = module.get<CourseDetailController>(CourseDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
