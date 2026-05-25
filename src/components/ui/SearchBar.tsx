'use client'

import { WiDaySnow } from 'weather-icons-react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { InputEvent } from 'react'

type SearchBarProps = {
  onSearchChange?: (search: string) => void
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  function handleSearchChange(event: InputEvent<HTMLInputElement>) {
    const search = (event.target as HTMLInputElement).value
    onSearchChange?.(search)
  }

  return (
    <TextField
      sx={{ width: '100%' }}
      variant="outlined"
      label="Search a city"
      autoFocus
      onInput={handleSearchChange}
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
