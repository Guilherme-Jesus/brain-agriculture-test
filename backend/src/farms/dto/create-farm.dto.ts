import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({ description: 'Nome da fazenda', example: 'Fazenda 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Cidade da fazenda', example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'Estado da fazenda', example: 'SP' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Área total da fazenda', example: 100 })
  @IsNumber()
  @IsPositive()
  totalArea: number;

  @ApiProperty({ description: 'Área arável da fazenda', example: 50 })
  @IsNumber()
  arableArea: number;

  @ApiProperty({ description: 'Área de vegetação da fazenda', example: 50 })
  @IsNumber()
  vegetationArea: number;

  @ApiProperty({
    description: 'ID do produtor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  producerId: string;
}
