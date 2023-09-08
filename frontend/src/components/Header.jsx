import './Header.css'
import { NavButton } from './NavButton.jsx'

export function Header() {

    return (
        <header>
            <nav>
                <a href="/">
                    <center>
                        <div>⏰</div>
                        <b>Nowty</b>
                    </center>
                </a>

                <nav>
                    <NavButton name={'Hoy'} linkTo={'/'} icon={'🌞'} />
                    <NavButton name={'Avanzado'} linkTo={'/advanced'} icon={'🚀'} />
                    <NavButton name={'Stats.'} linkTo={'/stats'} icon={'📊'} />
                    <NavButton name={'Config.'} linkTo={'/config'} icon={'⚙️'} />
                </nav>
            </nav>
        </header>
    )
}