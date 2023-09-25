import '../Section.css'
import '../../../assets/Buttons.css'
import '../../../assets/Forms.css'
import { useState } from 'react'

export function Avanzado() {
    const [formData, setFormData] = useState({
        activity: '',
        isNote: false,
        type: '1',
        description: '',
        image: '',
        hours: new Array(24).fill(false),
        config: 'por-semana',
        weekdays: new Array(7).fill(false),
        day: '',
        month: '',
        year: '',
    });

    // Generic change handler (text / checkbox)
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleHoursChange = (event) => {
        const index = event.target.value - 1;
        const newHours = [...formData.hours];
        newHours[index] = !newHours[index];
        setFormData((prevData) => ({
            ...prevData,
            hours: newHours,
        }));
    };

    const handleWeekdaysChange = (event) => {
        const index = event.target.value - 1;
        const newDays = [...formData.weekdays];
        newDays[index] = !newDays[index];
        setFormData((prevData) => ({
            ...prevData,
            weekdays: newDays,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    const logForm = () => {
        console.log(formData)
    }

    return (
        <section>

            <button onClick={logForm}>Clickee</button>

            <form id="addForm" className="form-style" onSubmit={handleSubmit}>
                <center>
                    <h5>Nueva actividad</h5>
                </center>

                <div className="form-group">
                    <label htmlFor="actividad-input">Nombre de la actividad:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="actividad-input"
                        name="activity"
                        value={formData.actividad}
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
                        checked={formData.esNota}
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
                            name="type"
                            defaultValue="1"
                            onChange={handleChange} 
                            value={formData.tipo}
                        >
                            <option value="1">Puntual</option>
                            <option value="2">Rutina</option>
                            <option value="3">Rango</option>
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
                        <label htmlFor="imagen-input">Imagen:</label>
                        <input
                            readOnly
                            type="text"
                            className="form-control"
                            id="imagen-input"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />

                        <button
                            id="select-file-btn"
                            className="customButton outline-secondary btnMargin"
                            onClick={() => {}}
                        >
                            Seleccionar archivo
                        </button>
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
                                                onChange={handleHoursChange}
                                                />
                                            </label>
                                            <small className="hora-num">
                                                 {i+1}
                                            </small>
                                        </div>
                                    )
                                })

                                }
                            </div>
                            <button 
                            id="check-all-horas-button" 
                            className="customButton outline-secondary btnMargin"
                            >
                                ✔️ Todos
                            </button>

                            <button 
                            id="uncheck-all-horas-button" 
                            className="customButton outline-danger btnMargin"
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
                        >
                            <option value="por-semana">Por semana</option>
                            <option value="por-fecha" selected>Por fecha</option>
                        </select>
                    </div>

                    <div id="porSemanaInputs">
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
                                                    onChange={handleWeekdaysChange} 
                                                    />
                                                </label>
                                                <small className="dia-num time weekday">
                                                    {i + 1}
                                                </small>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <button 
                                id="check-all-dias-button" 
                                className="customButton outline-secondary btnMargin"
                                >
                                    ✔️ Todos
                                </button>

                                <button 
                                id="uncheck-all-dias-button" 
                                className="customButton outline-danger btnMargin"
                                >
                                    ⬜ Ninguno
                                </button>
                            </fieldset>
                        </div>
                    </div>

                    <div id="porFechaInputs">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="dia">Día (1-<span id="max-day-of-month"></span>): </label>
                                    <input 
                                    type="number" 
                                    id="dia" 
                                    className="form-control" 
                                    name="day" 
                                    min="1" 
                                    max="31" 
                                    onChange={handleChange}
                                    value={formData.day}
                                    required 
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
                                    value={formData.mes}
                                    required>
                                        <option value=""></option>
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
                                    <label htmlFor="anho">Año (<span id="anho-actual"></span>-2100): </label>
                                    <input 
                                    type="number" 
                                    id="anho" 
                                    className="form-control" 
                                    name="year" 
                                    min="2023" 
                                    max="2100" 
                                    onChange={handleChange}
                                    value={formData.year}
                                    required 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

            <center>
                <button className="customButton primary btnMargin" id="addButton" type="submit">
                    Add
                </button>
                <button className="customButton danger btnMargin" id="clearButton" type="button">
                    Clear
                </button>
            </center>
        </section>
    );
}