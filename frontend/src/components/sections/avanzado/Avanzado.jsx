import '../Section.css'
import '../../../assets/Buttons.css'
import '../../../assets/Forms.css'
import './Avanzado.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Avanzado() {
    const navigate = useNavigate()
    const now = new Date();
    const [mouseDown, setMouseDown] = useState(false)
    const [formData, setFormData] = useState({
        activityName: '',
        isNote: 0,
        activityType: 'rutina',
        description: '',
        image: '',
        hours: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
        config: 'por-semana',
        weekdays: new Array(7).fill(0),
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: '',
    });

    useEffect(() => {
        const handleMouseUp = () => {
          setMouseDown(false);
        };
        document.addEventListener('mouseup', handleMouseUp);
        // Cleanup: Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Generic change handler (text / checkbox)
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTypeSelect = (event) => {
        const now = new Date();
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            activityType: value,
            year: value == 'rutina' ? '' : (formData.year == '' ? now.getFullYear() : formData.year),
            config: value == 'puntual' || value == 'rango' ? 'por-fecha' : formData.config
        }));
    };

    const handleCheckboxMouseEnter = (event) => {
        setMouseDown(true)
        const { name, value } = event.target;
        const index = value - 1
        const newValues = [...formData[name]]
        newValues[index] = 1 - newValues[index]
        setFormData((prevData) => ({
            ...prevData,
            [name]: newValues,
        }))
    }

    const handleCheckboxMouseOver = (event) => {
        if (mouseDown) {
            const { name, value } = event.target;
            const index = value - 1
            const newValues = [...formData[name]]
            newValues[index] = 1 - newValues[index]
            setFormData((prevData) => ({
                ...prevData,
                [name]: newValues,
            }))
        }
    }

    const handleSelectAllHours = (event) => {
        event.preventDefault()
        const newHours = new Array(24).fill(1)
        setFormData((prevData) => ({
            ...prevData,
            hours: newHours
        }))
    }

    const handleSelectNoHours = (event) => {
        event.preventDefault()
        const newHours = new Array(24).fill(0)
        setFormData((prevData) => ({
            ...prevData,
            hours: newHours
        }))
    }

    const handleSelectAllWeekdays = (event) => {
        event.preventDefault()
        const newDays = new Array(7).fill(1)
        setFormData((prevData) => ({
            ...prevData,
            weekdays: newDays,
        }))
    }

    const handleSelectNoWeekdays = (event) => {
        event.preventDefault()
        const newDays = new Array(7).fill(0)
        setFormData((prevData) => ({
            ...prevData,
            weekdays: newDays,
        }))
    }

    const addClassesToHours = (i) => {
        const classList = ["time"]
        const hour = i + 1
        if (hour >= 1 && hour <= 6 || hour >= 18 && hour <= 24) {
            classList.push('dark');
        } else if (hour === 7 || hour === 17) {
            classList.push('semilight');
        } else if (hour >= 8 && hour <= 16) {
            classList.push('light');
        }
        return classList.join(' ')
    }

    const convertTo12HourClock = (i) => {   
        const hour = i + 1 
        const ampm = hour < 12 ? 'AM' : 'PM';
        const convertedHour = hour % 12 || 12;
        return `${convertedHour} ${ampm}`;
    }

    const convertToSpanishWeekdays = (i) => {      
        const weekdays = [
          'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
        ];
        return weekdays[i]
      }

      const getMaxDayOfMonth = (selectedMonth) => {
        let maxDay = 31;
        if (selectedMonth === 4 || selectedMonth === 6 || selectedMonth === 9 || selectedMonth === 11) {
            maxDay = 30;
        } else if (selectedMonth === 2) {
            const year = new Date().getFullYear();
            maxDay = year % 4 === 0 ? 29 : 28;
        }
        return maxDay;
    }

    const getCurrentYear = () => {
        const currentYear = new Date().getFullYear();
        return currentYear.toString();
    }

    const getSemanaInputsDisplay = () => {
        const display = formData.config == "por-semana" ? "block" : "none"
        return {display: display}
    }

    const getFechaInputsDisplay = () => {
        const display = formData.config == "por-fecha" ? "block" : "none"
        return {display: display}
    }

    const handleClearButton = () => {
        const confirmation = window.confirm("Clear all fields?")
        if (confirmation) {
            setFormData({
                activityName: '',
                isNote: false,
                activityType: "rutina",
                description: '',
                image: '',
                hours: new Array(24).fill(false),
                config: 'por-semana',
                weekdays: new Array(7).fill(false),
                day: now.getDate(),
                month: now.getMonth() + 1,
                year: '',
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = true // validateForm(addForm);
    
        if (!isValid) {
            alert("Form inválido, revisa los datos ingresados.")
            return;
        }

        // Converts formdata to JSON
        let json = JSON.stringify(formData);
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
        <section>
            <form 
            id="addForm" 
            className="form-style"
            onSubmit={(e) => {e.preventDefault()}}
            >
                <center>
                    <h3>Avanzado</h3>
                </center>

                <div className="form-group">
                    <label htmlFor="actividad-input">Nombre de la actividad:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="actividad-input"
                        name="activityName"
                        value={formData.activityName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="1"
                        name="isNote"
                        id="es-nota"
                        checked={formData.isNote}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="es-nota">
                        ¿Es nota?
                    </label>
                </div>

                <div id="opcionesAvanzadas">

                    <div className="form-group">
                        <label htmlFor="dropdown-select">Tipo:</label>
                        <select
                            id="dropdown-select"
                            className="form-control"
                            name="activityType"
                            onChange={handleTypeSelect} 
                            value={formData.activityType}
                        >
                            <option value="rutina">Rutina</option>
                            <option value="puntual">Puntual</option>
                            <option value="rango">Rango</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion-textarea">Descripción:</label>
                        <textarea
                            id="descripcion-textarea"
                            className="custom-textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imagen-input">Imagen: </label>
                        <input
                            type="file"
                            className="bootstrappy-image-button"
                            id="imagen-input"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <fieldset id="horas-input">
                            <legend>Horas:</legend>
                            <div className="checkbox-group">
                                {  [...Array(24).keys()].map(i => {
                                    return(
                                        <div key={i*100} className="checkbox-unit">
                                            <label className="checkbox-container">
                                                <input 
                                                type="checkbox" 
                                                className="horas" 
                                                name="hours" 
                                                value={i + 1} 
                                                checked={formData.hours[i]}
                                                onClick={(event) => {event.preventDefault()}}
                                                onMouseDown={handleCheckboxMouseEnter} 
                                                onMouseEnter={handleCheckboxMouseOver}
                                                />
                                            </label>
                                            <small className={addClassesToHours(i)}>
                                                 {convertTo12HourClock(i)}
                                            </small>
                                        </div>
                                    )
                                })

                                }
                            </div>
                            
                            <button 
                            id="check-all-horas-button" 
                            className="customButton outline-secondary btnMargin" 
                            onClick={handleSelectAllHours}
                            >
                                ✔️ Todos
                            </button>

                            <button 
                            id="uncheck-all-horas-button" 
                            className="customButton outline-danger btnMargin" 
                            onClick={handleSelectNoHours}
                            >
                                ⬜ Ninguno
                            </button>
                            
                        </fieldset>
                    </div>

                    <br></br>

                    <div className="date-config form-group">
                        <label htmlFor="date-dropdown">Configuración:</label>
                        <select 
                        id="date-dropdown" 
                        className="form-control" 
                        name="config" 
                        onChange={handleChange}
                        value={formData.config} 
                        disabled={formData.activityType == "puntual" || formData.activityType == "rango" ? true : false}
                        >
                            <option value="por-semana">Por semana</option>
                            <option value="por-fecha" selected>Por fecha</option>
                        </select>
                    </div>

                    <div 
                    id="porSemanaInputs"
                    style={getSemanaInputsDisplay()}
                    >
                        <div className="form-group">
                            <fieldset id="dias-input">
                                <legend>Dias:</legend>
                                <div className="checkbox-group">
                                    { [...Array(7).keys()].map(i => {
                                        return (
                                            <div key={i*101} className="checkbox-unit">
                                                <label className="checkbox-container">
                                                    <input 
                                                    type="checkbox" 
                                                    className="dias" 
                                                    name="weekdays" 
                                                    value={i + 1} 
                                                    checked={formData.weekdays[i]}  
                                                    onClick={(event) => {event.preventDefault()}}
                                                    onMouseDown={handleCheckboxMouseEnter} 
                                                    onMouseEnter={handleCheckboxMouseOver}
                                                    />
                                                </label>
                                                <small className="dia-num time weekday">
                                                    {convertToSpanishWeekdays(i)}
                                                </small>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <button 
                                id="check-all-dias-button" 
                                className="customButton outline-secondary btnMargin"
                                onClick={handleSelectAllWeekdays}
                                >
                                    ✔️ Todos
                                </button>

                                <button 
                                id="uncheck-all-dias-button" 
                                className="customButton outline-danger btnMargin" 
                                onClick={handleSelectNoWeekdays}
                                >
                                    ⬜ Ninguno
                                </button>
                            </fieldset>
                        </div>
                    </div>

                    <div 
                    id="porFechaInputs" 
                    style={getFechaInputsDisplay()}
                    >
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="dia">Día (1-<span>{getMaxDayOfMonth(formData.month)}</span>): </label>
                                    <input 
                                    type="number" 
                                    id="dia" 
                                    className="form-control" 
                                    name="day" 
                                    min="1" 
                                    max={getMaxDayOfMonth(formData.month)} 
                                    onChange={handleChange}
                                    value={formData.day}
                                    required={formData.activityType == "puntual" ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="mes">Mes: </label>
                                    <select 
                                    id="mes" 
                                    className="form-control" 
                                    name="month" 
                                    onChange={handleChange} 
                                    value={formData.month}
                                    required={formData.activityType == "puntual" ? true : false}
                                    >
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="anho">Año (<span>{getCurrentYear()}</span>-2100): </label>
                                    <input 
                                    type="number" 
                                    id="anho" 
                                    className="form-control" 
                                    name="year" 
                                    min={getCurrentYear()} 
                                    max="2100" 
                                    onChange={handleChange}
                                    value={formData.year}
                                    required={formData.activityType == "puntual" ? true : false} 
                                    disabled={formData.activityType == "rutina" ? true : false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

            <center>
                <button 
                className="customButton primary btnMargin" 
                id="addButton"
                onClick={handleSubmit}
                >
                    Add
                </button>
                <button 
                className="customButton danger btnMargin" 
                id="clearButton" 
                type="button"
                onClick={handleClearButton}
                >
                    Clear
                </button>
            </center>
        </section>
    );
}