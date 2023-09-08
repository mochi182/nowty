import { AddActivity } from './AddActivity.jsx'
import { Activity } from './Activity.jsx'
import './Content.css'

export function Hoy() {
    return (
        <section>
            <AddActivity />
            <div id="activitiesContainer">
            <Activity />
            </div>

            <center>
                <h5>
                    Notas
                </h5>
            </center>

            <div id="notasContainer">
            </div>

            <center>
                <button id="resetButton" className="customButton danger">
                    Reset routines
                </button>
            </center>
        </section>
    )
}