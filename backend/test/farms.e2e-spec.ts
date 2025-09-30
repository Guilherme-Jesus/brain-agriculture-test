import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { CreateFarmDto } from 'src/farms/dto/create-farm.dto';
import { Farm } from 'src/farms/entities/farm.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Farms (e2e)', () => {
  let app: INestApplication<App>;

  const mockFarmsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  const mockProducersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Farm))
      .useValue(mockFarmsRepository)
      .overrideProvider(getRepositoryToken(Producer))
      .useValue(mockProducersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/farms (POST) - deve criar uma fazenda com sucesso', () => {
    const createFarmDto: CreateFarmDto = {
      name: 'Fazenda 1',
      city: 'Cidade 2',
      state: 'TO',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      producerId: '123e4567-e89b-12d3-a456-426614174000',
    };

    const mockProducer = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      document: '12345678901',
      producerName: 'Produtor 1',
      farms: [],
    };

    const mockCreatedFarm = {
      id: '123e4567-e89b-12d3-a456-426614174001',
      name: 'Fazenda 1',
      city: 'Cidade 2',
      state: 'TO',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      producer: mockProducer,
      plantedCrops: [],
    };

    jest.clearAllMocks();

    mockProducersRepository.findOneBy.mockResolvedValue(mockProducer);

    mockFarmsRepository.create.mockReturnValue(mockCreatedFarm);
    mockFarmsRepository.save.mockResolvedValue(mockCreatedFarm);

    return request
      .default(app.getHttpServer())
      .post('/farms')
      .send(createFarmDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(mockCreatedFarm);
      });
  });

  it('/farms (GET) - deve retornar todas as fazendas', () => {
    const mockFarms = [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Fazenda 1',
        city: 'Cidade 2',
        state: 'TO',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 50,
        producer: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          document: '12345678901',
          producerName: 'Produtor 1',
        },
        plantedCrops: [],
      },
    ];
    jest.clearAllMocks();
    mockFarmsRepository.find.mockResolvedValue(mockFarms);
    return request
      .default(app.getHttpServer())
      .get('/farms')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockFarms);
      });
  });

  it('/farms (GET) - deve retornar uma fazenda pelo ID', () => {
    const mockFarm = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Fazenda 1',
      city: 'Cidade 2',
      state: 'TO',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      producer: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        document: '12345678901',
        producerName: 'Produtor 1',
      },
      plantedCrops: [],
    };
    jest.clearAllMocks();
    mockFarmsRepository.findOne.mockResolvedValue(mockFarm);
    return request
      .default(app.getHttpServer())
      .get('/farms/123e4567-e89b-12d3-a456-426614174000')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockFarm);
      });
  });

  it('/farms (PATCH) - deve atualizar uma fazenda com sucesso', () => {
    const mockFarm = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Fazenda 1',
      city: 'Cidade 1',
      state: 'TO',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      producer: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        document: '12345678901',
        producerName: 'Produtor 1',
      },
      plantedCrops: [],
    };
    const updateDto = { name: 'Fazenda 2' };
    jest.clearAllMocks();
    mockFarmsRepository.preload.mockResolvedValue(mockFarm);
    mockFarmsRepository.save.mockResolvedValue(mockFarm);
    mockFarmsRepository.findOne.mockResolvedValue(mockFarm);
    return request
      .default(app.getHttpServer())
      .patch('/farms/123e4567-e89b-12d3-a456-426614174000')
      .send(updateDto)
      .expect(200);
  });

  it('/farms (DELETE) - deve remover uma fazenda com sucesso', () => {
    jest.clearAllMocks();
    mockFarmsRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
    return request
      .default(app.getHttpServer())
      .delete('/farms/123e4567-e89b-12d3-a456-426614174000')
      .expect(204);
  });
});
