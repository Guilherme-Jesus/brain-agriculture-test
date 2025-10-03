import Modal from '@/components/atoms/Modal'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
import PageHeader from '@/components/organisms/PageHeader'
import { useGetAllFarmsQuery } from '@/store/api/farms-api'
import {
  useDeleteProducerMutation,
  useGetAllProducersQuery,
} from '@/store/api/producers-api'
import type { ProducersResponse } from '@/types/producers'
import { Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProducerForm } from './ProducerForm'
import { ProducersList } from './ProducersList'

export default function ProducersPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isFormModalOpen = !!id || window.location.pathname.includes('/new')
  const handleCloseFormModal = () => navigate('/producers')

  const [producerToDelete, setProducerToDelete] =
    useState<ProducersResponse | null>(null)

  const { data: producers = [], isLoading } = useGetAllProducersQuery()
  const { data: farms = [] } = useGetAllFarmsQuery()
  const [deleteProducer, { isLoading: isDeleting }] =
    useDeleteProducerMutation()

  const handleCreate = () => navigate('/producers/new')
  const handleEdit = (producer: ProducersResponse) =>
    navigate(`/producers/${producer.id}/edit`)

  const handleDelete = (producer: ProducersResponse) => {
    setProducerToDelete(producer)
  }

  const handleConfirmDelete = async () => {
    if (!producerToDelete) return

    try {
      await deleteProducer(producerToDelete.id).unwrap()
      toast.success('Produtor excluído com sucesso!')
      setProducerToDelete(null)
    } catch {
      toast.error('Erro ao excluir produtor.')
    }
  }

  const producersWithStats = useMemo(() => {
    return producers.map((producer) => {
      const producerFarms = farms.filter(
        (farm) => farm.producer.id === producer.id
      )

      const totalArea = producerFarms.reduce(
        (sum, farm) => sum + Number(farm.totalArea),
        0
      )
      const arableArea = producerFarms.reduce(
        (sum, farm) => sum + Number(farm.arableArea),
        0
      )
      const vegetationArea = producerFarms.reduce(
        (sum, farm) => sum + Number(farm.vegetationArea),
        0
      )

      return {
        ...producer,
        farmsCount: producerFarms.length,
        farms: producerFarms,
        totalArea,
        arableArea,
        vegetationArea,
      }
    })
  }, [producers, farms])

  return (
    <>
      <PageHeader
        icon={Users}
        title="Produtores"
        subtitle="Gerenciamento de produtores rurais"
        actionLabel="+ Novo Produtor"
        onActionClick={handleCreate}
      />

      {isLoading ? (
        <p>Carregando produtores...</p>
      ) : (
        <ProducersList
          producers={producersWithStats}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={id ? 'Editar Produtor' : 'Novo Produtor'}
      >
        {isFormModalOpen && (
          <ProducerForm
            id={id}
            onSuccess={handleCloseFormModal}
            onCancel={handleCloseFormModal}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!producerToDelete}
        onClose={() => setProducerToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o produtor ${producerToDelete?.producerName}?`}
        description="Esta ação não poderá ser desfeita."
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </>
  )
}
