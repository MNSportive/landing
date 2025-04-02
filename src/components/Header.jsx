import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Logo from '../mns.svg'
import { FadeInModal } from './Modal'

export const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [modalType, setModalType] = useState(null)

  const handleClose = () => setModalType(null)

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

        <Box
          display="flex"
          alignItems="center"
          gap={isMobile ? 1 : 3}
        >
          {[
            { label: 'À propos', type: 'about' },
            { label: 'FAQ', type: 'faq' },
            { label: 'Infos & Contact', type: 'infos' },
          ].map(({ label, type }) => (
            <Button
              key={type}
              onClick={() => setModalType(type)}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 500,
                textTransform: 'none',
                fontSize: isMobile ? '0.875rem' : '1rem',
                fontFamily: 'Roboto, sans-serif',
                textDecoration: 'underline',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                paddingX: isMobile ? 0.5 : 1,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.dark,
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {modalType && (
          <FadeInModal
            handleClose={handleClose}
            open={!!modalType}
            theme={modalType}
          />
        )}
      </Toolbar>
    </AppBar>
  )
}
