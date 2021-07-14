import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Staff } from '../database/entities/staff.entity';
import { getRepository, Repository, UpdateResult } from 'typeorm';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

describe('StaffService', () => {
  let staffService: StaffService;
  let staffRepository: Repository<Staff>;
  const findOne = jest.fn();
  const create = jest.fn();
  const save = jest.fn();
  const find = jest.fn();
  const update = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffService,
      {
        provide: getRepositoryToken(Staff),
        useValue: {findOne, create,save,find}
      }],
    }).compile();

    staffService = module.get<StaffService>(StaffService);
    staffRepository = module.get<Repository<Staff>>(getRepositoryToken(Staff))
  });

  it('should be defined', () => {
    expect(staffService).toBeDefined();
  });

  it('should return staff list', async () => {
    find.mockReturnValue(Promise.resolve([Staff]));
    const result = await staffService.findAll();

    expect(result).toEqual([Staff])
  })

  it('should return error', async () => {
    find.mockReturnValue(undefined);

    await expect(staffService.findAll()).rejects.toThrow();
  })

  it('getOneStaff - should return a Staff', async () => {
    findOne.mockReturnValue(Promise.resolve(Staff));

    const id = 20;

    const result = await staffService.findOne(id);

    expect(result).toEqual(Staff);

  })

  it('getOneStaff - should throw error', async () => {
    findOne.mockImplementation();
    const id = 1;

    await expect(staffService.findOne(id)).rejects.toThrow();
  })

  it('deleteOneStaff - should', async () => {
    const id = 20;
    findOne.mockReturnValue(undefined)

    await expect(staffService.deleteOne(id))
  })

  it('deleteOneStaff - should throw error', async () => {
    const id = Date.now();
    findOne.mockReturnValue(undefined)

    await expect(staffService.deleteOne(id)).rejects.toThrow();
  })

  it('updateStaff - should return a post', async () => {
    const id = 5;
    const updateStaff : UpdateStaffDto = {
      id: 5,
      name: 'hehe',
      avatar: 'hehe',
      phone: 'h312312',
      email: '312312',
      password: 'ehehehe',
      old_id: 5,
      old_image: '41241'
    }

    // update.mockImplementation(()=> UpdateResult);
    findOne.mockReturnValue(Promise.resolve({updateStaff}));

    const result = await staffService.updateOne(updateStaff);

    expect(result).toEqual({ id: id, ...updateStaff});

  })

});
