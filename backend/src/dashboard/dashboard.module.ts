import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from 'src/farms/entities/farm.entity';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, PlantedCrop])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
