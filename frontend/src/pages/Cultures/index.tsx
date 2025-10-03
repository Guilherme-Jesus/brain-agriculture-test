import Modal from '@/components/atoms/Modal'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import PageHeader from '@/components/organisms/PageHeader'
import {
  useDeleteCultureMutation,
  useGetAllCulturesQuery,
} from '@/store/api/cultures-api'
import type { CulturesResponse } from '@/types/cultures'
import { Leaf } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CultureForm } from './CultureForm'
import { CulturesList } from './CulturesList'

export default function CulturesPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isFormModalOpen = !!id || window.location.pathname.includes('/new')
  const handleCloseFormModal = () => navigate('/cultures')

  const [cultureToDelete, setCultureToDelete] =
    useState<CulturesResponse | null>(null)

  const { data: cultures = [], isLoading } = useGetAllCulturesQuery()
  const [deleteCulture, { isLoading: isDeleting }] = useDeleteCultureMutation()

  const handleCreate = () => navigate('/cultures/new')
  const handleEdit = (culture: CulturesResponse) =>
    navigate(`/cultures/${culture.id}/edit`)

  const handleDelete = (culture: CulturesResponse) => {
    setCultureToDelete(culture)
  }

  const handleConfirmDelete = async () => {
    if (!cultureToDelete) return

    try {
      await deleteCulture(cultureToDelete.id).unwrap()
      toast.success('Cultura excluída com sucesso!')
      setCultureToDelete(null)
    } catch {
      toast.error('Erro ao excluir cultura.')
    }
  }

  return (
    <>
      <PageHeader
        icon={Leaf}
        title="Culturas"
        subtitle="Gerenciamento de tipos de culturas"
        actionLabel="+ Nova Cultura"
        onActionClick={handleCreate}
      />

      {isLoading ? (
        <p>Carregando culturas...</p>
      ) : (
        <CulturesList
          cultures={cultures}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={id ? 'Editar Cultura' : 'Nova Cultura'}
      >
        {isFormModalOpen && (
          <CultureForm
            id={id}
            onSuccess={handleCloseFormModal}
            onCancel={handleCloseFormModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!cultureToDelete}
        onClose={() => setCultureToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a cultura ${cultureToDelete?.name}?`}
        description="Esta ação não poderá ser desfeita."
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  )
}
