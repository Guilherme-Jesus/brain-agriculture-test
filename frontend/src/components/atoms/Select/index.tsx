import { forwardRef } from 'react'
import * as S from './select.styles'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options?: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, children, ...props }, ref) => {
    return (
      <S.SelectWrapper>
        {label && <S.Label>{label}</S.Label>}
        <S.StyledSelect ref={ref} $hasError={!!error} {...props}>
          {options ? (
            <>
              <option value="">Selecione...</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          ) : (
            children
          )}
        </S.StyledSelect>
        {error && <S.ErrorText>{error}</S.ErrorText>}
      </S.SelectWrapper>
    )
  }
)

Select.displayName = 'Select'
