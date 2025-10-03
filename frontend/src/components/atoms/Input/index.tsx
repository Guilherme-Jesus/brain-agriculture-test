import { useId } from 'react'
import * as S from './input.styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
  const id = useId()
  const inputId = props.id || id

  return (
    <S.InputWrapper>
      {label && <S.Label htmlFor={inputId}>{label}</S.Label>}
      <S.StyledInput $hasError={!!error} {...props} id={inputId} />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.InputWrapper>
  )
}
