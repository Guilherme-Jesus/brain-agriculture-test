import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import { Farm } from './entities/farm.entity';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Producer, PlantedCrop])],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}
