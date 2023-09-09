import './Footer.css'
import '../../assets/Buttons.css'

export function Footer() {
    return (
        <footer>
            <div>
                <p>Nowty 2023</p>
                <p>Created by <a href="#" target="_blank">Frenly Systems Company</a></p>
                <p>
                    <a href="/" className="overrideLinkStyle customButton outline-primary">Homepage</a>
                </p>
            </div>
        </footer>
    )
}