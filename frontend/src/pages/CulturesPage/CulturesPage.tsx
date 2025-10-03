import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import {
  EntityCard,
  EntityCardHeader,
  IconButton,
} from '@/components/molecules/EntityCard'
import FormActions from '@/components/molecules/FormActions'
import { cultureSchema, type CultureFormData } from '@/schemas/culture.schema'
import {
  useCreateCultureMutation,
  useDeleteCultureMutation,
  useGetAllCulturesQuery,
  useUpdateCultureMutation,
} from '@/store/api/cultures-api'
import type { CulturesResponse } from '@/types/cultures'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, Leaf, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as S from './cultures.styles'

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CultureFormData>({
    resolver: zodResolver(cultureSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: CultureFormData) => {
    try {
      if (editingCulture) {
        await updateCulture({
          id: editingCulture.id,
          name: data.name,
        }).unwrap()
      } else {
        await createCulture({
          name: data.name,
        }).unwrap()
      }
      handleCloseModal()
    } catch (error) {
      console.error('Erro ao salvar cultura:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCulture(null)
    reset({ name: '' })
  }

  const handleEdit = (culture: CulturesResponse) => {
    setEditingCulture(culture)
    reset({ name: culture.name })
    setIsModalOpen(true)
  }

  const handleDelete = async (culture: CulturesResponse) => {
    if (confirm(`Deseja realmente excluir a cultura "${culture.name}"?`)) {
      try {
        await deleteCulture(culture.id).unwrap()
      } catch (error) {
        console.error('Erro ao excluir cultura:', error)
      }
    }
  }

  return (
    <>
      <S.PageHeader>
        <Text variant="h1" weight="bold">
          Culturas
        </Text>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Nova Cultura
        </Button>
      </S.PageHeader>

      <S.CardsGrid>
        {cultures.map((culture) => (
          <EntityCard key={culture.id}>
            <EntityCardHeader
              icon={<Leaf size={20} />}
              title={
                <Text variant="h3" weight="bold">
                  {culture.name}
                </Text>
              }
            >
              <IconButton onClick={() => handleEdit(culture)} title="Editar">
                <Edit size={16} />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(culture)}
                title="Excluir"
                variant="danger"
              >
                <Trash2 size={16} />
              </IconButton>
            </EntityCardHeader>
          </EntityCard>
        ))}
      </S.CardsGrid>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCulture ? 'Editar Cultura' : 'Nova Cultura'}
      >
        <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome da Cultura"
            placeholder="Ex: Soja, Milho, Café"
            {...register('name')}
            error={errors.name?.message}
          />
          <FormActions
            onCancel={handleCloseModal}
            isLoading={isSubmitting}
            submitText={editingCulture ? 'Salvar' : 'Criar'}
          />
        </S.FormWrapper>
      </Modal>
    </>
  )
}
