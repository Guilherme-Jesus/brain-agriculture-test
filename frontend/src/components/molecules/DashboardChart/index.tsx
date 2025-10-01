import PieChart from '@/components/molecules/PieChart'

interface FarmsByStateChartProps {
  data?: { state: string; count: number }[]
  title: string
}

export function FarmsByStateChart({ data, title }: FarmsByStateChartProps) {
  const chartData = data?.map((item) => ({
    name: item.state,
    value: item.count,
  })) || [{ name: 'Sem dados', value: 1 }]

  return <PieChart data={chartData} title={title} />
}

interface FarmsByCultureChartProps {
  data?: { culture: string; count: number }[]
  title: string
}

export function FarmsByCultureChart({ data, title }: FarmsByCultureChartProps) {
  const chartData = data?.map((item) => ({
    name: item.culture,
    value: item.count,
  })) || [{ name: 'Sem dados', value: 1 }]

  return <PieChart data={chartData} title={title} />
}

interface LandUseChartProps {
  data?: { totalArableArea: number; totalVegetationArea: number }
  title: string
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
