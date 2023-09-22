import './NavButton.css'
import '../../assets/Buttons.css'
import { Link } from "react-router-dom";

export function NavButton({linkTo, icon, name}) {
    return (
        <Link className="overrideLinkStyle light navButton" to={linkTo}>
            <center>
                <div>{icon}</div>
                <small>{name}</small>
            </center>
        </Link>
    )
}