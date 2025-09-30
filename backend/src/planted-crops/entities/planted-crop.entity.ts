import { Culture } from 'src/cultures/entities/culture.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { Harvest } from 'src/harvests/entities/harvest.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('planted_crops')
export class PlantedCrop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Este é um campo que pertence à relação: a área plantada desta cultura específica.
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  plantedArea: number; // em hectares

  // --- RELACIONAMENTOS ---

  // Várias "Culturas Plantadas" podem pertencer a uma Fazenda
  @ManyToOne(() => Farm, (farm) => farm.plantedCrops)
  farm: Farm;

  // Várias "Culturas Plantadas" podem se referir a uma Cultura
  @ManyToOne(() => Culture, { eager: true }) // eager: true carrega a Cultura junto automaticamente
  culture: Culture;

  // Várias "Culturas Plantadas" podem pertencer a uma Safra
  @ManyToOne(() => Harvest, { eager: true }) // eager: true carrega a Safra junto automaticamente
  harvest: Harvest;
}
