import '../../../assets/Buttons.css'
import '../../../assets/Badge.css'
import { useNavigate } from 'react-router-dom'

export function AdminRow({ id, nombre, tipo, descripcion, hecho, es_nota, frecuencia_diaria, frecuencia_horaria, dia, mes, anho, }) {
    // Hook to reload page
    const navigate = useNavigate()

    // Sends request to delete row
    function deleteButton() {
        // Show a confirmation dialog
        const confirmation = confirm('Are you sure you want to delete this activity?');

        if (confirmation) {
            const deleteURL = 'http://localhost:3000/delete'
            fetch(deleteURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Activity deleted successfully');
            })
            .then(() => {
                navigate(0)
            })
            .catch(error => {
                console.error('There was a problem deleting the activity:', error);
            });
        }
    }

    // Returns a class according to type of activity
    function getTypeClass(tipo) {
        switch (tipo) {
            case 'rutina':
                return 'badge primary';
            case 'rango':
                return 'badge danger';
            case 'puntual':
                return 'badge success';
            default:
                return '';
        }
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <th>
                <p className={`badge ${getTypeClass(tipo)}`}>{tipo}</p>
            </th>
            <td>{descripcion}</td>
            <td>{hecho === 1 ? '🔳' : '⬜'}</td>
            <td>{es_nota === 1 ? '✏️' : ''}</td>
            <td>
                {typeof frecuencia_diaria === 'object'
                    ? ''
                    : frecuencia_diaria.split('').map((x, index) => (
                        <span key={index}>{x === '1' ? '◼️' : '◻️'}</span>
                    ))}
            </td>
            <td>
                {typeof frecuencia_horaria === 'object'
                    ? ''
                    : frecuencia_horaria.split('').map((x, index) => (
                        <span key={index}>{x === '1' ? '❗' : '❕'}</span>
                    ))}
            </td>
            <td>
                {typeof dia === 'object' ? '' : `${dia}/${mes}/${anho}`}
            </td>
            <td>
                <button className="customButton success">
                    Edit
                </button>
            </td>
            <td>
                <button
                    onClick={deleteButton}
                    className="customButton danger">
                    Delete
                </button>
            </td>
        </tr>
    );
}