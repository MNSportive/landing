import React from 'react'
import { Box, Button, Typography, Paper, useTheme } from '@mui/material'

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
        {/* Logo or icon could go here */}
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          mb={3}
          sx={{
            color: theme.palette.primary.main,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Mayotte Nutrition Sportive
        </Typography>

        <Box
          sx={{
            width: '40px',
            height: '3px',
            backgroundColor: theme.palette.primary.main,
            mb: 3,
          }}
        />

        <Typography
          variant="body1"
          mb={3}
          sx={{
            fontWeight: 500,
            color: theme.palette.primary.dark,
          }}
        >
          Boostez vos performances avec des produits de qualité, livrés
          directement chez vous!
        </Typography>

        <Paper
          sx={{
            width: '100%',
            p: 3,
            mb: 2,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.6}
            background={theme.palette.secondary.light}
          >
            Mayotte Nutrition Sportive distribue sur tout le territoire de
            Mayotte les compléments alimentaires BiotechUSA. Conçus pour
            favoriser une régénération optimale après l'entraînement et soutenir
            l'amélioration des performances, ces produits de haute qualité vous
            accompagnent dans votre quête d'excellence sportive.
          </Typography>
        </Paper>

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
