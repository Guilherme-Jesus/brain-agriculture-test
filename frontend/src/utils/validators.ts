export const formatarCPF = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/\D/g, '')
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatarCNPJ = (cnpj: string): string => {
  const cnpjLimpo = cnpj.replace(/\D/g, '')
  return cnpjLimpo.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
}
