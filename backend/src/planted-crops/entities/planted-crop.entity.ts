import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('planted-crops')
@Entity('planted_crops')
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

  // --- RELACIONAMENTOS ---

  // Várias "Culturas Plantadas" podem pertencer a uma Fazenda
  @ApiProperty({ type: () => [Farm] })
  @ManyToOne(() => Farm, (farm) => farm.plantedCrops)
  farm: Farm;

  // Várias "Culturas Plantadas" podem se referir a uma Cultura
  @ApiProperty({ type: () => [Culture] })
  @ManyToOne(() => Culture, { eager: true }) // eager: true carrega a Cultura junto automaticamente
  culture: Culture;

  @ApiProperty({ type: () => [Harvest] })
  // Várias "Culturas Plantadas" podem pertencer a uma Safra
  @ManyToOne(() => Harvest, { eager: true }) // eager: true carrega a Safra junto automaticamente
  harvest: Harvest;
}
