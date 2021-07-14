import { Test, TestingModule } from '@nestjs/testing';
import { StaffController } from './staff.controller';

describe('StaffController', () => {
  let controller: StaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
    }).compile();

    controller = module.get<StaffController>(StaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be returned', () => {
    const staff = controller.index
    expect(staff).toBeNaN();
  })


});
