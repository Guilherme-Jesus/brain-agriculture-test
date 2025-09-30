import { ApiProperty } from '@nestjs/swagger';

export class FarmsByStateDto {
  @ApiProperty({ example: 'MG' })
  state: string;

  @ApiProperty({ example: 5 })
  count: number;
}

export class FarmsByCultureDto {
  @ApiProperty({ example: 'Soja' })
  culture: string;

  @ApiProperty({ example: 12 })
  count: number;
}

export class LandUseDto {
  @ApiProperty({ example: 7800.0 })
  totalArableArea: number;

  @ApiProperty({ example: 4700.5 })
  totalVegetationArea: number;
}

export class DashboardResponseDto {
  @ApiProperty({ example: 15 })
  totalFarms: number;

  @ApiProperty({ example: 12500.5 })
  totalAreaInHectares: number;

  @ApiProperty({ type: [FarmsByStateDto] })
  farmsByState: FarmsByStateDto[];

  @ApiProperty({ type: [FarmsByCultureDto] })
  farmsByCulture: FarmsByCultureDto[];

  @ApiProperty({ type: LandUseDto })
  landUse: LandUseDto;
}
