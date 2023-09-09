// Get the select element
const filterSelect = document.getElementById('filter');

// Add an event listener to the select element
filterSelect.addEventListener('change', () => {
    const selectedFilter = filterSelect.value; // Get the selected filter value

    // Get all <div> elements with class 'actividades'
    const divs = document.querySelectorAll('.actividades');

    // Loop through each <div> and apply the filter
    divs.forEach((div) => {
        const text = div.textContent; // Get the text content of the <div>

        // Check if the text contains the selected filter
        if (selectedFilter === 'all' || text.includes(selectedFilter)) {
            div.style.display = 'flex'; // Show the <div>
        } else {
            div.style.display = 'none'; // Hide the <div>
        }
    });
});

// Button sends a GET request to the backend to reset the routines
const resetButton = document.querySelector('#resetButton');

async function resetRoutines() {
    fetch('/manualreset', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Routines reset successfully');
        })
        .catch(error => {
            console.error('There was a problem resetting the routines:', error);
        });
}

resetButton.addEventListener('click', async () => {
    await resetRoutines();
    location.reload();
});

// Add an event listener to each checkbox
async function AssignEventListenersToCheckboxes() {
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

// Add an event listener to buttons containing 🗑️ emoji
async function AssignEventListenersToDeleteButtons() {
    const deleteButtons = document.querySelectorAll('button');
    deleteButtons.forEach((button) => {
        if (button.textContent.includes('🗑️')) {
            button.addEventListener('click', () => {
                // Show a confirmation dialog
                const confirmation = confirm('Are you sure you want to delete this activity?');

                if (confirmation) {
                    const id = button.getAttribute('registro');

                    // Send a POST request to the server when the delete button is clicked
                    fetch('/delete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            console.log('Activity deleted successfully');
                            // Reload the page
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error('There was a problem deleting the activity:', error);
                        });
                }
            });
        }
    });
}

function createNotasDivs(notas) {
    const notasDivs = notas.map((nota) => {
        const div = {
            className: 'notas',
            attributes: {
                frecuencia_horaria: nota.frecuencia_horaria,
            },
            children: [
                {
                    tag: 'p',
                    className: 'actividad-text',
                    text: nota.nombre + '\n' + nota.descripcion,
                },
                {
                    tag: 'button',
                    className: 'btn', // Add a white space for multiple classes
                    text: '🗑️',
                    attributes: {
                        registro: nota.id,
                    }
                }
            ]
        };

        if (nota.imagen) {
            div.children.push({
                tag: 'img',
                attributes: {
                    src: 'imgs/' + nota.imagen,
                },
            });
        }
        return div;
    });
    return notasDivs;
}

function createActividadesDivs(actividades) {
    const actividadesDivs = actividades.map((actividad) => {
        const div = {
            className: 'actividades',
            attributes: {
                frecuencia_horaria: actividad.frecuencia_horaria,
            },
            children: [
                {
                    tag: 'input',
                    className: 'hecho-checkbox',
                    attributes: {
                        id: actividad.id,
                        type: 'checkbox',
                        checked: parseInt(actividad.hecho) ? true : false,
                    },
                },
                {
                    tag: 'p',
                    className: 'actividad-text',
                    text: actividad.nombre + '\n' + actividad.descripcion,
                },
                {
                    tag: 'button',
                    className: 'btn',
                    text: '🗑️',
                    attributes: {
                        registro: actividad.id,
                    },
                }
            ]
        };

        // Add an event listener to the button
        const deleteButton = div.children.find(child => child.tag === 'button');
        deleteButton.onClick = function () {
            deleteActivity(nota.id); // Call deleteActivity with the activity's ID
        };

        if (actividad.imagen) {
            div.children.push({
                tag: 'img',
                attributes: {
                    src: actividad.imagen,
                },
            });
        }
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

// Replaces the text inside <p> elements with checkboxes
function replaceTextWithCheckboxes() {
    const actividadTexts = document.querySelectorAll('.actividad-text');

    actividadTexts.forEach((actividadText) => {
        const text = actividadText.textContent;

        if (text.includes("[]")) {
            actividadText.innerHTML = ""
            const textLines = text.split('\n');

            textLines.forEach((textLine) => {

                if (textLine.includes("[]")) {
                    // Trim the text
                    const newTextLine = textLine.replace("[]", "");

                    // Create the checkbox element
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.classList.add("inner-checkbox")

                    // Create the label element and set its text content to the checkbox label
                    const checkboxLabel = document.createElement('label');
                    checkboxLabel.textContent = newTextLine;

                    // Wrap the checkbox and label in a container element
                    const checkboxContainer = document.createElement('div');
                    checkboxContainer.appendChild(checkbox);
                    checkboxContainer.appendChild(checkboxLabel);

                    // Append checkbox to actividadText
                    actividadText.appendChild(checkboxContainer)

                } else {
                    const textLineSpan = document.createElement('span');
                    textLineSpan.innerHTML = textLine + "\n"
                    actividadText.appendChild(textLineSpan)
                }
            })

            // Add an event listener to check the hecho-checkbox if all the checkboxes are checked
            const hechoCheckbox = actividadText.parentElement.querySelector('.hecho-checkbox');
            const checkboxes = Array.from(actividadText.querySelectorAll('.inner-checkbox'));
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', () => {
                    const allChecked = checkboxes.every((checkbox) => checkbox.checked);
                    if (allChecked) {
                        hechoCheckbox.click()
                    }
                });
            });
        }
    });
}

// Render objects with tipo "rutina", "rango" or "puntual"
const actividades = incomingData.filter(obj => obj.es_nota === 0);
const actividadesDivs = sortDivsByFrecuenciaHoraria(createActividadesDivs(actividades));
const renderActividadesPromise = new Promise((resolve, reject) => {
    renderDivElements(actividadesDivs, "actividadesDivs")
    resolve();
});

renderActividadesPromise.then(() => {
    AssignEventListenersToCheckboxes();
    AssignEventListenersToDeleteButtons();
    replaceTextWithCheckboxes();
});

// Render objects with tipo "nota"
const notas = incomingData.filter(obj => obj.es_nota === 1);
const notasDivs = sortDivsByFrecuenciaHoraria(createNotasDivs(notas));
renderDivElements(notasDivs, "notasDivs")

// ---------- COOKIES ----------

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


