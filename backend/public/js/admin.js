function deleteButton(event) {
    // Show a confirmation dialog
    const confirmation = confirm('Are you sure you want to delete this activity?');

    if (confirmation) {
        const id = event.target.getAttribute('registro');

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
};

// Get the select element
const filterSelect = document.getElementById('filter');

// Add an event listener to the select element
filterSelect.addEventListener('change', () => {
    const selectedFilter = filterSelect.value; // Get the selected filter emoji

    // Get all table rows in the tbody
    const tableRows = document.querySelectorAll('tbody tr');

    // Loop through each table row and apply the filter
    tableRows.forEach((row) => {
        const nombreCell = row.querySelector('td:nth-child(2)'); // Get the cell with emojis

        // Check if the cell contains the selected filter emoji or if "Todos" is selected
        if (selectedFilter === 'all' || nombreCell.textContent.includes(selectedFilter)) {
            row.style.display = 'table-row'; // Show the table row
        } else {
            row.style.display = 'none'; // Hide the table row
        }
    });
});