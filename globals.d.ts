declare module 'weather-icons-react' {
  import * as React from 'react'

  export interface WeatherIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
    color?: string
    title?: string
  }

  export type WeatherIcon = React.FC<WeatherIconProps>

  export const WiDaySnow: WeatherIcon
}
