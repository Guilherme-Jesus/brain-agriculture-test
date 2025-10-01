import { SearchCodeIcon } from 'lucide-react'
import { SearchIcon, SearchInput, SearchWrapper } from './search-bar.styles'
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
    <SearchWrapper>
      <SearchIcon>
        <SearchCodeIcon size={14} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </SearchWrapper>
  )
}
