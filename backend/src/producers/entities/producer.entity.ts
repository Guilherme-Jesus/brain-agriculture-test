import { Farm } from 'src/farms/entities/farm.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  document: string;

  @Column()
  producerName: string;

  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
