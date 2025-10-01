import { Button } from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { validateCNPJ, validateCPF } from '@/utils/validators'
import { useEffect, useState } from 'react'
import { ButtonGroup, Form } from './producer-form.styles'

interface ProdutorFormProps {
  onSubmit: (data: { cpfCnpj: string; nome: string }) => void
  onCancel: () => void
  initialData?: { cpfCnpj: string; nome: string }
}

export default function ProducerForm({
  onSubmit,
  onCancel,
  initialData,
}: ProdutorFormProps) {
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [nome, setNome] = useState('')
  const [errors, setErrors] = useState<{ cpfCnpj?: string; nome?: string }>({})

  useEffect(() => {
    if (initialData) {
      setCpfCnpj(initialData.cpfCnpj)
      setNome(initialData.nome)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { cpfCnpj?: string; nome?: string } = {}

    if (!cpfCnpj) {
      newErrors.cpfCnpj = 'CPF/CNPJ é obrigatório'
    } else {
      const cpfCnpjLimpo = cpfCnpj.replace(/\D/g, '')
      const isValid =
        cpfCnpjLimpo.length === 11
          ? validateCPF(cpfCnpjLimpo)
          : validateCNPJ(cpfCnpjLimpo)
      if (!isValid) {
        newErrors.cpfCnpj = 'CPF/CNPJ inválido'
      }
    }

    if (!nome) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ cpfCnpj, nome })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="CPF ou CNPJ"
        placeholder="000.000.000-00 ou 00.000.000/0000-00"
        value={cpfCnpj}
        onChange={(e) => setCpfCnpj(e.target.value)}
        error={errors.cpfCnpj}
      />
      <Input
        label="Nome do Produtor"
        placeholder="Digite o nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors.nome}
      />
      <ButtonGroup>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </ButtonGroup>
    </Form>
  )
}
