import { Test, TestingModule } from '@nestjs/testing';
import { CulturesController } from './cultures.controller';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';

const mockCulturesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CulturesController', () => {
  let controller: CulturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturesController],
      providers: [
        {
          provide: CulturesService,
          useValue: mockCulturesService,
        },
      ],
    }).compile();

    controller = module.get<CulturesController>(CulturesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.create com o DTO correto', async () => {
    const createDto: CreateCultureDto = { name: 'Café' };
    await controller.create(createDto);
    expect(mockCulturesService.create).toHaveBeenCalledWith(createDto);
  });

  it('deve chamar service.findAll', async () => {
    await controller.findAll();
    expect(mockCulturesService.findAll).toHaveBeenCalled();
  });

  it('deve chamar service.findOne com o ID correto', async () => {
    const id = 'uuid-culture-1';
    await controller.findOne(id);
    expect(mockCulturesService.findOne).toHaveBeenCalledWith(id);
  });

  it('deve chamar service.update com o ID e DTO corretos', async () => {
    const id = 'uuid-culture-1';
    const updateDto: UpdateCultureDto = { name: 'Café Especial' };
    await controller.update(id, updateDto);
    expect(mockCulturesService.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('deve chamar service.remove com o ID correto', async () => {
    const id = 'uuid-culture-1';
    await controller.remove(id);
    expect(mockCulturesService.remove).toHaveBeenCalledWith(id);
  });
});
