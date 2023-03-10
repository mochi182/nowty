
// accordion for advanced options
const accordionBtn = document.querySelector('.accordion-btn');
const opcionesAvanzadas = document.querySelector('#opcionesAvanzadas');

// add click event listener to the accordion button
accordionBtn.addEventListener('click', function () {
    // toggle the active class on the accordion button
    this.classList.toggle('active');
    // toggle the display of the opcionesAvanzadas div
    if (opcionesAvanzadas.style.display === 'block') {
        opcionesAvanzadas.style.display = 'none';
    } else {
        opcionesAvanzadas.style.display = 'block';
    }
});

const dateDropdown = document.getElementById("date-dropdown");
const porSemanaDiv = document.getElementById("porSemanaInputs");
const porFechaDiv = document.getElementById("porFechaInputs");

// add event listener to the date dropdown
dateDropdown.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "por-semana") {
        // show the por-semana div and hide the por-fecha div
        porSemanaDiv.style.display = "block";
        porFechaDiv.style.display = "none";
    } else if (selectedValue === "por-fecha") {
        // show the por-fecha div and hide the por-semana div
        porSemanaDiv.style.display = "none";
        porFechaDiv.style.display = "block";
    }
});


//  checks if the selected value of "dropdown-select" is "actividad".
// If it is, it sets the value of "date-dropdown" to "por-fecha" and disables it.

function selectActividad() {
    var event = new Event('change');
    var dropdownSelect = document.getElementById("dropdown-select");
    var dateDropdown = document.getElementById("date-dropdown");

    if (dropdownSelect.value === "actividad") {
        dateDropdown.value = "por-fecha";
        dateDropdown.dispatchEvent(event);
        dateDropdown.disabled = true;
    } else {
        dateDropdown.disabled = false;
    }
}

// Call the function on page load and whenever the dropdown is changed
selectActividad();
document.getElementById("dropdown-select").addEventListener("change", selectActividad);


// checks if the selected value of "dropdown-select" is "rutina".
// If it is, it clears the value of the "anho" input and disables it.
function disableAnhoInput() {
    var event = new Event('change');
    var dropdownSelect = document.getElementById("dropdown-select");
    var anhoInput = document.getElementById("anho");

    if (dropdownSelect.value === "rutina") {
        anhoInput.value = "";
        anhoInput.disabled = true;
    } else {
        anhoInput.disabled = false;
    }
}

// Call the function on page load and whenever the dropdown is changed
disableAnhoInput();
document.getElementById("dropdown-select").addEventListener("change", disableAnhoInput);

// Clears all inputs, textareas and checkboxes. Reverts selects to default.
var clearButton = document.querySelector(".btn-danger");

async function clearInputs(){
    var inputs = document.querySelectorAll("input");
    var checkboxes = document.querySelectorAll("input[type=checkbox]:not(.hecho-checkbox)");
    var textareas = document.querySelectorAll("textarea");
    var selects = document.querySelectorAll("select");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    for (var j = 0; j < checkboxes.length; j++) {
        checkboxes[j].checked = false;
    }

    for (var k = 0; k < textareas.length; k++) {
        textareas[k].value = "";
    }

    for (var l = 0; l < selects.length; l++) {
        selects[l].selectedIndex = 0;
        var event = new Event('change');
        selects[l].dispatchEvent(event);
    }
}

clearButton.addEventListener("click", function () {
    clearInputs()
    fillDateInputs()
});

// When a new option is selected, the value of the dropdown-select element is checked and the text of the texto-entidad element is updated accordingly.
var dropdownSelect = document.querySelector("#dropdown-select");
var textoEntidad = document.querySelector("#texto-entidad");

dropdownSelect.addEventListener("change", function () {
    var selectedValue = dropdownSelect.value;

    if (selectedValue === "actividad") {
        textoEntidad.textContent = "actividad";
    } else if (selectedValue === "rutina") {
        textoEntidad.textContent = "rutina";
    } else if (selectedValue === "nota") {
        textoEntidad.textContent = "nota";
    }
});

// When mouse drags around checkboxes, check or uncheck them
// Credit to http://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down

function selectAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.hecho-checkbox)');

    // prevent default behavior of checkboxes when clicked
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });

    let mouseDown = false;

    // add mousedown event to check boxes
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('mousedown', () => {
            mouseDown = true;
            checkbox.checked = 1 - checkbox.checked;
        });
    });

    // add mouseover event to check boxes if mouse was already down
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('mouseover', () => {
            if (mouseDown) {
                checkbox.checked = 1 - checkbox.checked;
            }
        });
    });

    // add mouseup event to reset mouseDown flag
    document.addEventListener('mouseup', () => {
        mouseDown = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    selectAllCheckboxes();
});

// Sends the form data as a POST request to the backend

const addButton = document.querySelector('#addButton');

async function sendData () {
    const addForm = document.querySelector('#addForm');
    const isValid = validateForm(addForm);

    if (!isValid) {
        alert("Form inválido, revisa los datos ingresados.")
        return;
    }

    const formData = new FormData(addForm);

    const horasInputs = document.querySelectorAll('.horas');
    const horasValues = Array.from(horasInputs).map(input => input.checked ? 1 : 0);

    const diasInputs = document.querySelectorAll('.dias');
    const diasValues = Array.from(diasInputs).map(input => input.checked ? 1 : 0);

    formData.append('horas-input', JSON.stringify(horasValues));
    formData.append('dias-input', JSON.stringify(diasValues));

    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);

    console.log(json)

    fetch('/insert', {
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
            console.log('Data inserted successfully');
        })
        .catch(error => {
            console.error('There was a problem inserting the data:', error);
        });
}

addButton.addEventListener('click', async () => {
    await sendData()
    location.reload();
});

// creates a new input element of type file when the button is clicked,
// then listens for the change event on that element to extract the selected file's name and type and set the value of the imagen-input element accordingly.

const selectFileBtn = document.getElementById("select-file-btn");
const imagenInput = document.getElementById("imagen-input");

selectFileBtn.addEventListener("click", (event1) => {
    event1.preventDefault();
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.setAttribute('accept', 'image/*');
    fileInput.addEventListener("change", (event2) => {
        const file = event2.target.files[0];
        const fileName = file.name;
        const fileType = file.type;
        imagenInput.value = `${fileName}`;
    });
    fileInput.click();
});

// fill date inputs with the current date

function fillDateInputs() {
    const now = new Date();
    const diaInput = document.getElementById('dia');
    const mesSelect = document.getElementById('mes');
    const anhoInput = document.getElementById('anho');

    diaInput.value = now.getDate();
    mesSelect.value = now.getMonth() + 1; // Note that getMonth() returns a zero-indexed value, so we add 1 to get the correct month number
    anhoInput.value = now.getFullYear();

}

fillDateInputs(); // Call the function once the page loads
updateMaxDayOfMonth();

// adds the required classes to the hour elements based on their content. 
function addClassesToHourElements() {
    const hourElements = document.querySelectorAll('.hora-num');

    for (let i = 0; i < hourElements.length; i++) {
        const hourElement = hourElements[i];
        const hour = parseInt(hourElement.textContent);

        if (hour >= 1 && hour <= 6 || hour >= 18 && hour <= 24) {
            hourElement.classList.add('dark');
        } else if (hour === 7 || hour === 17) {
            hourElement.classList.add('semilight');
        } else if (hour >= 8 && hour <= 16) {
            hourElement.classList.add('light');
        }
    }
}

// selects all elements with class "hora-num" and converts the hour to 12-hour format
function convertTo12HourClock() {
    const hourElements = document.querySelectorAll('.hora-num');

    for (let i = 0; i < hourElements.length; i++) {
        const hourElement = hourElements[i];
        const hour = parseInt(hourElement.textContent);
        const ampm = hour < 12 ? 'AM' : 'PM';
        const convertedHour = hour % 12 || 12;
        hourElement.textContent = `${convertedHour} ${ampm}`;
    }
}

// convert the numbers in elements with class "dia-num" to Spanish weekday names
function convertToSpanishWeekdays() {
    const weekdayElements = document.querySelectorAll('.dia-num');
  
    const weekdays = [
      'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
    ];
  
    for (let i = 0; i < weekdayElements.length; i++) {
      const weekdayElement = weekdayElements[i];
      const weekdayIndex = parseInt(weekdayElement.textContent) - 1;
      const weekdayName = weekdays[weekdayIndex];
      weekdayElement.textContent = weekdayName;
    }
  }

// functions are called when the DOM content has finished loading
document.addEventListener('DOMContentLoaded', () => {
    addClassesToHourElements();
    convertTo12HourClock();
    convertToSpanishWeekdays();
});

// ensure that the maximum day is updated whenever the user selects a new month.

function updateMaxDayOfMonth() {
    const monthSelect = document.querySelector('#mes');
    const dayInput = document.querySelector('#dia');
    const maxDaySpan = document.querySelector('#max-day-of-month');
    const selectedMonth = parseInt(monthSelect.value);

    let maxDay = 31;

    if (selectedMonth === 4 || selectedMonth === 6 || selectedMonth === 9 || selectedMonth === 11) {
        maxDay = 30;
    } else if (selectedMonth === 2) {
        const year = new Date().getFullYear();
        maxDay = year % 4 === 0 ? 29 : 28;
    }

    maxDaySpan.textContent = maxDay;
    dayInput.max = maxDay;
}

const monthSelect = document.querySelector('#mes');
monthSelect.addEventListener('change', updateMaxDayOfMonth);

// checks if each input is valid using the checkValidity() method.

function validateForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    for (const input of inputs) {
        if (!input.checkValidity()) {
            isValid = false;
            break;
        }
    }

    return isValid;
}

// Set current year as minimum possible value in year input, and its corresponding label
function setYearDefaults() {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the value of the span element
    const spanAnhoActual = document.querySelector("#anho-actual");
    spanAnhoActual.textContent = currentYear;

    // Set the minimum value for the input element
    const inputAnho = document.querySelector("#anho");
    inputAnho.min = currentYear.toString();
}

// Call the setYearDefaults function when the document loads
window.addEventListener("load", setYearDefaults);

// Get the "Check all" and "Uncheck all" button elements
const checkAllHorasButton = document.querySelector("#check-all-horas-button");
const uncheckAllHorasButton = document.querySelector("#uncheck-all-horas-button");

// Add a click event listener to the "Check all" button
checkAllHorasButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get all the checkboxes with class "horas"
    const checkboxes = document.querySelectorAll(".horas");

    // Check all checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
});

// Add a click event listener to the "Uncheck all" button
uncheckAllHorasButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get all the checkboxes with class "horas"
    const checkboxes = document.querySelectorAll(".horas");

    // Uncheck all checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
});

// Get the "Check all" and "Uncheck all" button elements
const checkAllDiasButton = document.querySelector("#check-all-dias-button");
const uncheckAllDiasButton = document.querySelector("#uncheck-all-dias-button");

// Add a click event listener to the "Check all" button
checkAllDiasButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get all the checkboxes with class "horas"
    const checkboxes = document.querySelectorAll(".dias");

    // Check all checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
});

// Add a click event listener to the "Uncheck all" button
uncheckAllDiasButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Get all the checkboxes with class "horas"
    const checkboxes = document.querySelectorAll(".dias");

    // Uncheck all checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
});
