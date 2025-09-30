import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsPositive()
  totalArea: number;

  @IsNumber()
  arableArea: number;

  @IsNumber()
  vegetationArea: number;

  @IsUUID()
  @IsNotEmpty()
  producerId: string;
}
