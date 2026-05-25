import { OpenMeteoGeocodingLocation } from '@/types/OpenMeteo'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import {
  FilterHdrOutlined,
  GroupsOutlined,
  PinDropOutlined,
} from '@mui/icons-material'
import DetailItem from '@/components/ui/DetailItem'
import useRecentLocations from '@/hooks/useRecentLocations'

type LocationItemProps = {
  location: OpenMeteoGeocodingLocation
}

function LocationItem({ location }: LocationItemProps) {
  const region = location.admin1 ? `${location.admin1}, ${location.country}` : location.country
  const { addToRecents } = useRecentLocations()

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
        <DetailItem icon={PinDropOutlined} title="Region" value={region} />
        {location.population && <DetailItem icon={GroupsOutlined} title="Population" value={`${(location.population / 1000).toFixed(0)}M`} />}
        {location.elevation && <DetailItem icon={FilterHdrOutlined} title="Altitude" value={`${location.elevation}m`} />}
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
      onClick={() => addToRecents(location)}
    >
      <Typography
        variant="h6"
        sx={{
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
