import './Activity.css'

export function Activity({ nombre, descripcion, hecho }) {
    return (
        <div id="activitiesContainer">
            <div id="actividad-id" className="actividades">
                <input id="actividad-id" className="hecho-checkbox" type="checkbox" checked={hecho} />
                <p className="actividad-text">{nombre}</p>
                <p>{descripcion}</p>
            </div>
        </div>
    )
}