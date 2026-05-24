import { OpenMeteoGeocodingLocation, OpenMeteoWeather } from '@/types/OpenMeteo'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FilterHdrOutlined, GroupsOutlined, PinDropOutlined } from '@mui/icons-material'
import { ElementType } from 'react'
import { WiCloud, WiStrongWind } from 'weather-icons-react'
import { parseWeatherCodeToString } from '@/utils/parseWeatherCodeToString'

type WeatherPagePros = {
  location: OpenMeteoGeocodingLocation
  weather: OpenMeteoWeather
}

async function WeatherPage(props: WeatherPagePros) {
  const { location, weather } = props

  function renderHeader() {
    return (
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2">
          {location.name}
        </Typography>
        <Divider orientation="vertical" />
        <Typography variant="h1">
          {weather.current?.temperature_2m}
          {weather.current_units?.temperature_2m}
        </Typography>
      </Box>
    )
  }
  function renderDetail(Icon: ElementType, title: string, value: string) {
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} title={title}>
        <Icon style={{ width: 22, height: 22 }} />
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      </Box>
    )
  }

  function renderDetails() {
    const region = location.admin1 ? `${location.admin1}, ${location.country}` : location.country

    return (
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', marginTop: 2 }}>
        {renderDetail(WiStrongWind, 'Wind velocity', `${weather.current?.wind_speed_10m}km/h`)}
        {renderDetail(WiCloud, 'Weather condition', parseWeatherCodeToString(weather.current?.weather_code as number ?? 0))}

        {renderDetail(PinDropOutlined, 'Region', region)}
        {location.population && renderDetail(GroupsOutlined, 'Population', `${(location.population / 1000).toFixed(0)}M`)}
        {location.elevation && renderDetail(FilterHdrOutlined, 'Altitude', `${location.elevation}m`)}
      </Box>
    )
  }

  return (
    <>
      {renderHeader()}
      {renderDetails()}
    </>
  )
}

export default WeatherPage
