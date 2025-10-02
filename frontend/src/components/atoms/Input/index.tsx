import * as S from './input.styles'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <S.InputWrapper>
      {label && <S.Label>{label}</S.Label>}
      <S.StyledInput $hasError={!!error} {...props} />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.InputWrapper>
  )
}
