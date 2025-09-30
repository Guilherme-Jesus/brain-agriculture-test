import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Producer } from '../src/producers/entities/producer.entity';

describe('Producers (e2e)', () => {
  let app: INestApplication<App>;

  const mockProducersRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
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

  it('/producers (POST) - deve criar um produtor com sucesso', () => {
    const createProducerDto = {
      document: '11144477735',
      producerName: 'Produtor E2E',
    };
    const mockCreatedProducer = {
      id: 'some-uuid',
      ...createProducerDto,
      farms: [],
    };

    jest.clearAllMocks();
    mockProducersRepository.findOneBy.mockResolvedValue(null);
    mockProducersRepository.create.mockReturnValue(mockCreatedProducer);
    mockProducersRepository.save.mockResolvedValue(mockCreatedProducer);

    return request
      .default(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 'some-uuid',
          document: '11144477735',
          producerName: 'Produtor E2E',
          farms: [],
        });
      });
  });

  it('/producers (POST) - deve retornar erro 400 para documento inválido', () => {
    const invalidDto = {
      document: '123',
      producerName: 'Produtor E2E Inválido',
    };

    return request
      .default(app.getHttpServer())
      .post('/producers')
      .send(invalidDto)
      .expect(400);
  });
});
