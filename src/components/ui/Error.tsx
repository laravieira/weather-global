import Box from '@mui/material/Box'
import { ChevronLeftOutlined, WrongLocationOutlined } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Error({ error, showBackToHome }: { error: string, showBackToHome?: boolean }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 8 }}>
      <WrongLocationOutlined sx={{ width: 64, height: 64 }} />
      <Typography variant="h3">{error}</Typography>
      {showBackToHome && (
        <Button variant="outlined" href="/">
          <ChevronLeftOutlined />
          Back to home
        </Button>
      )}
    </Box>
  )
}

export default Error
