import { ErrorText, Label, SelectWrapper, StyledSelect } from './select.styles'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export default function Select({
  label,
  error,
  options,
  ...props
}: SelectProps) {
  return (
    <SelectWrapper>
      {label && <Label>{label}</Label>}
      <StyledSelect $hasError={!!error} {...props}>
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorText>{error}</ErrorText>}
    </SelectWrapper>
  )
}
