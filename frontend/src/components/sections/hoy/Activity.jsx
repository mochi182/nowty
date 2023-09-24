import './Activity.css'
import { useEffect, useState } from 'react';

export function Activity({ nombre, descripcion, hecho, es_nota }) {
  const [descriptionWithCheckboxes, setDescriptionWithCheckboxes] = useState(descripcion);

  useEffect(() => {
    setDescriptionWithCheckboxes(replaceTextWithCheckboxes(descripcion));
  }, [descripcion]);

  return (
    <div id="activitiesContainer">
      <div id="actividad-id" className="actividades">
        {!parseInt(es_nota) ? <input id="actividad-id" className="hecho-checkbox" type="checkbox" checked={hecho} /> : <></>}
        <p className="actividad-text">{nombre}</p>
        <div className="descripcion">{descriptionWithCheckboxes}</div>

      </div>
    </div>
  );
}

// Replaces the [] with checkboxes in the description
function replaceTextWithCheckboxes(description) {
    let splitDescription = description.split('[]')
    if (splitDescription.length > 1){
        let checkboxes = splitDescription.slice(1, splitDescription.length).map((part, index) => {
            // Checkbox part
            return (
              <label key={index}>
                <input type="checkbox" className="inner-checkbox" /> {part}
              </label>
            )}) 
        checkboxes.unshift(splitDescription[0])
        return checkboxes
    } else {
        return description
    }
}
