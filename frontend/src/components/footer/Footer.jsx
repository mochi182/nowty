import './Footer.css'
import '../../assets/Buttons.css'
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer>
            <div>
                <p>Nowty 2023</p>
                <p>Created by <a href="#" target="_blank">Frenly Systems Company</a></p>
                <p>
                    <Link to="/" className="overrideLinkStyle customButton outline-primary">Homepage</Link>
                </p>
            </div>
        </footer>
    )
}