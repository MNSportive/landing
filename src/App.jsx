import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Products } from './components/Products'
import { Info } from './components/Info'
import { Order } from './components/Order'

function App() {
  return (
    <div className="app-container flex column">
      <Header />
      <main className="flex column">
        <Info />
        <Products />
        <Order />
      </main>
      <Footer />
    </div>
  )
}

export default App
