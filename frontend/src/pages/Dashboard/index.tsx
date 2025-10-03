import Text from '@/components/atoms/Text'
import {
  FarmsByCultureChart,
  FarmsByStateChart,
  LandUseChart,
} from '@/components/molecules/DashboardChart'
import type { StatCardData } from '@/components/molecules/StatCard'
import { StatsGrid } from '@/components/organisms/StatsGrid'
import { useGetDashboardDataQuery } from '@/store/api/dashboard-api'
import { LayoutDashboard } from 'lucide-react'

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
        <S.PageTitleWrapper>
          <S.IconWrapper>
            <LayoutDashboard size={32} />
          </S.IconWrapper>
          <S.PageTitle>
            <Text variant="h1" weight="bold">
              Dashboard
            </Text>
            <Text variant="body" color="secondary">
              Visão geral das operações agrícolas
            </Text>
          </S.PageTitle>
        </S.PageTitleWrapper>
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
