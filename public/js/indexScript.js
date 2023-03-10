// Add an event listener to each checkbox
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

// 