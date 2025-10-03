export const theme = {
  colors: {
    primary: '#10B981',
    primaryDark: '#059669',
    primaryLight: '#34D399',
    secondary: '#F59E0B',
    accent: '#3b82f6',
    success: '#22c55e',
    warning: '#eab308',
    error: '#EF4444',
    danger: '#F87171',
    background: '#ffffff',
    muted: '#f4f4f5',
    surface: '#ffffff',
    text: {
      primary: '#09090b',
      secondary: '#71717a',
      light: '#a1a1aa',
    },
    border: '#e4e4e7',
    shadow: 'rgba(0, 0, 0, 0.05)',
    modalOverlay: 'rgba(0, 0, 0, 0.4)',
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '0.75rem', // 12px
    lg: '1rem', // 16px
    xl: '1.5rem', // 24px
    xxl: '2rem', // 32px
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '1rem',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '0.875rem', // 14px - base menor
    lg: '1rem', // 16px
    xl: '1.125rem', // 18px
    xxl: '1.5rem', // 24px
    xxxl: '1.875rem', // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  sidebar: {
    width: '17rem',
    collapsedWidth: '5rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    xl: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
}

export type Theme = typeof theme
