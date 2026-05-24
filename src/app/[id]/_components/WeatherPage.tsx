import { OpenMeteoGeocodingLocation, OpenMeteoWeather } from '@/types/OpenMeteo'

type WeatherPagePros = {
  location: OpenMeteoGeocodingLocation
  weather: OpenMeteoWeather
}

async function WeatherPage(props: WeatherPagePros) {
  const { location, weather } = props

  return (
    <div>
      <h1>Weather of {location.name}</h1>
      <p>Latitude: {weather.latitude}</p>
      <p>Longitude: {weather.longitude}</p>
      <p>Longitude: {weather.current?.temperature_2m}</p>
    </div>
  )
}

export default WeatherPage
