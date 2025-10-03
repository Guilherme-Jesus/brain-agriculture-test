import type { FormHTMLAttributes, ReactNode } from 'react'
import * as S from './form-wrapper.styles'

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export default function FormWrapper({ children, ...props }: FormWrapperProps) {
  return <S.FormWrapper {...props}>{children}</S.FormWrapper>
}
