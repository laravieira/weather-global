'use client'

import Image from 'next/image'
import useSWR from 'swr'
import { OpenMeteoService } from '@/services/OpenMeteoService'
import { OpenMeteoForecastCurrentOptions } from '@/types/OpenMeteo'

export default function Home() {
  const { data: [localtion] = [] } = useSWR(
    { key: 'search', name: 'Juiz de Fora', language: 'pt' },
    OpenMeteoService.searchCity,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  )
  const { data: weather } = useSWR(
    localtion?.id
      ? {
          key: 'weather',
          latitude: [localtion?.latitude],
          longitude: [localtion?.longitude],
          current: [OpenMeteoForecastCurrentOptions.TEMPERATURE_2M, OpenMeteoForecastCurrentOptions.WIND_SPEED_10M, OpenMeteoForecastCurrentOptions.WEATHER_CODE],
        }
      : null,
    OpenMeteoService.weather,
  )
  console.debug(localtion, weather)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">{ localtion?.name }, {localtion?.admin1}</li>
          <li className="tracking-[-.01em]">Temperature: { weather?.current?.temperature_2m } { weather?.current_units?.temperature_2m }</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
