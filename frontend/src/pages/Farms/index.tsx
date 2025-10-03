import Modal from '@/components/atoms/Modal'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import { DataState } from '@/components/organisms/DataState'
import PageHeader from '@/components/organisms/PageHeader'
import {
  useDeleteFarmMutation,
  useGetAllFarmsQuery,
} from '@/store/api/farms-api'
import type { FarmsResponse } from '@/types/farms'
import { Building } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FarmForm } from './FarmForm'
import { FarmsList } from './FarmsList'

export default function FarmsPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isFormModalOpen = !!id || window.location.pathname.includes('/new')
  const handleCloseFormModal = () => navigate('/farms')

  const [farmToDelete, setFarmToDelete] = useState<FarmsResponse | null>(null)

  const { farms, isLoading, isError, refetch } = useGetAllFarmsQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        farms: data ?? [],
        isLoading,
        isError,
      }),
    }
  )
  const [deleteFarm, { isLoading: isDeleting }] = useDeleteFarmMutation()

  const handleCreate = () => navigate('/farms/new')
  const handleEdit = (farm: FarmsResponse) => navigate(`/farms/${farm.id}/edit`)

  const handleDelete = (farm: FarmsResponse) => {
    setFarmToDelete(farm)
  }

  const handleConfirmDelete = async () => {
    if (!farmToDelete) return

    try {
      await deleteFarm(farmToDelete.id).unwrap()
      toast.success('Fazenda excluída com sucesso!')
      setFarmToDelete(null)
    } catch {
      toast.error('Erro ao excluir fazenda.')
    }
  }

  return (
    <>
      <PageHeader
        icon={Building}
        title="Fazendas"
        subtitle="Gerenciamento de propriedades rurais"
        actionLabel="+ Nova Fazenda"
        onActionClick={handleCreate}
      />

      <DataState
        isLoading={isLoading}
        isError={isError}
        data={farms}
        loadingMessage="Carregando fazendas..."
        errorTitle="Erro ao carregar fazendas"
        errorDescription="Não foi possível carregar as fazendas. Verifique sua conexão e tente novamente."
        emptyTitle="Nenhuma fazenda encontrada"
        emptyDescription="Não há fazendas cadastradas no sistema."
        emptyActionLabel="+ Nova Fazenda"
        onRetry={refetch}
        onEmptyAction={handleCreate}
      >
        <FarmsList farms={farms} onEdit={handleEdit} onDelete={handleDelete} />
      </DataState>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={id ? 'Editar Fazenda' : 'Nova Fazenda'}
      >
        {isFormModalOpen && (
          <FarmForm
            id={id}
            onSuccess={handleCloseFormModal}
            onCancel={handleCloseFormModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!farmToDelete}
        onClose={() => setFarmToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a fazenda ${farmToDelete?.name}?`}
        description="Esta ação não poderá ser desfeita."
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  )
}
