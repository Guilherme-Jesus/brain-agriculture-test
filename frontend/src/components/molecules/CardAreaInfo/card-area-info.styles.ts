import styled from 'styled-components'

export const AreaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const AreaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`

export const AreaIcon = styled.div<{
  $color?: 'default' | 'success' | 'vegetation' | 'warning'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ theme, $color }) => {
    if ($color === 'success') return theme.colors.success + '15'
    if ($color === 'vegetation') return '#10B98115'
    if ($color === 'warning') return theme.colors.warning + '15'
    return theme.colors.primary + '15'
  }};
  color: ${({ theme, $color }) => {
    if ($color === 'success') return theme.colors.success
    if ($color === 'vegetation') return '#10B981'
    if ($color === 'warning') return theme.colors.warning
    return theme.colors.primary
  }};
  flex-shrink: 0;
`

export const AreaDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;

  > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const AreaLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const AreaValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`
