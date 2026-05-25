'use client'

import SearchBar from '@/components/ui/SearchBar'
import { useSWRMutationWithDebounce } from '@/hooks/useSWRMutationWithDebounce'
import { OpenMeteoService } from '@/services/OpenMeteoService'
import LocationItem from '@/components/ui/LocationItem'
import List from '@mui/material/List'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Error from '@/components/ui/Error'
import RecentLocationsBar from '@/components/ui/RecentLocationsBar'

export default function SearchCityPage() {
  const { data, error, isMutating, trigger } = useSWRMutationWithDebounce(
    { key: 'cities', count: 15 },
    OpenMeteoService.searchLocation,
    { debounce: 350, onError: console.error },
  )

  function renderError() {
    return <Error error={error ?? 'Something went wrong'} />
  }

  function renderNoResults() {
    return <Error error="No locations found" />
  }

  function renderLocations() {
    return (
      <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        { data?.map(location => <LocationItem key={location.id} location={location} />)}
      </List>
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', height: 56 + 3 }}>
          <SearchBar onSearchChange={trigger} />
          {isMutating && <LinearProgress aria-label="Loading…" sx={{ width: '100%', height: 3 }} />}
        </Box>
        <RecentLocationsBar />
      </Box>

      {!data && !!error && !isMutating && renderError()}
      {data?.length === 0 && !isMutating && renderNoResults()}
      {!!data?.length && renderLocations()}
    </>
  )
}
