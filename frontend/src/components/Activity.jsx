import './Activity.css'

export function Activity() {
    return (
        <div id="activitiesContainer">
            <div id="actividad-id" className="actividades">
                <input id="actividad-id" className="hecho-checkbox" type="checkbox" checked="true/false" />
                <p className="actividad-text">actividad-nombre actividad-descripcion</p>
            </div>
        </div>
    )
}