import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdatePlantedCropDto {
  @ApiProperty({
    description: 'Área plantada em hectares para esta cultura',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  plantedArea?: number;
}
