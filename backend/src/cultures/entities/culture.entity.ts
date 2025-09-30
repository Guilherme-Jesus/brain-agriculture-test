import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cultures')
export class Culture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;
}
