import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Products } from './components/Products'
import { Info } from './components/Info'
import { Order } from './components/Order'
import { CartProvider } from './contexts/cartContext'

const showPrematureContent = true

function App() {
  return (
    <CartProvider>
      <div className="app-container flex column">
        <Header />
        <main className="flex column">
          <Info />
          {showPrematureContent && (
            <>
              <Products />
              <Order />
            </>
          )}
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
