import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ApiTags('farms')
@Entity('farms')
export class Farm {
  @ApiProperty({
    description: 'ID da fazenda',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome da fazenda', example: 'Fazenda do João' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Cidade da fazenda', example: 'São Paulo' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Estado da fazenda', example: 'SP' })
  @Column()
  state: string;

  @ApiProperty({ description: 'Área total da fazenda', example: 100.5 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalArea: number; // em hectares

  @ApiProperty({ description: 'Área arável da fazenda', example: 50.2 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableArea: number; // em hectares

  @ApiProperty({ description: 'Área de vegetação da fazenda', example: 50.3 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number; // em hectares

  @ApiProperty({ type: () => [Producer] })
  @ManyToOne(() => Producer, (producer) => producer.farms)
  producer: Producer;

  @ApiProperty({ type: () => [PlantedCrop] })
  @OneToMany(() => PlantedCrop, (plantedCrop) => plantedCrop.farm)
  plantedCrops: PlantedCrop[];
}
