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

function App() {
  const showPrematureContent = useFeatureFlag('prematureContentEnabled')
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FeatureFlagProvider flags={featureFlags}>
        <CartProvider>
          <div className="app-container flex column">
            <Header />
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
