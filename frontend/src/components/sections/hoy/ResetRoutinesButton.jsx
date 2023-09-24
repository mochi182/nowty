import '../../../assets/Buttons.css'
import { useNavigate } from 'react-router-dom'

export function ResetRoutinesButton() {
    const url = 'http://localhost:3000/manualreset'
    const navigate = useNavigate()

    const resetRoutines = () => {
        fetch(url, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Routines reset successfully');
        })
        .then(() => {
            navigate(0) // Reloads the page
        })
        .catch(error => {
            console.error('There was a problem resetting the routines:', error);
        });
    }

    return (
        <button id="resetButton" className="customButton danger" onClick={resetRoutines}>
            Reset routines
        </button>
    )
}