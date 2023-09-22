import '../../../assets/Buttons.css'
import '../../../assets/Badge.css'

export function AdminRow({ id, nombre, tipo, descripcion, hecho, es_nota, frecuencia_diaria, frecuencia_horaria, dia, mes, anho, }) {
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
        <button className="customButton success" registro={id}>
            Edit
        </button>
        </td>
        <td>
        <button onClick={(e) => deleteButton(e, id)} className="customButton danger">
            Delete
        </button>
        </td>
    </tr>
  );
}

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

function deleteButton(event) {
    // Show a confirmation dialog
    const confirmation = confirm('Are you sure you want to delete this activity?');

    if (confirmation) {
        const id = event.target.getAttribute('registro');

        // Send a POST request to the server when the delete button is clicked
        fetch('/delete', {
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
                // Reload the page
                window.location.reload();
            })
            .catch(error => {
                console.error('There was a problem deleting the activity:', error);
            });
    }
};