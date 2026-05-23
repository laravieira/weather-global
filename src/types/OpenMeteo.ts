/** This enum is incomplete, add more options as needed
 * Check https://open-meteo.com/en/docs for all options
 */
export enum OpenMeteoForecastCurrentOptions {
  TEMPERATURE_2M = 'temperature_2m',
  WEATHER_CODE = 'weather_code',
  WIND_SPEED_10M = 'wind_speed_10m',
  WIND_DIRECTION_10M = 'wind_direction_10m',
  PRECIPITATION = 'precipitation',
}

/** This enum is incomplete, add more options as needed
 * Check https://open-meteo.com/en/docs for all options
 */
export enum OpenMeteoForecastHourlyOptions {
  TEMPERATURE_2M = 'temperature_2m',
  WEATHER_CODE = 'weather_code',
  WIND_SPEED_10M = 'wind_speed_10m',
  WIND_DIRECTION_10M = 'wind_direction_10m',
  PRECIPITATION = 'precipitation',
}

/** This enum is incomplete, add more options as needed
 * Check https://open-meteo.com/en/docs for all options
 */
export enum OpenMeteoForecastDailyOptions {
  WEATHER_CODE = 'weather_code',
  TEMPERATURE_2M_MIN = 'temperature_2m_min',
  TEMPERATURE_2M_MAX = 'temperature_2m_max',
}

export type OpenMeteoForecastCSVCoordinate = {
  latitude: number
  longitude: number
  elevation?: number
  timezone?: string
  start_date?: Date
  end_date?: Date
}

type LocationMode = {
  location_mode?: never
  latitude: number[]
  longitude: number[]
  timezone?: string
} | {
  location_mode: 'bounding_box'
  bounding_box: number[]
} | {
  location_mode: 'csv_coordinates'
  csv_coordinates: OpenMeteoForecastCSVCoordinate[]
}

type TimeMode = {
  time_mode?: never
  forecast_days?: number
  past_days?: number
} | {
  time_mode: 'time_interval'
  start_date: Date
  end_date: Date
}

export type OpenMeteoForecastProps = {
  current?: OpenMeteoForecastCurrentOptions[]
  hourly?: OpenMeteoForecastHourlyOptions[]
  minutely_15?: string[]
  daily?: OpenMeteoForecastDailyOptions[]
  models?: string[]

  temperature_unit?: 'celsius' | 'fahrenheit'
  wind_speed_unit?: 'kmh' | 'ms' | 'mph' | 'kn'
  precipitation_unit?: 'mm' | 'inch'
  timeformat?: 'iso8601' | 'unixtime'
} & LocationMode & TimeMode

export type OpenMeteoGeocodingProps = {
  name: string
  count?: number
  language?: string
  countryCode?: string
}

export type OpenMeteoWeather = {
  latitude: number
  longitude: number
  generationtime_milliseconds: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number

  current_units?: {
    time: string
    interval: string
    [key: string]: string
  }
  current?: {
    time: string
    interval: number
    [key: string]: number | string
  }

  hourly_units?: {
    time: string
    [key: string]: string
  }
  hourly?: {
    time: string[]
    temperature_2m?: number[]
    relative_humidity_2m?: number[]
    dew_point_2m?: number[]
    apparent_temperature?: number[]
    precipitation_probability?: number[]
    precipitation?: number[]
    rain?: number[]
    showers?: number[]
    snowfall?: number[]
    snow_depth?: number[]
    weather_code?: number[]
    pressure_msl?: number[]
    surface_pressure?: number[]
    cloud_cover?: number[]
    wind_speed_10m?: number[]
    wind_direction_10m?: number[]
    wind_gusts_10m?: number[]
    [key: string]: unknown // Fallback for unspecified custom parameters
  }

  daily_units?: {
    time: string
    [key: string]: string
  }
  daily?: {
    time: string[]
    weather_code?: number[]
    temperature_2m_max?: number[]
    temperature_2m_min?: number[]
    apparent_temperature_max?: number[]
    apparent_temperature_min?: number[]
    sunrise?: string[]
    sunset?: string[]
    uv_index_max?: number[]
    precipitation_sum?: number[]
    rain_sum?: number[]
    showers_sum?: number[]
    snowfall_sum?: number[]
    precipitation_hours?: number[]
    precipitation_probability_max?: number[]
    wind_speed_10m_max?: number[]
    wind_gusts_10m_max?: number[]
    wind_direction_10m_dominant?: number[]
    shortwave_radiation_sum?: number[]
    et0_fao_evapotranspiration?: number[]
    [key: string]: unknown // Fallback for unspecified custom parameters
  }
}

export type OpenMeteoGeocodingLocation = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation: number
  feature_code: string
  country_code: string
  timezone: string
  population: number
  country_id: number
  country: string
  admin1_id?: number
  admin1?: string
  admin2_id?: number
  admin2?: string
  admin3_id?: number
  admin3?: string
  admin4_id?: number
  admin4?: string
}

export type OpenMeteoGeocodingLocationResponse = {
  results: OpenMeteoGeocodingLocation[]
  generationtime_ms: number
}
