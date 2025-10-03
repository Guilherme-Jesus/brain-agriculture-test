import styled from 'styled-components'

export const CardsGrid = styled.div<{ $minCardWidth: string }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ $minCardWidth }) => $minCardWidth}, 1fr)
  );
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
