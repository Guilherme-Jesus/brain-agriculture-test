import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      primaryDark: string
      primaryLight: string
      secondary: string
      accent: string
      success: string
      warning: string
      error: string
      background: string
      muted: string
      surface: string
      text: {
        primary: string
        secondary: string
        light: string
      }
      border: string
      shadow: string
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    borderRadius: {
      sm: string
      md: string
      lg: string
      xl: string
      full: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
      xxxl: string
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
      wide: string
    }
    sidebar: {
      width: string
      collapsedWidth: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
