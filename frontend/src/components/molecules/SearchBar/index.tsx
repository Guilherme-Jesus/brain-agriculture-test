import { SearchCodeIcon } from 'lucide-react'
import * as S from './search-bar.styles'
interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export default function SearchBar({
  placeholder = 'Buscar...',
  value,
  onChange,
}: SearchBarProps) {
  return (
    <S.SearchWrapper>
      <S.SearchIcon>
        <SearchCodeIcon size={14} />
      </S.SearchIcon>
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </S.SearchWrapper>
  )
}
