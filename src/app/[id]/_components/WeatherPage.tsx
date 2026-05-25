import { OpenMeteoGeocodingLocation, OpenMeteoWeather } from '@/types/OpenMeteo'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { FilterHdrOutlined, GroupsOutlined, PinDropOutlined } from '@mui/icons-material'
import { WiCloud, WiStrongWind } from 'weather-icons-react'
import { parseWeatherCodeToString } from '@/utils/parseWeatherCodeToString'
import DetailItem from '@/components/ui/DetailItem'
import List from '@mui/material/List'
import WeatherDailyItem from '@/components/ui/WeatherDailyItem'
import { Fragment } from 'react'

type WeatherPagePros = {
  location: OpenMeteoGeocodingLocation
  weather: OpenMeteoWeather
}

async function WeatherPage(props: WeatherPagePros) {
  const { location, weather } = props

  function renderHeader() {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="flex-col md:flex-row"
      >
        <Typography variant="h2">
          {location.name}
        </Typography>
        <Divider orientation="vertical" className="hidden md:block" />
        <Typography variant="h1">
          {weather.current?.temperature_2m}
          {weather.current_units?.temperature_2m}
        </Typography>
      </Box>
    )
  }

  function renderDetails() {
    const region = location.admin1 ? `${location.admin1}, ${location.country}` : location.country

    return (
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', marginTop: 2 }}>
        <DetailItem icon={WiStrongWind} title="Wind velocity" value={`${weather.current?.wind_speed_10m}km/h`} />
        <DetailItem icon={WiCloud} title="Weather condition" value={parseWeatherCodeToString(weather.current?.weather_code as number ?? 0)} />

        <DetailItem icon={PinDropOutlined} title="Region" value={region} />
        {location.population && <DetailItem icon={GroupsOutlined} title="Population" value={`${(location.population / 1000).toFixed(0)}M`} />}
        {location.elevation && <DetailItem icon={FilterHdrOutlined} title="Altitude" value={`${location.elevation}m`} />}
      </Box>
    )
  }

  function renderDaily() {
    return (
      <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
        { weather.daily?.time?.map((key, index) => (
          <Fragment key={key}>
            <WeatherDailyItem daily={weather.daily} units={weather.daily_units} index={index} />
            <Divider orientation="horizontal" />
          </Fragment>
        ))}
      </List>
    )
  }

  return (
    <>
      {renderHeader()}
      {renderDetails()}
      {renderDaily()}
    </>
  )
}

export default WeatherPage
