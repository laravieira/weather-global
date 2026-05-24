import { OpenMeteoService } from '@/services/OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'

export default async function WeatherPage(props: PageProps<'/[latitude]/[longitude]'>) {
  const params = await props.params
  const latitude = Number(params.latitude)
  const longitude = Number(params.longitude)

  if (isNaN(latitude) || isNaN(longitude))
    return <>Error</>

  const data = await OpenMeteoService.weather({
    key: 'weather',
    latitude: [latitude],
    longitude: [longitude],
    current: [
      OpenMeteoForecastCurrentOptions.TEMPERATURE_2M,
      OpenMeteoForecastCurrentOptions.WIND_SPEED_10M,
      OpenMeteoForecastCurrentOptions.WEATHER_CODE,
    ],
  })

  if (data.latitude === undefined || data.longitude === undefined)
    return <>Error</>

  return (
    <div>
      <h1>Weather</h1>
      <p>Latitude: {data.latitude}</p>
      <p>Longitude: {data.longitude}</p>
      <p>Longitude: {data.current?.temperature_2m}</p>
    </div>
  )
}
