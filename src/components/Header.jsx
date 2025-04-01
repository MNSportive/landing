import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Logo from '../mns.svg'
import { FadeInModal } from './Modal'

export const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [aboutOpen, setAboutOpen] = useState(false)
  const [FAQOpen, setFAQOpen] = useState(false)

  const handleAboutClose = () => setAboutOpen(false)
  const handleFAQClose = () => setFAQOpen(false)

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          src={Logo}
          alt="Mayotte Nutrition Sportive"
          sx={{
            height: isMobile ? 40 : 50,
            mr: 2,
          }}
        />

        <Box display="flex" alignItems="center" gap={3}>
          <Button
            onClick={() => setAboutOpen(true)}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'underline',
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark,
              },
            }}
          >
            À propos
          </Button>

          <Button
            onClick={() => setFAQOpen(true)}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '1rem',
              fontFamily: 'Roboto, sans-serif',
              textDecoration: 'underline',
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.dark,
              },
            }}
          >
            FAQ
          </Button>
        </Box>

        <FadeInModal
          handleClose={handleAboutClose}
          open={aboutOpen}
          theme="about"
        />
        <FadeInModal handleClose={handleFAQClose} open={FAQOpen} theme="faq" />
      </Toolbar>
    </AppBar>
  )
}
