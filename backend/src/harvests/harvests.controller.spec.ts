import { Test, TestingModule } from '@nestjs/testing';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { HarvestsController } from './harvests.controller';
import { HarvestsService } from './harvests.service';

const mockHarvestsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('HarvestsController', () => {
  let controller: HarvestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [
        {
          provide: HarvestsService,
          useValue: mockHarvestsService,
        },
      ],
    }).compile();

    controller = module.get<HarvestsController>(HarvestsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.create com o DTO correto', async () => {
    const createDto: CreateHarvestDto = { name: 'Safra 2025' };
    await controller.create(createDto);
    expect(mockHarvestsService.create).toHaveBeenCalledWith(createDto);
  });

  it('deve chamar service.findAll', async () => {
    await controller.findAll();
    expect(mockHarvestsService.findAll).toHaveBeenCalled();
  });

  it('deve chamar service.findOne com o ID correto', async () => {
    const id = 'uuid-harvest-1';
    await controller.findOne(id);
    expect(mockHarvestsService.findOne).toHaveBeenCalledWith(id);
  });

  it('deve chamar service.update com o ID e DTO corretos', async () => {
    const id = 'uuid-harvest-1';
    const updateDto: UpdateHarvestDto = { name: 'Safra 2026' };
    await controller.update(id, updateDto);
    expect(mockHarvestsService.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('deve chamar service.remove com o ID correto', async () => {
    const id = 'uuid-harvest-1';
    await controller.remove(id);
    expect(mockHarvestsService.remove).toHaveBeenCalledWith(id);
  });
});
