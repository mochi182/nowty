import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import { Hoy } from './components/hoySection/Hoy.jsx'
import './App.css'

function App() {
  return (
    <div id="appContainer">
        <Header/>
        <Hoy/>
        <Footer/>
    </div>
  )
}

export default App
