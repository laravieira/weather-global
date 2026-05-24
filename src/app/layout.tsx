import { ReactNode } from 'react'
import type { Metadata } from 'next'
import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './globals.css'
import Layout from '@/components/Layout'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

export const metadata: Metadata = {
  title: 'Weather Global',
  description: 'Check weather anywhere in the world',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" type="image/png"></link>
        <title>Weather Global</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Layout>
            {children}
          </Layout>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
