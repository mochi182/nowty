import { AddActivity } from './AddActivity.jsx'
import { Activity } from './Activity.jsx'
import { ResetRoutinesButton } from './ResetRoutinesButton.jsx'
import '../Section.css'
import { useEffect, useState } from 'react'

export function Hoy() {
    const [activities, setActivities] = useState([])
    const URL = 'http://localhost:3000/api/activities'
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
                        !item.es_nota ? 
                        <Activity 
                        key={item.id}
                        {...item}
                        />
                        : <></>
                    ))
                }
            </div>

            <center>
                <h3>
                    Notas
                </h3>
            </center>

            <div id="notasContainer">
                {
                    activities && activities.map(item => (
                        item.es_nota ? 
                        <Activity 
                        key={item.id}
                        {...item}
                        />
                        : <></>
                    ))
                }
            </div>

            <br></br>

            <center>
                <ResetRoutinesButton />
            </center>
        </section>
    )
}