import {
  OpenMeteoForecastProps,
  OpenMeteoGeocodingLocation,
  OpenMeteoGeocodingLocationResponse,
  OpenMeteoGeocodingProps,
  OpenMeteoWeather,
} from '@/types/OpenMeteo'
import API from '@/services/API'
import { AxiosResponse } from 'axios'
import { KeyDefault } from '@/types/Services'

export class OpenMeteoService {
  private static forecastURI = process.env.NEXT_PUBLIC_OPEN_METEO_FORECAST_ENDPOINT ?? ''
  private static geocodingURI = process.env.NEXT_PUBLIC_OPEN_METEO_GEOCODING_ENDPOINT ?? ''

  static setForecastURI(uri: string) { OpenMeteoService.forecastURI = uri }

  static setGeocodingURI(uri: string) { OpenMeteoService.geocodingURI = uri }

  constructor() {
    if (!OpenMeteoService.forecastURI?.length) throw new Error('OpenMeteo forecast endpoint is not defined')
    if (!OpenMeteoService.geocodingURI?.length) throw new Error('OpenMeteo geocoding endpoint is not defined')
  }

  static async weather(props: KeyDefault<OpenMeteoForecastProps>): Promise<OpenMeteoWeather> {
    const params = Object.entries({
      ...props,
      current: props.current?.join(','),
      hourly: props.hourly?.join(','),
      minutely_15: props.minutely_15?.join(','),
      daily: props.daily?.join(','),
      models: props.models?.join(','),
      start_date: props.time_mode === 'time_interval' ? new Date(props.start_date).toLocaleDateString('en-CA') : undefined,
      end_date: props.time_mode === 'time_interval' ? new Date(props.end_date).toLocaleDateString('en-CA') : undefined,
      csv_coordinates: props.location_mode === 'csv_coordinates'
        ? props.csv_coordinates.map(location => ({
            ...location,
            start_date: location?.start_date ? new Date(location.start_date).toLocaleDateString('en-CA') : undefined,
            end_date: location?.end_date ? new Date(location.end_date).toLocaleDateString('en-CA') : undefined,
          }))
        : undefined,
      format: 'json',
    }).reduce((acc, [key, value]) => (value !== undefined ? { ...acc, [key]: value } : acc), {})

    const query = new URLSearchParams(params)

    return (new API())
      .get(`${OpenMeteoService.forecastURI}?${query.toString()}`)
      .then((response: AxiosResponse<OpenMeteoWeather>) => {
        if (response.status === 200) return response.data
        return Promise.reject(response)
      })
      .catch(error => Promise.reject(API.parseErrorMessage(error)))
  }

  static async searchCity(props: KeyDefault<OpenMeteoGeocodingProps>): Promise<OpenMeteoGeocodingLocation[]> {
    const query = new URLSearchParams({
      ...props,
      count: props.count?.toString() ?? '10',
      format: 'json',
    })

    return (new API())
      .get(`${OpenMeteoService.geocodingURI}?${query.toString()}`)
      .then((response: AxiosResponse<OpenMeteoGeocodingLocationResponse>) => {
        if (Array.isArray(response.data?.results))
          return response.data.results
        if (response.status < 300) return [] as OpenMeteoGeocodingLocation[]
        return Promise.reject(response)
      })
      .catch(error => Promise.reject(API.parseErrorMessage(error)))
  }
}
