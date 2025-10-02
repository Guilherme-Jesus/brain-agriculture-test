import Text from '@/components/atoms/Text'
import {
  FarmsByCultureChart,
  FarmsByStateChart,
  LandUseChart,
} from '@/components/molecules/DashboardChart'
import type { StatCardData } from '@/components/molecules/StatCard'
import { StatsGrid } from '@/components/organisms/StatsGrid'
import { useGetDashboardDataQuery } from '@/store/api/dashboard-api'

import * as S from './dashboard.styles'

export default function DashboardPage() {
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

  return (
    <>
      <S.PageHeader>
        <S.PageTitle>
          <Text variant="h1" weight="bold">
            Dashboard Agrícola
          </Text>
          <Text color="secondary">
            Gerencie produtores, fazendas e culturas
          </Text>
        </S.PageTitle>
      </S.PageHeader>

      <S.ContentSection>
        {isFetching ? (
          <div>Carregando dados...</div>
        ) : isError ? (
          <div>Erro ao carregar dados do dashboard</div>
        ) : (
          <>
            <StatsGrid stats={statsData} />

            <S.ChartsGrid>
              <FarmsByStateChart
                data={dashboardData?.farmsByState}
                title="Fazendas por Estado"
              />
              <FarmsByCultureChart
                data={dashboardData?.farmsByCulture}
                title="Culturas Plantadas"
              />
              <LandUseChart data={dashboardData?.landUse} title="Uso do Solo" />
            </S.ChartsGrid>
          </>
        )}
      </S.ContentSection>
    </>
  )
}
