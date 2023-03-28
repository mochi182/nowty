
// Sends the form data as a POST request to the backend
const addButton = document.querySelector('#addButton');

async function sendData(textInput) {

    const formData = new FormData();
  
    formData.append('actividad-input', textInput);
    formData.append('dropdown-select', '1');
    formData.append('descripcion-textarea', '');
    formData.append('imagen-input', '');
    formData.append('dias-input', '');
  
    const horasValues = '[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]';
    formData.append('horas-input', horasValues);
  
    formData.append('date-dropdown', 'por-fecha');

    formData.append('es-nota', JSON.stringify({"es-nota": 0}));

    const currentDate = new Date();
    formData.append('dia', currentDate.getDate().toString());
    formData.append('mes', (currentDate.getMonth() + 1).toString());
    formData.append('anho', currentDate.getFullYear().toString());
  
    // Converts formdata to JSON
    let object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    let json = JSON.stringify(object);
  
    // Send the POST request
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
    const textInput = document.querySelector('#actividad-input').value;
    
    // Split the input value by semicolon
    const splitValues = textInput.split(';');
  
    // If there is only one value, send one request
    if (splitValues.length === 1) {
      await sendData(textInput);
    } else {
      // If there are multiple values, send one request for each value
      for (const splitValue of splitValues) {
        await sendData(splitValue.trim());
      }
    }
  
    location.reload();
  });

// Checks if each input is valid using the checkValidity() method.
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


// Clear button: Clears all inputs, textareas and checkboxes. Reverts selects to default.
var clearButton = document.querySelector(".btn-danger");

async function clearInputs(){
    var inputs = document.querySelectorAll("input");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}

clearButton.addEventListener("click", function () {
    clearInputs()
});