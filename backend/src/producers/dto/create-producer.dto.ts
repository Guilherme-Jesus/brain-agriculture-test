import { IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from 'src/utils/validators/cpf-or-cnpj.validator';

export class CreateProducerDto {
  @IsCPFOrCNPJ()
  document: string;

  @IsString()
  @IsNotEmpty()
  producerName: string;
}
