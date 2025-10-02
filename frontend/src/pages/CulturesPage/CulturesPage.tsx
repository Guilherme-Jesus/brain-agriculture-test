import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import { DataTable } from '@/components/molecules/DataTable'
import {
  useCreateCultureMutation,
  useDeleteCultureMutation,
  useGetAllCulturesQuery,
  useUpdateCultureMutation,
} from '@/store/api/cultures-api'
import type { CulturesResponse } from '@/types/cultures'
import type React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
`

export default function CulturesPage() {
  const { cultures } = useGetAllCulturesQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      cultures: result.data || [],
      isLoading: result.isLoading,
    }),
  })
  const [createCulture] = useCreateCultureMutation()
  const [updateCulture] = useUpdateCultureMutation()
  const [deleteCulture] = useDeleteCultureMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCulture, setEditingCulture] = useState<CulturesResponse | null>(
    null
  )
  const [formData, setFormData] = useState({ name: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCulture) {
      updateCulture({
        id: editingCulture.id,
        name: formData.name,
      }).unwrap()
    } else {
      createCulture({
        name: formData.name,
      }).unwrap()
    }
    setIsModalOpen(false)
    setEditingCulture(null)
    setFormData({ name: '' })
  }

  const handleEdit = (culture: CulturesResponse) => {
    setEditingCulture(culture)
    setFormData({ name: culture.name })
    setIsModalOpen(true)
  }

  const handleDelete = (culture: CulturesResponse) => {
    deleteCulture(culture.id).unwrap()
  }

  const columns = [{ key: 'name', label: 'Nome da Cultura' }]

  return (
    <>
      <PageHeader>
        <Text variant="h1" weight="bold">
          Culturas
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Nova Cultura
        </Button>
      </PageHeader>

      <DataTable
        data={cultures}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCulture(null)
          setFormData({ name: '' })
        }}
        title={editingCulture ? 'Editar Cultura' : 'Nova Cultura'}
      >
        <FormWrapper onSubmit={handleSubmit}>
          <Input
            label="Nome da Cultura"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="Ex: Soja, Milho, Café"
            required
          />
          <ButtonGroup>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingCulture(null)
                setFormData({ name: '' })
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingCulture ? 'Salvar' : 'Criar'}
            </Button>
          </ButtonGroup>
        </FormWrapper>
      </Modal>
    </>
  )
}
