import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHarvestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
