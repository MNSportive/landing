import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Products } from './components/Products'
import { Info } from './components/Info'
import { Order } from './components/Order'
import { CartProvider } from './contexts/cartContext'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './styles/theme'
import { featureFlags } from './contexts/ff'
import { FeatureFlagProvider, useFeatureFlag } from './contexts/featureContext'
import Alert from '@mui/material/Alert'

function App() {
  const showPrematureContent = useFeatureFlag('prematureContentEnabled')
  const now = new Date()
  const start = new Date('2025-12-15T00:00:00')
  const end = new Date('2026-02-28T00:00:00')

  const showBanner = now >= start && now < end

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FeatureFlagProvider flags={featureFlags}>
        <CartProvider>
          <div className="app-container flex column">
            <Header />
            {showBanner && (
              <Alert severity="info">
                {' '}
                SUPER PROMO DE FÉVRIER ! Dès 150 € d’achat : livraison gratuite,
                un shaker offert, des mueslis offerts, et des échantillons de
                nos produits ! C’est le moment d’en profiter ! Offre valable à
                partir du 1er février, dans la limite des stocks disponibles, et
                au plus tard jusqu’au 28 février.
              </Alert>
            )}
            <main className="flex column">
              <Info />
              <>
                <Products />
                {showPrematureContent && <Order />}
              </>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </FeatureFlagProvider>
    </ThemeProvider>
  )
}

export default App
