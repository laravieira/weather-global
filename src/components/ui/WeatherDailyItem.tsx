import { OpenMeteoWeather } from '@/types/OpenMeteo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import DetailItem from '@/components/ui/DetailItem'
import { WiCloud, WiThermometer, WiThermometerExterior } from 'weather-icons-react'
import { parseWeatherCodeToString } from '@/utils/parseWeatherCodeToString'

type WeatherDailyItemProps = {
  daily: OpenMeteoWeather['daily']
  units: OpenMeteoWeather['daily_units']
  index: number
}

function WeatherDailyItem({ daily, units, index }: WeatherDailyItemProps) {
  const date = new Date(daily?.time?.[index] ?? '')
  const temperature_2m_min = daily?.temperature_2m_min?.[index]
  const temperature_2m_max = daily?.temperature_2m_max?.[index]
  const weather_code = daily?.weather_code?.[index]

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
        <DetailItem icon={WiCloud} title="Weather condition" value={parseWeatherCodeToString(weather_code ?? 0)} />
        <DetailItem icon={WiThermometerExterior} title="Min temperature" value={`${temperature_2m_min}${units?.temperature_2m_min}`} />
        <DetailItem icon={WiThermometer} title="Max temperature" value={`${temperature_2m_max}${units?.temperature_2m_max}`} />
      </Box>
    )
  }

  return (
    <ListItem
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderRadius: 3,
        gap: 2,
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {date.getDate().toFixed().padStart(2, '0')}
        /
        {(date.getMonth() + 1).toString().padStart(2, '0')}
      </Typography>
      {renderDetails()}
    </ListItem>
  )
}

export default WeatherDailyItem
