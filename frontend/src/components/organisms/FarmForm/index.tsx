import { Button } from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { useState } from 'react'
import styled from 'styled-components'

interface FarmFormProps {
  onSubmit: (data: {
    nome: string
    cidade: string
    estado: string
    areaTotal: number
    areaAgricultavel: number
    areaVegetacao: number
  }) => void
  onCancel: () => void
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
`

const ESTADOS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

export default function FarmForm({ onSubmit, onCancel }: FarmFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    areaTotal: '',
    areaAgricultavel: '',
    areaVegetacao: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.nome) newErrors.nome = 'Nome da fazenda é obrigatório'
    if (!formData.cidade) newErrors.cidade = 'Cidade é obrigatória'
    if (!formData.estado) newErrors.estado = 'Estado é obrigatório'
    if (!formData.areaTotal) newErrors.areaTotal = 'Área total é obrigatória'
    if (!formData.areaAgricultavel)
      newErrors.areaAgricultavel = 'Área agricultável é obrigatória'
    if (!formData.areaVegetacao)
      newErrors.areaVegetacao = 'Área de vegetação é obrigatória'

    const areaTotal = Number.parseFloat(formData.areaTotal)
    const areaAgricultavel = Number.parseFloat(formData.areaAgricultavel)
    const areaVegetacao = Number.parseFloat(formData.areaVegetacao)

    if (areaAgricultavel + areaVegetacao > areaTotal) {
      newErrors.areaTotal =
        'A soma das áreas agricultável e vegetação não pode ultrapassar a área total'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      nome: formData.nome,
      cidade: formData.cidade,
      estado: formData.estado,
      areaTotal,
      areaAgricultavel,
      areaVegetacao,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Nome da Fazenda"
        placeholder="Digite o nome da propriedade"
        value={formData.nome}
        onChange={(e) => handleChange('nome', e.target.value)}
        error={errors.nome}
      />
      <Row>
        <Input
          label="Cidade"
          placeholder="Digite a cidade"
          value={formData.cidade}
          onChange={(e) => handleChange('cidade', e.target.value)}
          error={errors.cidade}
        />
        <Select
          label="Estado"
          options={ESTADOS}
          value={formData.estado}
          onChange={(e) => handleChange('estado', e.target.value)}
          error={errors.estado}
        />
      </Row>
      <Input
        label="Área Total (hectares)"
        type="number"
        step="0.01"
        placeholder="0.00"
        value={formData.areaTotal}
        onChange={(e) => handleChange('areaTotal', e.target.value)}
        error={errors.areaTotal}
      />
      <Row>
        <Input
          label="Área Agricultável (hectares)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.areaAgricultavel}
          onChange={(e) => handleChange('areaAgricultavel', e.target.value)}
          error={errors.areaAgricultavel}
        />
        <Input
          label="Área de Vegetação (hectares)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.areaVegetacao}
          onChange={(e) => handleChange('areaVegetacao', e.target.value)}
          error={errors.areaVegetacao}
        />
      </Row>
      <ButtonGroup>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </ButtonGroup>
    </Form>
  )
}
