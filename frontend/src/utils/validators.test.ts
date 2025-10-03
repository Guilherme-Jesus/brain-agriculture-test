import { describe, expect, it } from 'vitest'
import { formatarCNPJ, formatarCPF } from './validators'

describe('validators', () => {
  describe('formatarCPF', () => {
    it('deve formatar CPF corretamente', () => {
      expect(formatarCPF('12345678909')).toBe('123.456.789-09')
    })

    it('deve retornar string vazia para entrada vazia', () => {
      expect(formatarCPF('')).toBe('')
    })
  })

  describe('formatarCNPJ', () => {
    it('deve formatar CNPJ corretamente', () => {
      expect(formatarCNPJ('11222333000181')).toBe('11.222.333/0001-81')
    })

    it('deve retornar string vazia para entrada vazia', () => {
      expect(formatarCNPJ('')).toBe('')
    })
  })
})
