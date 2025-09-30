import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  producerName: string;
}
