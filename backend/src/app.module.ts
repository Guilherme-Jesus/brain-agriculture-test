import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5433', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Producer, Farm, Culture, Harvest, PlantedCrop],
      synchronize: true,
    }),
    ProducersModule,
    FarmsModule,
    CulturesModule,
    HarvestsModule,
    PlantedCropsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
