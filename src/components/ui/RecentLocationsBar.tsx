'use client'
import Box from '@mui/material/Box'
import useRecentLocations, { RecentLocation } from '@/hooks/useRecentLocations'
import Chip from '@mui/material/Chip'
import { ClearOutlined } from '@mui/icons-material'

function RecentLocationsBar() {
  const { recents, removeFromRecents } = useRecentLocations()

  function renderRecent(location: RecentLocation) {
    return (
      <Chip
        key={location.id}
        label={location.name}
        variant="filled"
        onDelete={(event) => {
          event.preventDefault()
          event.stopPropagation()
          removeFromRecents(location.id)
        }}
        deleteIcon={<ClearOutlined />}
        component="a"
        href={`/${location.id}/${location.latitude}/${location.longitude}`}
        clickable
      />
    )
  }

  return recents.length > 0 && (
    <Box sx={{ width: '100%', gap: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: 1 }}>
      {recents.map(renderRecent)}
    </Box>
  )
}

export default RecentLocationsBar
