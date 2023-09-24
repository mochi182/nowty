import './Header.css'
import { NavButton } from './NavButton.jsx'
import { Link } from "react-router-dom";

export function Header() {

    return (
        <header>
            <nav>
                <Link to="/" id="nowtyLogo">
                    <center>
                        <div>⏰</div>
                        <b>Nowty</b>
                    </center>
                </Link>

                <nav>
                    <NavButton name={'Hoy'} linkTo={'/'} icon={'🌞'} />
                    <NavButton name={'Avanzado'} linkTo={'/avanzado'} icon={'🚀'} />
                    <NavButton name={'Stats.'} linkTo={'/stats'} icon={'📊'} />
                    <NavButton name={'Data'} linkTo={'/admindata'} icon={'🛢️'} />
                    <NavButton name={'Config.'} linkTo={'/config'} icon={'⚙️'} />
                </nav>
            </nav>
        </header>
    )
}