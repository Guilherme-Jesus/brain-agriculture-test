import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { PlantedCropsController } from './planted-crops.controller';
import { PlantedCropsService } from './planted-crops.service';

const mockPlantedCropsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PlantedCropsController', () => {
  let controller: PlantedCropsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantedCropsController],
      providers: [
        {
          provide: PlantedCropsService,
          useValue: mockPlantedCropsService,
        },
      ],
    }).compile();

    controller = module.get<PlantedCropsController>(PlantedCropsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.create com os dados corretos', async () => {
    const createDto: CreatePlantedCropDto = {
      farmId: 'farm-uuid',
      cultureId: 'culture-uuid',
      harvestId: 'harvest-uuid',
      plantedArea: 100,
    };
    await controller.create(createDto);
    expect(mockPlantedCropsService.create).toHaveBeenCalledWith(createDto);
  });

  it('deve chamar service.findAll', async () => {
    await controller.findAll();
    expect(mockPlantedCropsService.findAll).toHaveBeenCalled();
  });
});
