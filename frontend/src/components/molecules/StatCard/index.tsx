import Card from '@/components/atoms/Card'
import Text from '@/components/atoms/Text'
import {
  Activity,
  BarChart3,
  Calendar,
  DollarSign,
  MapPin,
  Sprout,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  IconWrapper,
  StatCardWrapper,
  StatHeader,
  StatInfo,
  StatValue,
  Trend,
} from './stat-card.styles'

export interface Trend {
  value: number
  isPositive: boolean
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  mapPin: MapPin,
  sprout: Sprout,
  trendingUp: TrendingUp,
  dollarSign: DollarSign,
  barChart: BarChart3,
  activity: Activity,
  calendar: Calendar,
}

export interface StatCardData {
  title: string
  value: string | number
  icon: keyof typeof iconMap
  trend?: Trend
}
export default function StatCard({ title, value, icon, trend }: StatCardData) {
  const IconComponent = iconMap[icon]

  return (
    <Card hover padding="md">
      <StatCardWrapper>
        <StatHeader>
          <StatInfo>
            <Text variant="caption" color="secondary">
              {title}
            </Text>
            <StatValue>{value}</StatValue>
          </StatInfo>
          <IconWrapper>
            <IconComponent size={24} />
          </IconWrapper>
        </StatHeader>
        {trend && (
          <Trend $isPositive={trend.isPositive}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
            <Text variant="caption" color="light">
              vs último mês
            </Text>
          </Trend>
        )}
      </StatCardWrapper>
    </Card>
  )
}
