import { PlantedCrop } from 'src/planted-crops/entities/planted-crop.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalArea: number; // em hectares

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableArea: number; // em hectares

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number; // em hectares

  @ManyToOne(() => Producer, (producer) => producer.farms)
  producer: Producer;

  @OneToMany(() => PlantedCrop, (plantedCrop) => plantedCrop.farm)
  plantedCrops: PlantedCrop[];
}
