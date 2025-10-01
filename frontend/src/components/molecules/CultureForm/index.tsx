import { Button } from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import { useGetAllCulturesQuery } from '@/store/api/cultures-api'
import { useState } from 'react'
import { ButtonGroup, Form } from './culture-form.styles'

interface CulturaFormProps {
  onSubmit: (data: { nome: string; safraId: string }) => void
  onCancel: () => void
}

export default function CulturaForm({ onSubmit, onCancel }: CulturaFormProps) {
  const { cultures } = useGetAllCulturesQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      cultures:
        result.data?.map((culture) => ({
          value: culture.id,
          label: culture.name.charAt(0).toUpperCase() + culture.name.slice(1),
        })) ?? [],
    }),
  })

  const [nome, setNome] = useState('')
  const [safraId, setSafraId] = useState('')
  const [errors, setErrors] = useState<{ nome?: string; safraId?: string }>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: { nome?: string; safraId?: string } = {}

    if (!nome) newErrors.nome = 'Cultura é obrigatória'
    if (!safraId) newErrors.safraId = 'Safra é obrigatória'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ nome, safraId })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        label="Cultura"
        options={cultures}
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={errors.nome}
      />
      <Input
        label="Safra"
        placeholder="Ex: Safra 2024"
        value={safraId}
        onChange={(e) => setSafraId(e.target.value)}
        error={errors.safraId}
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
