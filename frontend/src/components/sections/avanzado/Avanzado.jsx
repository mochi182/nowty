import '../Section.css'
import '../../../assets/Buttons.css'
import { useState } from 'react'

export function Avanzado() {
    const [formData, setFormData] = useState({
        actividad: '',
        esNota: false,
        tipo: '1',
        descripcion: '',
        imagen: '',
        horas: new Array(24).fill(false),
        configuracion: 'por-fecha',
        dias: new Array(7).fill(false),
        dia: '',
        mes: '',
        anho: '',
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleHorasCheckbox = (index) => {
        const newHoras = [...formData.horas];
        newHoras[index] = !newHoras[index];
        setFormData((prevData) => ({
            ...prevData,
            horas: newHoras,
        }));
    };

    const handleDiasCheckbox = (index) => {
        const newDias = [...formData.dias];
        newDias[index] = !newDias[index];
        setFormData((prevData) => ({
            ...prevData,
            dias: newDias,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <section>

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
                        name="actividad"
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
                        name="esNota"
                        id="es-nota"
                        checked={formData.esNota}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="es-nota">
                        ¿Es nota?
                    </label>
                </div>

                <div id="opcionesAvanzadas">

                    <div class="form-group">
                        <label htmlFor="dropdown-select">Tipo:</label>
                        <select
                            id="dropdown-select"
                            className="form-control"
                            name="dropdown-select"
                            defaultValue="1"
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
                            className="form-control"
                            name="descripcion-textarea"
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
                            name="imagen-input"
                        />

                        <button
                            id="select-file-btn"
                            className="btn btn-outline-secondary mt-2 mb-2"
                        >
                            Seleccionar archivo
                        </button>
                    </div>

                    <div className="form-group">
                        <fieldset id="horas-input">
                            <legend>Horas:</legend>
                            <div className="checkbox-group">
                                {  Array.from({length: 24}, (_, i) => i + 1).map(i => {
                                    return(
                                        <div key={i*100} className="checkbox-unit">
                                            <label className="checkbox-container">
                                                <input 
                                                type="checkbox" 
                                                className="horas" 
                                                name="horas-input" 
                                                value={i} 
                                                checked={8 <= i && i <= 16}
                                                />
                                            </label>
                                            <small className="hora-num">
                                                 {i}
                                            </small>
                                        </div>
                                    )
                                })

                                }
                            </div>
                            <button 
                            id="check-all-horas-button" 
                            className="btn btn-outline-secondary mt-2 mb-2"
                            >
                                ✔️ Todos
                            </button>

                            <button 
                            id="uncheck-all-horas-button" 
                            className="btn btn-outline-danger mt-2 mb-2"
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
                        name="date-dropdown"
                        >
                            <option value="por-fecha" selected>Por fecha</option>
                            <option value="por-semana">Por semana</option>
                        </select>
                    </div>

                    <div id="porSemanaInputs">
                        <div className="form-group">
                            <fieldset id="dias-input">
                                <legend>Dias:</legend>
                                <div className="checkbox-group">
                                    { Array.from({length: 24}, (_, i) => i + 1).map(i => {
                                        return (
                                            <div key={i*101} className="checkbox-unit">
                                                <label className="checkbox-container">
                                                    <input type="checkbox" className="dias" name="dias-input" value="<%= i %>" />
                                                </label>
                                                <small className="dia-num time weekday">
                                                    {i}
                                                </small>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <button 
                                id="check-all-dias-button" 
                                className="btn btn-outline-secondary mt-2 mb-2"
                                >
                                    ✔️ Todos
                                    </button>
                                <button 
                                id="uncheck-all-dias-button" 
                                className="btn btn-outline-danger mt-2 mb-2"
                                >⬜ Ninguno
                                </button>
                            </fieldset>
                        </div>
                    </div>

                    <div id="porFechaInputs">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="dia">Día (1-<span id="max-day-of-month"></span>): </label>
                                    <input type="number" id="dia" className="form-control" name="dia" min="1" max="31" required />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="mes">Mes: </label>
                                    <select 
                                    id="mes" 
                                    className="form-control" 
                                    name="mes" 
                                    defaultValue={""} 
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
                                    <input type="number" id="anho" className="form-control" name="anho" min="2023" max="2100" required />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </form>

            <center>
                <button className="btn btn-primary" id="addButton" type="submit">
                    Add
                </button>
                <button className="btn btn-danger" id="clearButton" type="button">
                    Clear
                </button>
            </center>
        </section>
    );
}