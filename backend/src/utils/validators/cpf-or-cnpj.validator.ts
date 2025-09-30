import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Utilitário para validação de CPF e CNPJ
 */

function cleanDocument(document: string): string {
  return document.replace(/\D/g, '');
}

function hasAllSameDigits(document: string): boolean {
  return /^(\d)\1+$/.test(document);
}

function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;

  const cleanCpf = cleanDocument(cpf);

  if (cleanCpf.length !== 11) return false;

  if (hasAllSameDigits(cleanCpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i), 10) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i), 10) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(10), 10)) return false;

  return true;
}

function isValidCNPJ(cnpj: string): boolean {
  if (typeof cnpj !== 'string') return false;

  const cleanCnpj = cleanDocument(cnpj);

  if (cleanCnpj.length !== 14) return false;

  if (hasAllSameDigits(cleanCnpj)) return false;

  let length = cleanCnpj.length - 2;
  let numbers = cleanCnpj.substring(0, length);
  const digits = cleanCnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;

  length += 1;
  numbers = cleanCnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) return false;

  return true;
}

@ValidatorConstraint({ name: 'isCPFOrCNPJ', async: false })
export class IsCPFOrCNPJConstraint implements ValidatorConstraintInterface {
  validate(document: unknown): boolean {
    if (typeof document !== 'string' || !document.trim()) {
      return false;
    }

    const cleanDocumentValue = cleanDocument(document);

    if (cleanDocumentValue.length === 11) {
      return isValidCPF(document);
    }

    if (cleanDocumentValue.length === 14) {
      return isValidCNPJ(document);
    }

    return false;
  }

  defaultMessage(): string {
    return 'O documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido';
  }
}

export function IsCPFOrCNPJ(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFOrCNPJConstraint,
    });
  };
}
