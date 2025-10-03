import Button from '@/components/atoms/Button'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import {
  useDeleteHarvestMutation,
  useGetAllHarvestsQuery,
} from '@/store/api/harvests-api'
import type { HarvestsResponse } from '@/types/harvests'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { HarvestForm } from './HarvestForm'
import { HarvestsList } from './HarvestsList'
import * as S from './harvests.styles'

export default function HarvestsPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isFormModalOpen = !!id || window.location.pathname.includes('/new')
  const handleCloseFormModal = () => navigate('/harvests')

  const [harvestToDelete, setHarvestToDelete] =
    useState<HarvestsResponse | null>(null)

  const { data: harvests = [], isLoading } = useGetAllHarvestsQuery()
  const [deleteHarvest, { isLoading: isDeleting }] = useDeleteHarvestMutation()

  const handleCreate = () => navigate('/harvests/new')
  const handleEdit = (harvest: HarvestsResponse) =>
    navigate(`/harvests/${harvest.id}/edit`)

  const handleDelete = (harvest: HarvestsResponse) => {
    setHarvestToDelete(harvest)
  }

  const handleConfirmDelete = async () => {
    if (!harvestToDelete) return

    try {
      await deleteHarvest(harvestToDelete.id).unwrap()
      toast.success('Safra excluída com sucesso!')
      setHarvestToDelete(null)
    } catch {
      toast.error('Erro ao excluir safra.')
    }
  }

  return (
    <>
      <S.PageHeader>
        <Text variant="h1" weight="bold">
          Safras
        </Text>
        <Button variant="primary" onClick={handleCreate}>
          + Nova Safra
        </Button>
      </S.PageHeader>

      {isLoading ? (
        <p>Carregando safras...</p>
      ) : (
        <HarvestsList
          harvests={harvests}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={id ? 'Editar Safra' : 'Nova Safra'}
      >
        {isFormModalOpen && (
          <HarvestForm
            id={id}
            onSuccess={handleCloseFormModal}
            onCancel={handleCloseFormModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!harvestToDelete}
        onClose={() => setHarvestToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a safra ${harvestToDelete?.name}?`}
        description="Esta ação não poderá ser desfeita."
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  )
}
