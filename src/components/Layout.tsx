import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PropsWithChildren } from 'react'
import Link from '@/components/ui/Link'
import Container from '@mui/material/Container'

export default function Layout({ children }: PropsWithChildren) {
  function renderContent() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {children}
      </Box>
    )
  }

  function renderFooter() {
    return (
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography variant="caption">
          Made by
          {' '}
          <Link href="https://laravieira.me" target="_blank" color="inherit">Lara Vieira</Link>
          , check out the
          {' '}
          <Link href="https://github.com/laravieira/weather-global" target="_blank" color="inherit">Github</Link>
          .
        </Typography>
      </Box>
    )
  }

  return (
    <Container
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        gridTemplateColumns: '1fr',
        minHeight: '100vh',
      }}
    >
      {renderContent()}
      {renderFooter()}
    </Container>
  )
}
