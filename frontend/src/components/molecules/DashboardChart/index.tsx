import PieChart from '@/components/molecules/PieChart'
import type { DashboardResponse } from '@/types/dashboard'

interface FarmsByCultureChartProps {
  data?: DashboardResponse['farmsByCulture']
  title: string
}

interface FarmsByStateChartProps {
  data?: DashboardResponse['farmsByState']
  title: string
}
interface LandUseChartProps {
  data?: DashboardResponse['landUse']
  title: string
}

export function FarmsByStateChart({ data, title }: FarmsByStateChartProps) {
  const chartData = data?.map((item) => ({
    name: item.state,
    value: item.count,
  })) || [{ name: 'Sem dados', value: 1 }]

  return <PieChart data={chartData} title={title} />
}

export function FarmsByCultureChart({ data, title }: FarmsByCultureChartProps) {
  const chartData = data?.map((item) => ({
    name: item.culture,
    value: item.count,
  })) || [{ name: 'Sem dados', value: 1 }]

  return <PieChart data={chartData} title={title} />
}

export function LandUseChart({ data, title }: LandUseChartProps) {
  const chartData = data
    ? [
        { name: 'Área Agricultável', value: data.totalArableArea },
        { name: 'Área de Vegetação', value: data.totalVegetationArea },
      ]
    : [{ name: 'Sem dados', value: 1 }]

  return <PieChart data={chartData} title={title} />
}
