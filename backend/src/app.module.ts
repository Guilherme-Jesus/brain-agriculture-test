import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CulturesModule } from './cultures/cultures.module';
import { Culture } from './cultures/entities/culture.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { Farm } from './farms/entities/farm.entity';
import { FarmsModule } from './farms/farms.module';
import { Harvest } from './harvests/entities/harvest.entity';
import { HarvestsModule } from './harvests/harvests.module';
import { PlantedCrop } from './planted-crops/entities/planted-crop.entity';
import { PlantedCropsModule } from './planted-crops/planted-crops.module';
import { Producer } from './producers/entities/producer.entity';
import { ProducersModule } from './producers/producers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `../.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [Producer, Farm, Culture, Harvest, PlantedCrop],
            synchronize: true,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          entities: [Producer, Farm, Culture, Harvest, PlantedCrop],
          synchronize: false,
          ssl: false,
        };
      },
    }),

    ProducersModule,
    FarmsModule,
    CulturesModule,
    HarvestsModule,
    PlantedCropsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
