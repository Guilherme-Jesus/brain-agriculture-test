import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('cultures')
@Entity('cultures')
export class Culture {
  @ApiProperty({
    description: 'ID da cultura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome da cultura', example: 'Soja' })
  @Column({ unique: true, nullable: false })
  name: string;
}
