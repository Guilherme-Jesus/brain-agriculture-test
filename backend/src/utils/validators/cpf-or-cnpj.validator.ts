import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

function cleanDocument(document: string): string {
  return document.replace(/\D/g, '');
}

@ValidatorConstraint({ name: 'isCPFOrCNPJ', async: false })
export class IsCPFOrCNPJConstraint implements ValidatorConstraintInterface {
  validate(document: unknown): boolean {
    if (typeof document !== 'string' || !document.trim()) {
      return false;
    }

    const cleanDocumentValue = cleanDocument(document);

    return cleanDocumentValue.length === 11 || cleanDocumentValue.length === 14;
  }

  defaultMessage(): string {
    return 'O documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos numéricos';
  }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFOrCNPJConstraint,
    });
  };
}
