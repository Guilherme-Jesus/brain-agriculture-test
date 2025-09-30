import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';

const mockFarmsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('FarmsController', () => {
  let controller: FarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [
        {
          provide: FarmsService,
          useValue: mockFarmsService,
        },
      ],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o service.create com os dados corretos', async () => {
      const createDto: CreateFarmDto = {
        name: 'Fazenda Nova',
        city: 'Cidade',
        state: 'TS',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 25,
        producerId: 'uuid-producer-1',
      };
      mockFarmsService.create.mockResolvedValue(undefined);

      await controller.create(createDto);

      expect(mockFarmsService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('deve chamar o service.findAll', async () => {
      mockFarmsService.findAll.mockResolvedValue([]);
      await controller.findAll();
      expect(mockFarmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve chamar o service.findOne com o ID correto', async () => {
      const farmId = 'uuid-farm-1';
      mockFarmsService.findOne.mockResolvedValue(undefined);
      await controller.findOne(farmId);
      expect(mockFarmsService.findOne).toHaveBeenCalledWith(farmId);
    });
  });

  describe('update', () => {
    it('deve chamar o service.update com o ID e o DTO corretos', async () => {
      const farmId = 'uuid-farm-1';
      const updateDto: UpdateFarmDto = { name: 'Fazenda Atualizada' };
      mockFarmsService.update.mockResolvedValue(undefined);

      await controller.update(farmId, updateDto);

      expect(mockFarmsService.update).toHaveBeenCalledWith(farmId, updateDto);
    });
  });

  describe('remove', () => {
    it('deve chamar o service.remove com o ID correto', async () => {
      const farmId = 'uuid-farm-1';
      mockFarmsService.remove.mockResolvedValue(undefined);
      await controller.remove(farmId);
      expect(mockFarmsService.remove).toHaveBeenCalledWith(farmId);
    });
  });
});
