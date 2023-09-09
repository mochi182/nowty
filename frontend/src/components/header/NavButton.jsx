import './NavButton.css'
import '../../assets/Buttons.css'

export function NavButton({linkTo, icon, name}) {
    return (
        <a className="overrideLinkStyle light navButton" href={linkTo}>
            <center>
                <div>{icon}</div>
                <small>{name}</small>
            </center>
        </a>
    )
}