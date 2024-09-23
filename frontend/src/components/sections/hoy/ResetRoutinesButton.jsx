import '../../../assets/Buttons.css'
import { useNavigate } from 'react-router-dom'

export function ResetRoutinesButton() {
    const URL = `${import.meta.env.VITE_API_URL}/api/manualreset`
    const navigate = useNavigate()

    const resetRoutines = () => {
        fetch(URL, {
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