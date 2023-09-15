import './Activity.css'

export function Activity({ nombre, descripcion }) {
    return (
        <div id="activitiesContainer">
            <div id="actividad-id" className="actividades">
                <input id="actividad-id" className="hecho-checkbox" type="checkbox" checked="true/false" />
                <p className="actividad-text">{nombre} {descripcion}</p>
            </div>
        </div>
    )
}