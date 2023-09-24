import './Activity.css'
import { useEffect, useState } from 'react';

export function Activity({ id, nombre, descripcion, hecho, es_nota }) {
    const [miniCheckboxValue, setMiniCheckboxValue] = useState(() => {
        let bracketsCount = (JSON.stringify(descripcion).match(/\[\]/g) || []).length
        let initMiniCheckboxes = {}
        for (let i = 0; i < bracketsCount; i++) {
            const miniId = id + "-" + i
            initMiniCheckboxes[miniId] = false
        }
        return initMiniCheckboxes
    })
    const [descriptionWithCheckboxes, setDescriptionWithCheckboxes] = useState(descripcion);
    const [checkboxValue, setCheckboxValue] = useState(hecho ? true : false)
    
    useEffect(() => {
        setDescriptionWithCheckboxes(replaceTextWithCheckboxes(descripcion));
    }, [descripcion])

    const handleMiniCheckboxClick = (event) => {
        const miniId = event.target.id;
        setMiniCheckboxValue((prevMiniCheckboxValue) => ({
            ...prevMiniCheckboxValue,
            [miniId]: !prevMiniCheckboxValue[miniId],
        }));
    };
    
    useEffect(() => {
        //console.log(miniCheckboxValue)
        if (Object.keys(miniCheckboxValue).length != 0) {
            let verify = true
            for (const [key, value] of Object.entries(miniCheckboxValue)) {
                verify = verify && value
            }
            setCheckboxValue(verify ? true : false)
        }
    }, [miniCheckboxValue])

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
    
    const replaceTextWithCheckboxes = (description) => {
        // Activity was submitted without description:
        if (!description) {
          return;
        }
      
        let splitDescription = description.split('[]');
        if (splitDescription.length > 1) {
          let checkboxes = splitDescription.slice(1, splitDescription.length).map((part, index) => {
            const miniId = id + "-" + index;
      
            // Checkbox part wrapped in a div
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    id={miniId}
                    className="inner-checkbox"
                    onChange={(e) => {
                      handleMiniCheckboxClick(e);
                    }}
                  />
                  {part}
                </label>
              </div>
            );
          });
      
          return <div>{checkboxes}</div>;
        } else {
          return description;
        }
      };      
            
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