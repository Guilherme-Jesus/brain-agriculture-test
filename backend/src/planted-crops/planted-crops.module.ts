import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { PlantedCrop } from './entities/planted-crop.entity';
import { PlantedCropsController } from './planted-crops.controller';
import { PlantedCropsService } from './planted-crops.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCrop, Farm, Culture, Harvest])],
  controllers: [PlantedCropsController],
  providers: [PlantedCropsService],
})
export class PlantedCropsModule {}
