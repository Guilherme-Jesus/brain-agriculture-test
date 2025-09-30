import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) should redirect to /api-docs', () => {
    return request
      .default(app.getHttpServer())
      .get('/')
      .expect(302) // 1. Esperamos um status de redirecionamento
      .expect('Location', '/api-docs'); // 2. Verificamos se o cabeçalho 'Location' aponta para o lugar certo
  });
});
