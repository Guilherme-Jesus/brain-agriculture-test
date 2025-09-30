import { Module } from '@nestjs/common';
import { PlantedCropsService } from './planted-crops.service';
import { PlantedCropsController } from './planted-crops.controller';

@Module({
  controllers: [PlantedCropsController],
  providers: [PlantedCropsService],
})
export class PlantedCropsModule {}
