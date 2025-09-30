import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Farm } from 'src/farms/entities/farm.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('producers')
@Entity('producers')
export class Producer {
  @ApiProperty({
    description: 'ID do produtor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '1234567890',
  })
  @Column({ unique: true })
  document: string;

  @ApiProperty({ description: 'Nome do produtor', example: 'João da Silva' })
  @Column()
  producerName: string;

  @ApiProperty({ type: () => [Farm] })
  @OneToMany(() => Farm, (farm) => farm.producer)
  farms: Farm[];
}
