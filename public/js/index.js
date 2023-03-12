// Add an event listener to each checkbox
function AssignEventListenersToCheckboxes(){
  const checkboxes = document.querySelectorAll('.hecho-checkbox');
  checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
          const isChecked = checkbox.checked;
          const id = checkbox.id;
  
          // send a POST request to the server when the checkbox is clicked
          fetch('/done', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id, isChecked })
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  console.log('Checkbox status updated successfully');
              })
              .catch(error => {
                  console.error('There was a problem updating the checkbox status:', error);
              });
      });
  });  
}

function createNotasDivs(notas) {
    const notasDivs = notas.map((nota) => {
      const div = {
        id: nota.id,
        className: 'notas',
        attributes: {
          frecuencia_horaria: nota.frecuencia_horaria,
        },
        children: [
          {
            tag: 'p',
            text: nota.nombre,
          },
          {
            tag: 'p',
            text: nota.descripcion,
          },
        ],
      };
      if (nota.imagen) {
        div.children.push({
          tag: 'img',
          attributes: {
            src: nota.imagen,
          },
        });
      }
      return div;
    });
    return notasDivs;
  }

  function createActividadesDivs(actividades) {
    const actividadesDivs = actividades.map((actividad) => {
      console.log(actividad.hecho)
      const div = {
        id: actividad.id,
        className: 'actividades',
        attributes: {
          frecuencia_horaria: actividad.frecuencia_horaria,
        },
        children: [
          {
            tag: 'p',
            text: actividad.nombre,
          },
          {
            tag: 'p',
            text: actividad.descripcion,
          },
        ],
      };
      if (actividad.imagen) {
        div.children.push({
          tag: 'img',
          attributes: {
            src: actividad.imagen,
          },
        });
      }
      const checkbox = {
        tag: 'input',
        className: 'hecho-checkbox',
        attributes: {
          id: actividad.id,
          type: 'checkbox',
          checked: parseInt(actividad.hecho) ? true : false,
        },
      };
      div.children.push(checkbox);
      return div;
    });
    return actividadesDivs;
  }

  function sortDivsByFrecuenciaHoraria(divs) {
    return divs.sort((a, b) => {
      const aFrecuencia = parseInt(a.attributes.frecuencia_horaria, 2);
      const bFrecuencia = parseInt(b.attributes.frecuencia_horaria, 2);
      return bFrecuencia - aFrecuencia;
    });
  }  

  // loop through the list of objects and render them inside a given section
  function renderDivElements(divElements, sectionId) {
    const section = document.getElementById(sectionId);
    divElements.forEach((divElement) => {
      const div = document.createElement("div");
      div.classList.add(divElement.className);
      if (divElement.frecuencia_horaria) {
        div.setAttribute("data-frecuencia-horaria", divElement.frecuencia_horaria);
      }
      divElement.children.forEach((child) => {
        const element = document.createElement(child.tag);
        if (child.text) {
          element.textContent = child.text;
        }
        if (child.className) {
          element.classList.add(child.className);
        }
        if (child.attributes) {
          for (const [key, value] of Object.entries(child.attributes)) {
            if (key === "checked" && value) {
              element.setAttribute(key, "checked");
            } else if (key !== "checked") {
              element.setAttribute(key, value);
            }
          }
        }
        div.appendChild(element);
      });
      
      section.appendChild(div);
    });
  }  

// Filter objects with tipo equal to "rutina" or "puntual"
const actividades = incomingData.filter(obj => obj.tipo === 'rutina' || obj.tipo === 'puntual');
const actividadesDivs = sortDivsByFrecuenciaHoraria(createActividadesDivs(actividades));
const renderActividadesPromise = new Promise((resolve, reject) => {
  renderDivElements(actividadesDivs, "actividadesDivs")
  resolve();
});

renderActividadesPromise.then(() => {
  AssignEventListenersToCheckboxes();
});

// Filter objects with tipo equal to "nota"
const notas = incomingData.filter(obj => obj.tipo === 'nota');
const notasDivs = sortDivsByFrecuenciaHoraria(createNotasDivs(notas));
renderDivElements(notasDivs, "notasDivs")

function crickey() {
  // Ejecucion con cookies, para cuando implemente ordenar manualmente las filas con drag n drop.
  // Falta arreglarlo
    const notasCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('notas='));
    const actividadesCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('actividades='));
    
    if (notasCookie) {
      const notasJson = notasCookie.split('=')[1];
      const notasDivs = JSON.parse(notasJson);
      
      console.log("COOKIE CARGADO")
      renderDivElements(notasDivs, "notasDivs")

    } else {
        // Filter objects with tipo equal to "nota"
        const notas = incomingData.filter(obj => obj.tipo === 'nota');

        const notasDivs = sortDivsByFrecuenciaHoraria(createNotasDivs(notas));

        // Convert the div lists to JSON format
        const notasJson = JSON.stringify(notasDivs);

        // Set the cookies with the JSON data
        document.cookie = `notas=${notasJson}; max-age=${60 * 60 * 24 * 365}`;

        console.log("COOKIE CREADO")
        renderDivElements(notasDivs, "notasDivs")
    }
    
    if (actividadesCookie) {
      const actividadesJson = actividadesCookie.split('=')[1];
      const actividadesDivs = JSON.parse(actividadesJson);

      console.log("COOKIE CARGADO")
      renderDivElements(actividadesDivs, "actividadesDivs")

    } else {
        // Filter objects with tipo equal to "rutina" or "puntual"
        const actividades = incomingData.filter(obj => obj.tipo === 'rutina' || obj.tipo === 'puntual');

        const actividadesDivs = sortDivsByFrecuenciaHoraria(createActividadesDivs(actividades));

        // Convert the div lists to JSON format
        const actividadesJson = JSON.stringify(actividadesDivs);

        // Set the cookies with the JSON data
        document.cookie = `actividades=${actividadesJson}; max-age=${60 * 60 * 24 * 365}`;

        console.log("COOKIE CREADO")
        renderDivElements(actividadesDivs, "actividadesDivs")
    }
    
    };


