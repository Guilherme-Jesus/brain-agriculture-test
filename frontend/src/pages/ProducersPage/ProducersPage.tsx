import { Button } from '@/components/atoms/Button'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import type { ProducersResponse } from '@/types/producers'
import type React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import { DataTable } from '@/components/molecules/DataTable'
import ProducerForm from '@/components/organisms/ProducerForm'

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ProducersPage: React.FC = () => {
  const [producers, setProducers] = useState<ProducersResponse[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProducer, setEditingProducer] =
    useState<ProducersResponse | null>(null)

  const handleSubmit = (data: { cpfCnpj: string; nome: string }) => {
    if (editingProducer) {
      setProducers(
        producers.map((p) =>
          p.id === editingProducer.id
            ? { ...p, document: data.cpfCnpj, producerName: data.nome }
            : p
        )
      )
    } else {
      const newProducer: ProducersResponse = {
        id: String(Date.now()),
        document: data.cpfCnpj,
        producerName: data.nome,
      }
      setProducers([...producers, newProducer])
    }
    setIsModalOpen(false)
    setEditingProducer(null)
  }

  const handleEdit = (producer: ProducersResponse) => {
    setEditingProducer(producer)
    setIsModalOpen(true)
  }

  const handleDelete = (producer: ProducersResponse) => {
    if (
      confirm(`Deseja realmente excluir o produtor ${producer.producerName}?`)
    ) {
      setProducers(producers.filter((p) => p.id !== producer.id))
    }
  }

  const columns = [
    { key: 'document', label: 'CPF/CNPJ' },
    { key: 'producerName', label: 'Nome' },
  ]

  return (
    <>
      <PageHeader>
        <Text variant="h1" weight="bold">
          Produtores
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Novo Produtor
        </Button>
      </PageHeader>

      <DataTable
        data={producers}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProducer(null)
        }}
        title={editingProducer ? 'Editar Produtor' : 'Novo Produtor'}
      >
        <ProducerForm
          initialData={
            editingProducer
              ? {
                  cpfCnpj: editingProducer.document,
                  nome: editingProducer.producerName,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingProducer(null)
          }}
        />
      </Modal>
    </>
  )
}
