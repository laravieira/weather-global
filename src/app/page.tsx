'use client'

import useSWR from 'swr'
import { OpenMeteoService } from '@/services/OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'
import { WiDaySnow } from 'weather-icons-react'
import Typography from '@mui/material/Typography'

export default function Home() {
  const { data: [location] = [] } = useSWR(
    { key: 'search', name: 'Juiz de Fora', language: 'pt' },
    OpenMeteoService.searchCity,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  )
  const { data: weather } = useSWR(
    location?.id
      ? {
          key: 'weather',
          latitude: [location?.latitude],
          longitude: [location?.longitude],
          current: [OpenMeteoForecastCurrentOptions.TEMPERATURE_2M, OpenMeteoForecastCurrentOptions.WIND_SPEED_10M, OpenMeteoForecastCurrentOptions.WEATHER_CODE],
        }
      : null,
    OpenMeteoService.weather,
  )
  console.debug(location, weather)

  return (
    <>
      <WiDaySnow size={300} color="#000" />
      <Typography variant="h1">Search a city</Typography>
      <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
        <li className="mb-2 tracking-[-.01em]">{ location?.name }, {location?.admin1}</li>
        <li className="tracking-[-.01em]">Temperature: { weather?.current?.temperature_2m } { weather?.current_units?.temperature_2m }</li>
      </ol>
    </>
  )
}
