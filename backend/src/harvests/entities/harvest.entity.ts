import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;
}
