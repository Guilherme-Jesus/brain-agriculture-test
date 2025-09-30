import { ApiProperty } from '@nestjs/swagger';
import { Farm } from 'src/farms/entities/farm.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class Producer {
  @ApiProperty({
    description: 'ID único do produtor',
    example: 'a1b2c3d4-e4f5-6a7b-8c9d-0e1f2a3b4c5d',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '1234567890',
  })
  @Column({ unique: true })
  document: string;

  @ApiProperty({
    description: 'Nome do produtor (ex: João da Silva)',
    example: 'João da Silva',
  })
  @Column()
  producerName: string;

  @ApiProperty({ type: () => [Farm] })
  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
