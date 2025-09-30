import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Producer } from './entities/producer.entity';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';

type MockProducersService = {
  [K in keyof ProducersService]: jest.Mock;
};

const mockProducersServiceFactory = (): MockProducersService => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findWithFarms: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: MockProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useFactory: mockProducersServiceFactory,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<MockProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve chamar o service.findAll e retornar o resultado', async () => {
      const mockProducers: Producer[] = [
        { id: '1', document: '123', producerName: 'Teste', farms: [] },
      ];
      service.findAll.mockResolvedValue(mockProducers);

      const result = await controller.findAll();

      expect(result).toEqual(mockProducers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('deve chamar o service.create com os dados corretos e retornar o resultado', async () => {
      const createDto: CreateProducerDto = {
        document: '123',
        producerName: 'Novo Produtor',
      };
      const mockResult: Producer = { id: '2', ...createDto, farms: [] };
      service.create.mockResolvedValue(mockResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('deve chamar o service.findOne com o ID correto e retornar o resultado', async () => {
      const producerId = 'some-uuid';
      const mockResult: Producer = {
        id: producerId,
        document: '123',
        producerName: 'Teste',
        farms: [],
      };
      service.findOne.mockResolvedValue(mockResult);

      await controller.findOne(producerId);

      expect(service.findOne).toHaveBeenCalledWith(producerId);
    });
  });
});
