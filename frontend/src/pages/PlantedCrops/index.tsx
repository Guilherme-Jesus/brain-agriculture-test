import Modal from '@/components/atoms/Modal'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import PageHeader from '@/components/organisms/PageHeader'
import {
  useDeletePlantedCropMutation,
  useGetAllPlantedCropsQuery,
} from '@/store/api/planted-crop-api'
import type { PlantedCropResponse } from '@/types/planted-crop'
import { Sprout } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PlantedCropForm } from './PlantedCropForm'
import { PlantedCropsList } from './PlantedCropsList'

export default function PlantedCropsPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isFormModalOpen = !!id || window.location.pathname.includes('/new')
  const handleCloseFormModal = () => navigate('/planted-crops')

  const [cropToDelete, setCropToDelete] = useState<PlantedCropResponse | null>(
    null
  )

  const { data: plantedCrops = [], isLoading } = useGetAllPlantedCropsQuery()
  const [deletePlantedCrop, { isLoading: isDeleting }] =
    useDeletePlantedCropMutation()

  const handleCreate = () => navigate('/planted-crops/new')
  const handleEdit = (crop: PlantedCropResponse) =>
    navigate(`/planted-crops/${crop.id}/edit`)

  const handleDelete = (crop: PlantedCropResponse) => {
    setCropToDelete(crop)
  }

  const handleConfirmDelete = async () => {
    if (!cropToDelete) return

    try {
      await deletePlantedCrop(cropToDelete.id).unwrap()
      toast.success('Plantio excluído com sucesso!')
      setCropToDelete(null)
    } catch {
      toast.error('Erro ao excluir plantio.')
    }
  }

  return (
    <>
      <PageHeader
        icon={Sprout}
        title="Culturas Plantadas"
        subtitle="Gerenciamento de plantios e culturas"
        actionLabel="+ Novo Plantio"
        onActionClick={handleCreate}
      />

      {isLoading ? (
        <p>Carregando plantios...</p>
      ) : (
        <PlantedCropsList
          crops={plantedCrops}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={id ? 'Editar Plantio' : 'Novo Plantio'}
      >
        {isFormModalOpen && (
          <PlantedCropForm
            id={id}
            onSuccess={handleCloseFormModal}
            onCancel={handleCloseFormModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!cropToDelete}
        onClose={() => setCropToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o plantio de ${cropToDelete?.culture.name} na ${cropToDelete?.farm.name}?`}
        description="Esta ação não poderá ser desfeita."
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  )
}
