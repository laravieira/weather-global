import { ElementType } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type DetailsItemProps = {
  icon: ElementType
  title: string
  value: string
}

function DetailItem(props: DetailsItemProps) {
  const { icon: Icon, title, value } = props

  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }} title={title}>
      <Icon style={{ width: 22, height: 22 }} />
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    </Box>
  )
}

export default DetailItem
