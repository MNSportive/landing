import React from 'react'
import { Box, Typography, Paper, Divider, useTheme } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const OrderSuccessMessage = ({ orderId }) => {
  const theme = useTheme()
  const colors = {
    armyGreen: '#4B5320',
    khaki: '#BDB76B',
    sand: '#F4E5C2',
  }

  return (
    <Paper
      elevation={1}
      sx={{
        maxWidth: 'md',
        mx: 'auto',
        my: 4,
        p: 4,
        backgroundColor: theme.palette.secondary.light,
        border: `1px solid ${colors.khaki}`,
        borderRadius: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: colors.armyGreen,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 36, color: 'white' }} />
        </Box>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          mb={1}
          sx={{ color: colors.armyGreen }}
        >
          RENDELES ELKULDVE
        </Typography>
        <Typography variant="body1" mb={3} color="text.secondary">
          Megerkezett a rendelesed, kuldjuk majd az emailt hogy hova kell a sok
          manit utalni. Plusz valami olyan info, hogy a biztonsag kedveert
          irja/screenshotolja a rendelesi szamot hogy megtalaljuk ha van valami
          gaz
        </Typography>
        <Paper
          sx={{
            width: '100%',
            p: 2,
            mb: 3,
            borderLeft: `4px solid ${colors.armyGreen}`,
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontWeight="medium">Order Number:</Typography>
            <Typography>
              <b>{orderId}</b>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="medium">Varhato erkezes:</Typography>
            <Typography>Aprilis 5 (ilyen legyen benne?)</Typography>
          </Box>
        </Paper>
      </Box>
    </Paper>
  )
}
