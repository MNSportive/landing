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
  const end = new Date('2026-01-30T00:00:00')

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
                Du 25 décembre au 30 janvier, les livraisons seront suspendues
                en raison des vacances ; vous pouvez toujours passer commande,
                mais veuillez noter que l’expédition ne reprendra qu’après le 30
                janvier. Nous vous remercions de votre compréhension.
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
