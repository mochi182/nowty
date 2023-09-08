import './NavButton.css'

export function NavButton({linkTo, icon, name}) {
    return (
        <li className="nav-item">
            <a className="nav-link" href={linkTo}>
                <center>
                    <div>{icon}</div>
                    <small>{name}</small>
                </center>
            </a>
        </li>
    )
}