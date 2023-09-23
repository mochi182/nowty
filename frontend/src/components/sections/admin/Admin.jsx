import '../Section.css'
import { useEffect, useState } from 'react'
import { AdminRow } from './AdminRow.jsx'
import '../../../assets/FormSelect.css'

function filterSelect(event) {
    const selectedFilter = event.target.value; // Get the selected filter emoji

    // Get all table rows in the tbody
    const tableRows = document.querySelectorAll('tbody tr');

    // Loop through each table row and apply the filter
    tableRows.forEach((row) => {
        const nombreCell = row.querySelector('td:nth-child(2)'); // Get the cell with emojis

        // Check if the cell contains the selected filter emoji or if "Todos" is selected
        if (selectedFilter === 'all' || nombreCell.textContent.includes(selectedFilter)) {
            row.style.display = 'table-row'; // Show the table row
        } else {
            row.style.display = 'none'; // Hide the table row
        }
    });
}

export function Admin() {
    const [activities, setActivities] = useState([])
    URL = 'http://localhost:3000/admin_json'
    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setActivities(data)
        })
    }, [])

    return (
        <section id="contentSection">

            <center>
                <select id="filter" className="form-select" onChange={filterSelect}>
                    <option value="all" selected>Todos</option>
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
                        activities.map(item => (
                            <AdminRow 
                            key={item.id}
                            {...item}
                            />
                        ))
                    }
                </tbody>
            </table>

        </section>
    )
}
