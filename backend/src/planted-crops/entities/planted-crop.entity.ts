import { ApiProperty } from '@nestjs/swagger';
import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('planted_crops')
@Unique(['farm', 'culture', 'harvest'])
export class PlantedCrop {
  @ApiProperty({
    description: 'ID da cultura plantada',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Área plantada em hectares', example: 100 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  plantedArea: number;

  @ApiProperty({ type: () => Farm })
  @ManyToOne(() => Farm, (farm) => farm.plantedCrops)
  farm: Farm;

  @ApiProperty({ type: () => Culture })
  @ManyToOne(() => Culture)
  culture: Culture;

  @ApiProperty({ type: () => Harvest })
  @ManyToOne(() => Harvest)
  harvest: Harvest;
}
