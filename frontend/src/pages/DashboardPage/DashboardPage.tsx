import { Button } from '@/components/atoms/Button'
import Modal from '@/components/atoms/Modal'
import Text from '@/components/atoms/Text'
import CultureForm from '@/components/molecules/CultureForm'
import {
  FarmsByCultureChart,
  FarmsByStateChart,
  LandUseChart,
} from '@/components/molecules/DashboardChart'
import type { StatCardData } from '@/components/molecules/StatCard'
import FarmForm from '@/components/organisms/FarmForm'
import ProducerForm from '@/components/organisms/ProducerForm'
import { StatsGrid } from '@/components/organisms/StatsGrid'
import { useGetDashboardDataQuery } from '@/store/api/dashboard-api'
import { useCreateFarmMutation } from '@/store/api/farms-api'
import { useCreateProducerMutation } from '@/store/api/producers-api'
import { useState } from 'react'
import {
  ActionButtons,
  ChartsGrid,
  ContentSection,
  PageHeader,
  PageTitle,
} from './dashboard.styles'

export default function DashboardPage() {
  const [modalAberto, setModalAberto] = useState<
    'produtor' | 'fazenda' | 'cultura' | null
  >(null)

  const { dashboardData, isFetching, isError } = useGetDashboardDataQuery(
    undefined,
    {
      selectFromResult: ({ ...result }) => ({
        dashboardData: result.data,
        isFetching: result.isFetching,
        isError: result.isError,
      }),
    }
  )
  const [createProducer] = useCreateProducerMutation()
  const [createFarm] = useCreateFarmMutation()

  // Preparar dados para as estatísticas
  const statsData: StatCardData[] = [
    {
      title: 'Total de Fazendas',
      value: dashboardData?.totalFarms?.toString() || '0',
      icon: 'mapPin',
    },
    {
      title: 'Total de Hectares',
      value: dashboardData?.totalAreaInHectares?.toString() || '0',
      icon: 'barChart',
    },
    {
      title: 'Produtores Cadastrados',
      value: dashboardData?.totalFarms?.toString() || '0',
      icon: 'users',
    },
    {
      title: 'Culturas Ativas',
      value: dashboardData?.farmsByCulture?.length?.toString() || '0',
      icon: 'sprout',
    },
  ]

  const handleSubmitProdutor = async (data: {
    cpfCnpj: string
    nome: string
  }) => {
    try {
      await createProducer({
        document: data.cpfCnpj,
        producerName: data.nome,
      }).unwrap()
      setModalAberto(null)
    } catch (error) {
      console.error('Erro ao criar produtor:', error)
    }
  }

  const handleSubmitFazenda = async (data: {
    nome: string
    cidade: string
    estado: string
    areaTotal: number
    areaAgricultavel: number
    areaVegetacao: number
  }) => {
    try {
      await createFarm({
        name: data.nome,
        city: data.cidade,
        state: data.estado,
        totalArea: data.areaTotal,
        arableArea: data.areaAgricultavel,
        vegetationArea: data.areaVegetacao,
        producerId: '', // TODO: Implementar seleção de produtor
      }).unwrap()
      setModalAberto(null)
    } catch (error) {
      console.error('Erro ao criar fazenda:', error)
    }
  }

  const handleSubmitCultura = (data: { nome: string; safraId: string }) => {
    console.log('[v0] Cultura criada:', data)
    setModalAberto(null)
  }

  return (
    <>
      <PageHeader>
        <PageTitle>
          <Text variant="h1" weight="bold">
            Dashboard Agrícola
          </Text>
          <Text color="secondary">
            Gerencie produtores, fazendas e culturas
          </Text>
        </PageTitle>
        <ActionButtons>
          <Button variant="outline" onClick={() => setModalAberto('produtor')}>
            + Produtor
          </Button>
          <Button variant="outline" onClick={() => setModalAberto('fazenda')}>
            + Fazenda
          </Button>
          <Button variant="primary" onClick={() => setModalAberto('cultura')}>
            + Cultura
          </Button>
        </ActionButtons>
      </PageHeader>

      <ContentSection>
        {isFetching ? (
          <div>Carregando dados...</div>
        ) : isError ? (
          <div>Erro ao carregar dados do dashboard</div>
        ) : (
          <>
            <StatsGrid stats={statsData} />

            <ChartsGrid>
              <FarmsByStateChart
                data={dashboardData?.farmsByState}
                title="Fazendas por Estado"
              />
              <FarmsByCultureChart
                data={dashboardData?.farmsByCulture}
                title="Culturas Plantadas"
              />
              <LandUseChart data={dashboardData?.landUse} title="Uso do Solo" />
            </ChartsGrid>
          </>
        )}
      </ContentSection>

      {/* Modais */}
      <Modal
        isOpen={modalAberto === 'produtor'}
        onClose={() => setModalAberto(null)}
        title="Novo Produtor"
      >
        <ProducerForm
          onSubmit={handleSubmitProdutor}
          onCancel={() => setModalAberto(null)}
        />
      </Modal>

      <Modal
        isOpen={modalAberto === 'fazenda'}
        onClose={() => setModalAberto(null)}
        title="Nova Fazenda"
      >
        <FarmForm
          onSubmit={handleSubmitFazenda}
          onCancel={() => setModalAberto(null)}
        />
      </Modal>

      <Modal
        isOpen={modalAberto === 'cultura'}
        onClose={() => setModalAberto(null)}
        title="Nova Cultura"
      >
        <CultureForm
          onSubmit={handleSubmitCultura}
          onCancel={() => setModalAberto(null)}
        />
      </Modal>
    </>
  )
}
