import '../../../assets/Buttons.css'

export function ResetRoutinesButton() {
    const url = 'http://localhost:3000/manualreset'
    console.log(url)

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