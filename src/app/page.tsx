'use client'

import SearchBar from '@/components/ui/SearchBar'
import { useSWRMutationWithDebounce } from '@/hooks/useSWRMutationWithDebounce'
import { OpenMeteoService } from '@/services/OpenMeteoService'
import Typography from '@mui/material/Typography'
import LocationItem from '@/components/ui/LocationItem'
import List from '@mui/material/List'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { WrongLocationOutlined } from '@mui/icons-material'
import Error from '@/components/ui/Error'

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
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 8 }}>
        <WrongLocationOutlined sx={{ width: 64, height: 64 }} />
        <Typography variant="h3">No locations found</Typography>
      </Box>
    )
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
      <Box sx={{ width: '100%', height: 56 + 3 }}>
        <SearchBar onSearchChange={trigger} />
        {isMutating && <LinearProgress aria-label="Loading…" sx={{ width: '100%', height: 3 }} />}
      </Box>

      {!data && !!error && !isMutating && renderError()}
      {data?.length === 0 && !isMutating && renderNoResults()}
      {!!data?.length && renderLocations()}
    </>
  )
}
