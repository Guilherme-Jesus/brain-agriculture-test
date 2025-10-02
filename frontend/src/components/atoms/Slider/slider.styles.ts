import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const ValueDisplay = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1rem;
`

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
`

export const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 0.5rem;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  pointer-events: none;
`

export const SliderFill = styled.div<{ $percentage: number }>`
  position: absolute;
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  transition: width 0.1s ease;
`

export const SliderInput = styled.input<{ $hasError?: boolean }>`
  position: relative;
  width: 100%;
  height: 0.5rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  z-index: 1;

  /* Thumb - Chrome, Safari, Edge */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    background: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(1.05);
    }
  }

  /* Thumb - Firefox */
  &::-moz-range-thumb {
    width: 1.5rem;
    height: 1.5rem;
    background: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(1.05);
    }
  }

  /* Track - Firefox */
  &::-moz-range-track {
    background: transparent;
    border: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &::-webkit-slider-thumb {
      cursor: not-allowed;
      &:hover {
        transform: none;
      }
    }

    &::-moz-range-thumb {
      cursor: not-allowed;
      &:hover {
        transform: none;
      }
    }
  }
`

export const MinMaxLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -0.25rem;
`

export const MinMaxLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-top: -0.25rem;
`
