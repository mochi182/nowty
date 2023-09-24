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
                    {/* Add more form fields here */}
                </div>
                <center>
                    <button className="btn btn-primary" id="addButton" type="submit">
                        Add
                    </button>
                    <button className="btn btn-danger" id="clearButton" type="button">
                        Clear
                    </button>
                </center>
            </form>
        </section>
    );
}