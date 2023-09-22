import { Footer } from './components/footer/Footer.jsx'
import { Header } from './components/header/Header.jsx'
import './App.css'
import { Outlet} from 'react-router-dom'

function App() {
  return (
    <div id="appContainer">
        <Header/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default App
