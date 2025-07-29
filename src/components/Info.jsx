import { Box, Button, Paper, useTheme } from '@mui/material'
import InfoImg from '../assets/info.webp'

export const Info = () => {
  const theme = useTheme()

  return (
    <Paper
      elevation={1}
      sx={{
        maxWidth: 'md',
        mx: 'auto',
        my: 4,
        p: 4,
        backgroundColor: theme.palette.background.paper, // Sand color
        border: `1px solid ${theme.palette.secondary.main}`, // Khaki border
        borderRadius: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <img src={InfoImg} width={'100%'} style={{ borderRadius: '0.5rem' }} />
        <a href="#products">
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              mt: 2,
              letterSpacing: '0.05em',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            DÉCOUVRIR NOS PRODUITS
          </Button>
        </a>
      </Box>
    </Paper>
  )
}
