import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  nomeProdutor: string;
}
