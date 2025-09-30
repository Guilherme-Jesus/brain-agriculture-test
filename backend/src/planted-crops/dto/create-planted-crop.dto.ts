import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePlantedCropDto {
  @IsNumber()
  @IsPositive()
  plantedArea: number; // Área plantada em hectares para esta cultura

  @IsUUID()
  @IsNotEmpty()
  farmId: string; // ID da Fazenda onde foi plantado

  @IsUUID()
  @IsNotEmpty()
  cultureId: string; // ID da Cultura que foi plantada

  @IsUUID()
  @IsNotEmpty()
  harvestId: string; // ID da Safra em que foi plantado
}
