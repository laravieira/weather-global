import { OpenMeteoService } from '@/services/OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'
import WeatherPage from '@/app/[id]/_components/WeatherPage'
import Error from '@/components/ui/Error'

export default async function LocationPage(props: PageProps<'/[id]'>) {
  const params = await props.params
  const id = Number.parseInt(params.id)

  if (isNaN(id)) return <Error error="Invalid link" showBackToHome />

  const location = await OpenMeteoService.location({ key: 'location', location: id })
  if (!location.id) return <Error error="Invalid link" showBackToHome />

  const weather = await OpenMeteoService.weather({
    key: 'weather',
    latitude: [location.latitude],
    longitude: [location.longitude],
    current: [
      OpenMeteoForecastCurrentOptions.TEMPERATURE_2M,
      OpenMeteoForecastCurrentOptions.WIND_SPEED_10M,
      OpenMeteoForecastCurrentOptions.WEATHER_CODE,
    ],
  })
  if (!weather.latitude || !weather.longitude) return <Error error="Invalid link" showBackToHome />

  return (
    <WeatherPage location={location} weather={weather} />
  )
}
