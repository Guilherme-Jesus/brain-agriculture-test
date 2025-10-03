import StatCard, { type StatCardData } from '@/components/molecules/StatCard'
import styled from 'styled-components'

interface StatsGridProps {
  stats: StatCardData[]
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <GridWrapper>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </GridWrapper>
  )
}
