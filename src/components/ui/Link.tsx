'use client'

import NextLink from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

export default function Link(props: MuiLinkProps) {
  return <MuiLink component={NextLink} {...props} />
}
