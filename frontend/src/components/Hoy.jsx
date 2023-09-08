import { AddActivity } from './AddActivity.jsx'
import { Activity } from './Activity.jsx'
import './Content.css'

export function Hoy() {
    return (
        <section>
            <AddActivity/>
            <Activity/>
        </section>
    )
}