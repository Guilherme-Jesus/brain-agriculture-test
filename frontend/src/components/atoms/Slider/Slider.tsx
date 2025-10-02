import { forwardRef } from 'react'
import * as S from './slider.styles'

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  min?: number
  max?: number
  step?: number
  unit?: string
  showValue?: boolean
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      error,
      min = 0,
      max = 1000,
      step = 10,
      unit = 'ha',
      showValue = true,
      value,
      ...props
    },
    ref
  ) => {
    const currentValue = value || min
    const percentage = ((Number(currentValue) - min) / (max - min)) * 100

    return (
      <S.Container>
        {label && (
          <S.LabelContainer>
            <S.Label>{label}</S.Label>
            {showValue && (
              <S.ValueDisplay>
                {currentValue} {unit}
              </S.ValueDisplay>
            )}
          </S.LabelContainer>
        )}

        <S.SliderWrapper>
          <S.SliderTrack>
            <S.SliderFill $percentage={percentage} />
          </S.SliderTrack>

          <S.SliderInput
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            $hasError={!!error}
            {...props}
          />
        </S.SliderWrapper>

        <S.MinMaxLabels>
          <S.MinMaxLabel>
            {min} {unit}
          </S.MinMaxLabel>
          <S.MinMaxLabel>
            {max} {unit}
          </S.MinMaxLabel>
        </S.MinMaxLabels>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Container>
    )
  }
)

Slider.displayName = 'Slider'
