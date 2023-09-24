import { AddActivity } from './AddActivity.jsx'
import { Activity } from './Activity.jsx'
import { ResetRoutinesButton } from './ResetRoutinesButton.jsx'
import '../Section.css'
import { useEffect, useState } from 'react'

export function Hoy() {
    const [activities, setActivities] = useState([])
    const URL = 'http://localhost:3000/activities'
    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setActivities(data)
        })
    }, [])

    return (
        <section>
            <AddActivity />

            <div id="activitiesContainer">
                {
                    activities && activities.map(item => (
                        <Activity 
                        key={item.id}
                        {...item}
                        />
                    ))
                }
            </div>

            <center>
                <h5>
                    Notas
                </h5>
            </center>

            <div id="notasContainer">
            </div>

            <center>
                <ResetRoutinesButton />
            </center>
        </section>
    )
}