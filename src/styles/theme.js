import { createTheme } from '@mui/material/styles'

// Military/khaki color palette
const colors = {
  armyGreen: '#4B5320',
  oliveLight: '#6B8E23',
  oliveDeep: '#3A4119',
  khaki: '#BDB76B',
  sand: '#F4E5C2',
  darkKhaki: '#A39A5B',
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.armyGreen,
      light: colors.oliveLight,
      dark: colors.oliveDeep,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.khaki,
      light: colors.sand,
      dark: colors.darkKhaki,
      contrastText: '#333333',
    },
    background: {
      default: '#F5F5F0',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#5F5F5F',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    h3: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Oswald, sans-serif',
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
})

export default theme
