import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import { DataTable } from '@/components/molecules/DataTable'
import {
  useCreateHarvestMutation,
  useDeleteHarvestMutation,
  useGetAllHarvestsQuery,
  useUpdateHarvestMutation,
} from '@/store/api/harvests-api'
import type { HarvestsResponse } from '@/types/harvests'
import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './harvest.style'

export default function HarvestsPage() {
  const { harvests } = useGetAllHarvestsQuery(undefined, {
    selectFromResult: ({ ...result }) => ({
      harvests: result.data || [],
      isLoading: result.isLoading,
    }),
  })
  const [createHarvest] = useCreateHarvestMutation()
  const [updateHarvest] = useUpdateHarvestMutation()
  const [deleteHarvest] = useDeleteHarvestMutation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHarvest, setEditingHarvest] = useState<HarvestsResponse | null>(
    null
  )
  const [formData, setFormData] = useState({ name: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingHarvest) {
      updateHarvest({
        id: editingHarvest.id,
        name: formData.name,
      }).unwrap()
    } else {
      createHarvest({
        name: formData.name,
      }).unwrap()
    }
    setIsModalOpen(false)
    setEditingHarvest(null)
    setFormData({ name: '' })
  }

  const handleEdit = (harvest: HarvestsResponse) => {
    setEditingHarvest(harvest)
    setFormData({ name: harvest.name })
    setIsModalOpen(true)
    navigate(`/harvests/edit/${harvest.id}`)
  }

  const handleDelete = (harvest: HarvestsResponse) => {
    deleteHarvest(harvest.id).unwrap()
  }

  const columns = [{ key: 'name', label: 'Nome da Safra' }]

  return (
    <>
      <S.PageHeader>
        <Text variant="h1" weight="bold">
          Safras
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Nova Safra
        </Button>
      </S.PageHeader>

      <DataTable
        data={harvests}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHarvest(null)
          setFormData({ name: '' })
        }}
        title={editingHarvest ? 'Editar Safra' : 'Nova Safra'}
      >
        <S.FormWrapper onSubmit={handleSubmit}>
          <Input
            label="Nome da Safra"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="Ex: 2024/2025"
            required
          />
          <S.ButtonGroup>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingHarvest(null)
                setFormData({ name: '' })
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingHarvest ? 'Salvar' : 'Criar'}
            </Button>
          </S.ButtonGroup>
        </S.FormWrapper>
      </Modal>
    </>
  )
}
