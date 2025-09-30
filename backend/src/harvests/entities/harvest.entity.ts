import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('harvests')
@Entity('harvests')
export class Harvest {
  @ApiProperty({
    description: 'ID da safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nome da safra',
    example: 'Safra 1',
  })
  @Column({ unique: true, nullable: false })
  name: string;
}
