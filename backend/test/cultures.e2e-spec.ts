import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { Culture } from 'src/cultures/entities/culture.entity';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Cultures (e2e)', () => {
  let app: INestApplication<App>;

  const mockCulturesRepository = {
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
      .overrideProvider(getRepositoryToken(Culture))
      .useValue(mockCulturesRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/cultures (POST) - deve criar uma cultura com sucesso', () => {
    const createCultureDto = {
      name: 'Café',
    };

    const mockCreatedCulture = {
      id: 'some-uuid',
      name: 'Café',
    };

    jest.clearAllMocks();
    mockCulturesRepository.findOneBy.mockResolvedValue(null);
    mockCulturesRepository.create.mockReturnValue(mockCreatedCulture);
    mockCulturesRepository.save.mockResolvedValue(mockCreatedCulture);

    return request
      .default(app.getHttpServer())
      .post('/cultures')
      .send(createCultureDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: 'some-uuid',
          name: 'Café',
        });
      });
  });

  it('/cultures (GET) - deve retornar todas as culturas', () => {
    const mockCultures = [{ id: 'some-uuid', name: 'Café' }];
    jest.clearAllMocks();
    mockCulturesRepository.find.mockResolvedValue(mockCultures);
    return request
      .default(app.getHttpServer())
      .get('/cultures')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockCultures);
      });
  });

  it('/cultures (GET) - deve retornar uma cultura pelo ID', () => {
    const mockCulture = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Café',
    };
    jest.clearAllMocks();
    mockCulturesRepository.findOneBy.mockResolvedValue(mockCulture);
    return request
      .default(app.getHttpServer())
      .get('/cultures/123e4567-e89b-12d3-a456-426614174000')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockCulture);
      });
  });

  it('/cultures (PATCH) - deve atualizar uma cultura com sucesso', () => {
    const mockCulture = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Café Atualizado',
    };
    const updateDto = { name: 'Café Atualizado' };
    jest.clearAllMocks();
    mockCulturesRepository.preload.mockResolvedValue(mockCulture);
    mockCulturesRepository.save.mockResolvedValue(mockCulture);
    return request
      .default(app.getHttpServer())
      .patch('/cultures/123e4567-e89b-12d3-a456-426614174000')
      .send(updateDto)
      .expect(200);
  });

  it('/cultures (DELETE) - deve remover uma cultura com sucesso', () => {
    jest.clearAllMocks();
    mockCulturesRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
    return request
      .default(app.getHttpServer())
      .delete('/cultures/123e4567-e89b-12d3-a456-426614174000')
      .expect(204);
  });
});
