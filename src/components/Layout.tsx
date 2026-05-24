import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PropsWithChildren } from 'react'
import Link from '@/components/ui/Link'
import Container from '@mui/material/Container'
import Image from 'next/image'

export default function Layout({ children }: PropsWithChildren) {
  function renderBackground() {
    return (
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: -1,
          overflow: 'hidden',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Image
          src="/background.png"
          alt="Forecast background"
          width={689}
          height={360}
          priority
          className="w-full h-full object-cover blur-lg scale-110"
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      </Box>
    )
  }

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
          maxWidth: '100%',
          overflow: 'hidden',
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
      maxWidth="md"
    >
      {renderBackground()}
      {renderContent()}
      {renderFooter()}
    </Container>
  )
}
