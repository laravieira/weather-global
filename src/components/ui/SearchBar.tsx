import Box from '@mui/material/Box'
import { WiDaySnow } from 'weather-icons-react'
import TextField from '@mui/material/TextField'

type SearchBarProps = {
  onSearchChange?: (search: string) => void
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <WiDaySnow size={100} color="#000" />
      <TextField
        variant="outlined"
        label="Search a city"
        onChange={event => onSearchChange?.(event.currentTarget.value)}
      />
    </Box>
  )
}

export default SearchBar
