import './Header.css'
import { NavButton } from './NavButton.jsx'

export function Header() {

    return (
        <header>
            <nav>
                <a href="/" id="nowtyLogo">
                    <center>
                        <div>⏰</div>
                        <b>Nowty</b>
                    </center>
                </a>

                <nav>
                    <NavButton name={'Hoy'} linkTo={'/'} icon={'🌞'} />
                    <NavButton name={'Avanzado'} linkTo={'/avanzado'} icon={'🚀'} />
                    <NavButton name={'Stats.'} linkTo={'/stats'} icon={'📊'} />
                    <NavButton name={'Admin.'} linkTo={'/admin'} icon={'🛢️'} />
                    <NavButton name={'Config.'} linkTo={'/config'} icon={'⚙️'} />
                </nav>
            </nav>
        </header>
    )
}