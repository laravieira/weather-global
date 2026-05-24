import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { OpenMeteoService } from './OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'

const mockGet: jest.Mock<never> = jest.fn()

jest.mock('@/services/API', () => {
  return jest.fn().mockImplementation(() => ({
    get: mockGet,
  }))
})

describe('OpenMeteoService', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Set environment URIs so the constructor doesn't throw
    OpenMeteoService.setForecastURI('https://api.open-meteo.com/v1/forecast')
    OpenMeteoService.setGeocodingURI('https://geocoding-api.open-meteo.com/v1/search')
  })

  describe('searchCity', () => {
    it('should query the geocoding endpoint and return matching city results', async () => {
      const mockLocationResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          results: [
            {
              id: 3459954,
              name: 'Juiz de Fora',
              latitude: -21.7642,
              longitude: -43.3503,
              elevation: 677,
              feature_code: 'PPL',
              country_code: 'BR',
              timezone: 'America/Sao_Paulo',
              population: 500000,
              country_id: 1,
              country: 'Brazil',
            },
          ],
          generationtime_ms: 0.1,
        },
      }
      mockGet.mockResolvedValueOnce(mockLocationResponse)

      const props = { key: 'search', language: 'pt' }
      const result = await OpenMeteoService.searchCity(props, { arg: 'Juiz de Fora' })

      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining('name=Juiz+de+Fora&key=search&language=pt&count=10&format=json'),
      )
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Juiz de Fora')
    })

    it('should return an empty array if no results are found', async () => {
      mockGet.mockResolvedValueOnce({
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {},
      })

      const result = await OpenMeteoService.searchCity({ key: 'search' }, { arg: 'FakeCity' })
      expect(result).toEqual([])
    })
  })

  describe('weather', () => {
    it('should query the forecast endpoint with coordinates and options parsed to string streams', async () => {
      const mockWeatherResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data: {
          latitude: -21.7642,
          longitude: -43.3503,
          generationtime_milliseconds: 0.1,
          utc_offset_seconds: -10800,
          timezone: 'America/Sao_Paulo',
          timezone_abbreviation: '-03',
          elevation: 677,
          current: {
            time: '2026-05-23T12:00',
            interval: 900,
            temperature_2m: 22.5,
          },
        },
      }
      mockGet.mockResolvedValueOnce(mockWeatherResponse)

      const props = {
        key: 'weather',
        latitude: [-21.7642],
        longitude: [-43.3503],
        current: [
          OpenMeteoForecastCurrentOptions.TEMPERATURE_2M,
          OpenMeteoForecastCurrentOptions.WIND_SPEED_10M,
          OpenMeteoForecastCurrentOptions.WEATHER_CODE,
        ],
      }

      const result = await OpenMeteoService.weather(props)

      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining('current=temperature_2m%2Cwind_speed_10m%2Cweather_code'),
      )
      expect(result.current?.temperature_2m).toBe(22.5)
    })
  })
})
