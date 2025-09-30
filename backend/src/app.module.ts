import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { CulturesModule } from 'src/cultures/cultures.module';
import { Culture } from 'src/cultures/entities/culture.entity';
import { DashboardModule } from 'src/dashboard/dashboard.module';
import { Farm } from 'src/farms/entities/farm.entity';
import { FarmsModule } from 'src/farms/farms.module';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { HarvestsModule } from 'src/harvests/harvests.module';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { PlantedCropsModule } from 'src/planted-crops/planted-crops.module';
import { Producer } from 'src/producers/entities/producer.entity';
import { ProducersModule } from 'src/producers/producers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [Producer, Farm, Culture, Harvest, PlantedCrop],
        synchronize: true,
      }),
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
