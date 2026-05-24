import { WiDaySnow } from 'weather-icons-react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

type SearchBarProps = {
  onSearchChange?: (search: string) => void
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  return (
    <TextField
      sx={{ width: '100%' }}
      variant="outlined"
      label="Search a city"
      onChange={event => onSearchChange?.(event.currentTarget.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <WiDaySnow size={36} color="inherit" />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default SearchBar
