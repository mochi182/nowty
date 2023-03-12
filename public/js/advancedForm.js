  
/* ==================== Form submission ==================== */

// ---------- #addButton ----------

// Button sends the form data as a POST request to the backend
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

    // Converts formdata to JSON
    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    let json = JSON.stringify(object);

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

// Checks if each input is valid using the checkValidity() method
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

/* ==================== Component specific scripts ==================== */

// ---------- #date-dropdown ----------

// Add event listener to the date dropdown
// Selection toggles "por-fecha" and "por-semana" display
const dateDropdown = document.getElementById("date-dropdown");
const porSemanaDiv = document.getElementById("porSemanaInputs");
const porFechaDiv = document.getElementById("porFechaInputs");

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

// ---------- #date-dropdown ----------

// Checks if the selected value of "dropdown-select" is "puntual"
// If it is, it sets the value of "date-dropdown" to "por-fecha" and disables it
function selectPuntual() {
    var event = new Event('change');
    var dropdownSelect = document.getElementById("dropdown-select");
    var dateDropdown = document.getElementById("date-dropdown");

    if (dropdownSelect.value === "1") {
        dateDropdown.value = "por-fecha";
        dateDropdown.dispatchEvent(event);
        dateDropdown.disabled = true;
    } else {
        dateDropdown.disabled = false;
    }
}

// Call the function whenever the dropdown is changed
document.getElementById("dropdown-select").addEventListener("change", selectPuntual);

// ---------- #dropdown-select ----------

// Checks if the selected value of "dropdown-select" is "rutina"
// If it is, it clears the value of the "anho" input and disables it
function disableAnhoInput() {
    let dropdownSelect = document.getElementById("dropdown-select");
    let anhoInput = document.getElementById("anho");

    if (dropdownSelect.value === "2") {
        anhoInput.value = "";
        anhoInput.disabled = true;
    } else {
        const now = new Date();
        anhoInput.disabled = false;
        anhoInput.value = now.getFullYear();
    }
}

// Call the function whenever the dropdown is changed
document.getElementById("dropdown-select").addEventListener("change", disableAnhoInput);

// ---------- #clearButton ----------

// Button for clearing all inputs, textareas and checkboxes. Reverts selects to default.
var clearButton = document.querySelector("#clearButton");

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

// ---------- input[type="checkbox"]:not(.hecho-checkbox) ----------

// Mouse drag-around effect for checkboxes, checks or unchecks them
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

// ---------- #imagen-input ----------

// Creates a new input element of type file when the button is clicked
// Then listens for the change event on that element to extract the selected file's name and type and set the value of the imagen-input element accordingly
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

// ---------- #dia #mes #anho ----------

// Fill date inputs with the current date
function fillDateInputs() {
    const now = new Date();
    const diaInput = document.getElementById('dia');
    const mesSelect = document.getElementById('mes');
    const anhoInput = document.getElementById('anho');

    diaInput.value = now.getDate();
    mesSelect.value = now.getMonth() + 1; // Note that getMonth() returns a zero-indexed value, so we add 1 to get the correct month number
    anhoInput.value = now.getFullYear();

}

// ---------- .hora-num ----------

// Adds classes to the hour elements based on their content
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

// ---------- .hora-num ----------

// Convert the numbers in elements with class "hora-num" to 12-hour format
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

// ---------- .dia-num ----------

// Convert the numbers in elements with class "dia-num" to Spanish weekday names
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

// ---------- #max-day-of-month ----------

// Ensure that the maximum day is updated whenever the user selects a new month
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

// ---------- #anho-actual ----------

// Set current year as the minimum possible value in year input, and its corresponding label
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

// ---------- #check-all-horas-button #uncheck-all-horas-button ----------

// Get the button elements
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

// ---------- #check-all-dias-button #uncheck-all-dias-button ----------

// Get the button elements
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

// ---------- #dia #mes #anho ----------

// Toggles the required attribute based on the selected value of dropdown-select
function toggleRequired() {
    var dropdownSelect = document.getElementById("dropdown-select");
    var diaInput = document.getElementById("dia");
    var mesSelect = document.getElementById("mes");
    var anhoInput = document.getElementById("anho");
  
    if (dropdownSelect.value === "1") {
      diaInput.required = true;
      mesSelect.required = true;
      anhoInput.required = true;
    } else {
      diaInput.required = false;
      mesSelect.required = false;
      anhoInput.required = false;
    }
  }
  
// Add event listener to dropdown-select
  var dropdownSelect = document.getElementById("dropdown-select");
  dropdownSelect.addEventListener("change", toggleRequired);  

/* ==================== Pageload ==================== */

// Functions are called when the DOM content has finished loading
document.addEventListener('DOMContentLoaded', () => {
    selectPuntual();
    
    addClassesToHourElements();
    convertTo12HourClock();
    convertToSpanishWeekdays();
    fillDateInputs();
    updateMaxDayOfMonth();
    setYearDefaults();
    selectAllCheckboxes();
});