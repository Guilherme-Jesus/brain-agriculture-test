import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePlantedCropDto {
  @ApiProperty({
    description: 'Área plantada em hectares para esta cultura',
    example: 100,
  })
  @IsNumber()
  @IsPositive()
  plantedArea: number;

  @ApiProperty({
    description: 'ID da Fazenda onde foi plantado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  farmId: string;

  @ApiProperty({
    description: 'ID da Cultura que foi plantada',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  cultureId: string;

  @ApiProperty({
    description: 'ID da Safra em que foi plantado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  harvestId: string;
}
