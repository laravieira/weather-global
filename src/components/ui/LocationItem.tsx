import { OpenMeteoGeocodingLocation } from '@/types/OpenMeteo'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import {
  FilterHdrOutlined,
  GroupsOutlined,
  PinDropOutlined,
} from '@mui/icons-material'

type LocationItemProps = {
  location: OpenMeteoGeocodingLocation
}

function LocationItem({ location }: LocationItemProps) {
  const region = location.admin1 ? `${location.admin1}, ${location.country}` : location.country

  function renderDetails() {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} title="Region">
          <PinDropOutlined />
          <Typography variant="body2" color="text.secondary">
            {region}
          </Typography>
        </Box>
        {location.population && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} title="Population">
            <GroupsOutlined />
            <Typography variant="body2" color="text.secondary">
              {(location.population / 1000).toFixed(0)}M
            </Typography>
          </Box>
        )}
        {location.elevation && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} title="Altitude">
            <FilterHdrOutlined />
            <Typography variant="body2" color="text.secondary">
              {location.elevation}m
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <ListItemButton
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderRadius: 3,
        gap: 2,
        px: 2,
        border: '1px solid #00000011',
      }}
      href={`/${location.id}/${location.latitude}/${location.longitude}`}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {location.name}
        <Typography variant="caption" color="text.secondary">
          ({location.latitude}, {location.longitude})
        </Typography>
      </Typography>
      {renderDetails()}
    </ListItemButton>
  )
}

export default LocationItem
