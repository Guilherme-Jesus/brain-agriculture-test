import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  type PieLabelRenderProps,
} from 'recharts'
import { ChartTitle, ChartWrapper, COLORS } from './pie-chart.styles'

interface PieChartProps {
  data: { name: string; value: number }[] | undefined
  title: string
}

export default function PieChart({ data, title }: PieChartProps) {
  return (
    <ChartWrapper>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={500}>
        <RechartsPie margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={(props: PieLabelRenderProps) => {
              const { name, percent, x, y, textAnchor } = props
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fill: '#333',
                    textTransform: 'capitalize',
                  }}
                >
                  {`${name ? name.charAt(0).toUpperCase() + name.slice(1) : ''} ${((percent as number) * 100).toFixed(0)}%`}
                </text>
              )
            }}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              value,
              name ? name.charAt(0).toUpperCase() + name.slice(1) : '',
            ]}
            contentStyle={{
              fontSize: 12,
              fontWeight: 600,
              fill: '#333',
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="vertical"
            formatter={(value: string) =>
              value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
            }
            style={{
              fontSize: 12,
              fontWeight: 600,
              fill: '#333',
            }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}
