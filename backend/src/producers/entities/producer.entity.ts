import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  documento: string;

  @Column()
  nomeProdutor: string;
}
