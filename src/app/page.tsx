'use client'

import SearchBar from '@/components/ui/SearchBar'
import { useSWRMutationWithDebounce } from '@/hooks/useSWRMutationWithDebounce'
import { OpenMeteoService } from '@/services/OpenMeteoService'
import Typography from '@mui/material/Typography'
import { OpenMeteoGeocodingLocation } from '@/types/OpenMeteo'
import Box from '@mui/material/Box'
import Link from '@/components/ui/Link'

export default function SearchCity() {
  const { data, error, isMutating, trigger } = useSWRMutationWithDebounce(
    { key: 'cities' },
    OpenMeteoService.searchCity,
    { debounce: 500 },
  )

  function renderEmpty() {
    return (
      <Typography variant="h3">Search for a city</Typography>
    )
  }

  function renderError() {
    return (
      <Typography variant="h3">Error: {error as string}</Typography>
    )
  }

  function renderLoading() {
    return (
      <Typography variant="h3">Loading</Typography>
    )
  }

  function renderNoResults() {
    return (
      <Typography variant="h3">No Results</Typography>
    )
  }

  function renderLocation(location: OpenMeteoGeocodingLocation) {
    return (
      <Box key={location.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">{location.name}, {location.country}</Typography>
        <Link href={`/${location.latitude}/${location.longitude}`}>Weather</Link>
      </Box>
    )
  }

  return (
    <>
      <SearchBar onSearchChange={trigger} />

      {!data && !error && !isMutating && renderEmpty()}
      {!data && !!error && !isMutating && renderError()}
      {(!data || data.length === 0) && isMutating && renderLoading()}
      {data?.length === 0 && !isMutating && renderNoResults()}
      {!!data?.length && data?.map(renderLocation)}
    </>
  )
}
