import './AddActivity.css'
import '../../../assets/Buttons.css'
import '../../../assets/Forms.css'
import { useState }  from 'react'
import { Link } from 'react-router-dom'

export function AddActivity() {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleClearButtonClick = () => {
        setInputValue('')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        const formData = new FormData();
    
        formData.append('actividad-input', inputValue);
        formData.append('dropdown-select', '1');
        formData.append('descripcion-textarea', '');
        formData.append('imagen-input', '');
        formData.append('dias-input', '');
        
        const horasValues = '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]';
        formData.append('horas-input', horasValues);
        
        formData.append('date-dropdown', 'por-fecha');
    
        formData.append('es-nota', JSON.stringify({"es-nota": 0}));
    
        const currentDate = new Date();
        formData.append('dia', currentDate.getDate().toString());
        formData.append('mes', (currentDate.getMonth() + 1).toString());
        formData.append('anho', currentDate.getFullYear().toString());
        
        // Converts formdata to JSON
        let object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        let json = JSON.stringify(object);

        // Send the POST request
        const URL = 'http://localhost:3000/test'
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
            .catch(error => {
            console.error('There was a problem inserting the data:', error);
            });    
    }

    return (
        <>
            <form id="addForm" className="" onSubmit={handleFormSubmit}>

                <div className="form-group">
                    <label>Nueva actividad:</label>
                    <input 
                    className="form-control" 
                    type="text" 
                    id="actividad-input" 
                    name="actividad-input" 
                    value={inputValue}
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
