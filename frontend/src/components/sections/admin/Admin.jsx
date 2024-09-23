import '../Section.css'
import { useEffect, useState } from 'react'
import { AdminRow } from './AdminRow.jsx'
import '../../../assets/FormSelect.css'

export function Admin() {
    const [activities, setActivities] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filterActivities = () => {
        return activities.filter((item) => {
          if (selectedFilter === 'all' || item.nombre.includes(selectedFilter)) {
            return true;
          }
          return false;
        });
      };

    useEffect(() => {
        const URL = `${import.meta.env.VITE_API_URL}/api/admindata`
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setActivities(data)
        })
    }, [])

    return (
        <section id="contentSection">

            <center>
                <select 
                id="filter" 
                className="form-select" 
                defaultValue="all" 
                onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="all">Todos</option>
                    <option value="⚒️">⚒️ Daily grind</option>
                    <option value="💪">💪 Fuerza</option>
                    <option value="💻">💻 Programación</option>
                    <option value="🈺">🈺 Proyecto A</option>
                    <option value="🅱️">🅱️ Proyecto B</option>
                    <option value="⚕️">⚕️ Salud</option>
                    <option value="📖">📖 Universidad</option>
                    <option value="⬜">⬜ N/A</option>
                </select>
            </center>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <td>🆔</td>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Hecho</th>
                        <th>Es nota</th>
                        <th>Frecuencia diaria</th>
                        <th>Frecuencia horaria</th>
                        <th>(dd/mm/aaaa)</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterActivities().map((item) => (
                            <AdminRow key={item.id} {...item} />
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}
