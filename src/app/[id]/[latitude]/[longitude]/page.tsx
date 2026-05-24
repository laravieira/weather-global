import { OpenMeteoService } from '@/services/OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'
import WeatherPage from '@/app/[id]/_components/WeatherPage'

export default async function Page(props: PageProps<'/[id]/[latitude]/[longitude]'>) {
  const params = await props.params
  const id = Number.parseInt(params.id)
  const latitude = Number.parseFloat(params.latitude)
  const longitude = Number.parseFloat(params.longitude)

  if (isNaN(id) || isNaN(latitude) || isNaN(longitude))
    return <>Error</>

  const promises = await Promise.allSettled([
    OpenMeteoService.location({ key: 'location', location: id }),
    OpenMeteoService.weather({
      key: 'weather',
      latitude: [latitude],
      longitude: [longitude],
      current: [
        OpenMeteoForecastCurrentOptions.TEMPERATURE_2M,
        OpenMeteoForecastCurrentOptions.WIND_SPEED_10M,
        OpenMeteoForecastCurrentOptions.WEATHER_CODE,
      ],
    }),
  ])

  const location = promises[0].status === 'fulfilled' ? promises[0].value : promises[0].reason as string
  const weather = promises[1].status === 'fulfilled' ? promises[1].value : promises[1].reason as string

  if (typeof location === 'string' || typeof weather === 'string')
    return <>Error</>

  return (
    <WeatherPage location={location} weather={weather} />
  )
}
