import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCultureDto {
  @ApiProperty({ description: 'Nome da cultura', example: 'Soja' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
