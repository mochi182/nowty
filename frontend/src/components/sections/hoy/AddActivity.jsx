import './AddActivity.css'
import '../../../assets/Buttons.css'
import '../../../assets/Forms.css'
import { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function AddActivity() {
    const navigate = useNavigate()
    const now = new Date();
    const [formData, setFormData] = useState({
        activityName: '',
        isNote: 0,
        activityType: 'puntual',
        description: '',
        image: '',
        hours: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        config: 'por-fecha',
        weekdays: new Array(7).fill(0),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    });

    const handleInputChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            activityName: event.target.value
        }))  
    }

    const handleClearButtonClick = () => {
        setFormData('')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        let json = JSON.stringify(formData);

        // Send the POST request
        const URL = `${import.meta.env.VITE_API_URL}/api/insert`
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Data inserted successfully');
            })
            .then(() => {
                navigate(0)
            })
            .catch(error => {
            console.error('There was a problem inserting the data:', error);
            });    
    }

    return (
        <>
            <form 
            id="addForm"
            onSubmit={handleFormSubmit}
            >

                <div className="form-group">
                    <label>Nueva actividad:</label>
                    <input 
                    className="form-control" 
                    type="text" 
                    name="activityName" 
                    value={formData.activityName}
                    onChange={handleInputChange}
                    />
                </div>

            </form>

            <center>
                <button 
                className="customButton primary addActivityButtons" 
                id="addButton" 
                onClick={handleFormSubmit}
                >
                    Add
                </button>

                <button 
                className="customButton 
                danger addActivityButtons" 
                onClick={handleClearButtonClick}
                >
                    Clear
                </button>

                <Link to="avanzado" className="overrideLinkStyle customButton outline-primary addActivityButtons">🚀</Link>
            </center>
        </>
    )
}
