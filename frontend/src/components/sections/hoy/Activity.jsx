import './Activity.css'
import { useEffect, useState } from 'react';

export function Activity({ id, nombre, descripcion, hecho, es_nota }) {
    const [descriptionWithCheckboxes, setDescriptionWithCheckboxes] = useState(descripcion);
    const [checkboxValue, setCheckboxValue] = useState(hecho ? true : false)
    
    useEffect(() => {
        setDescriptionWithCheckboxes(replaceTextWithCheckboxes(descripcion));
    }, [descripcion])
    
    const handleCheckboxClick = () => {
        setCheckboxValue(!checkboxValue)
    }

    useEffect(() => {
        const URL = 'http://localhost:3000/done'
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, isChecked: checkboxValue })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //console.log('Checkbox status updated successfully');
        })
        .catch(error => {
            console.error('There was a problem updating the checkbox status:', error);
        });
    }, [id, checkboxValue])
    
    // Replaces the [] with checkboxes in the description
    const replaceTextWithCheckboxes = (description) => {
        if (!description) {
            return
        }

        let splitDescription = description.split('[]')
        if (splitDescription.length > 1){
            let checkboxes = splitDescription.slice(1, splitDescription.length).map((part, index) => {
                // Checkbox part
                return (
                    <p key={index}>
                    <label>
                    <input 
                    type="checkbox" 
                    className="inner-checkbox" 
                    /> 
                    {part}
                    </label>
                    </p>
                    )}) 
                    checkboxes.unshift(splitDescription[0])
                    return checkboxes
                } else {
                    return description
                }
            }
            
            
            return (
                <>
                    <div className="actividad">
                        <div className="actividadCol1">
                            {!parseInt(es_nota) ? 
                            <input 
                            className="hecho-checkbox" 
                            type="checkbox" 
                            onChange={handleCheckboxClick} 
                            checked={checkboxValue}
                            /> 
                            : <></>}
                        </div>
                        <div className="actividadCol2">
                            <p className="actividadName">{nombre}</p>
                            <p className="descripcion">{descriptionWithCheckboxes}</p>
                        </div>
                    </div>
                </>
                )
            }