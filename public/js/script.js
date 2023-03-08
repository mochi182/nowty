
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

// add an event listener to each checkbox
const checkboxes = document.querySelectorAll('input[type=checkbox].hecho-checkbox');
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
  