import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from 'src/utils/validators/cpf-or-cnpj.validator';

export class CreateProducerDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '1234567890',
  })
  @IsCPFOrCNPJ()
  document: string;

  @ApiProperty({ description: 'Nome do produtor', example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  producerName: string;
}
