import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Nome da safra', example: 'Safra 1' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
