document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

    if (!token) {
        console.error("No token found in local storage.");
        return;
    }

    // Get the pet ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');

    if (!petId) {
        console.error("No pet ID found in URL.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/pet/${petId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pet data');
        }

        const pet = await response.json();
        console.log(pet);  // Check the structure of the API response

        if (pet && pet.data) {
            const petDetails = pet.data;

            // Populate the form with pet details
            document.getElementById('petName').value = petDetails.petName || '';
            document.getElementById('category').value = petDetails.category_id || ''; // Adjust category selection
            document.getElementById('gender').value = petDetails.gender || '';
            document.getElementById('dob').value = petDetails.birthDate || '';
            document.getElementById('breed').value = petDetails.breed || '';
            document.getElementById('color').value = petDetails.color || '';

            // Set neutered option based on API data
            if (petDetails.neutered) {
                document.getElementById('neuteredYes').checked = true;
            } else {
                document.getElementById('neuteredNo').checked = true;
            }
        } else {
            console.error('Pet data not found');
        }

    } catch (error) {
        console.error('Error fetching pet data:', error);
    }
});


async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const categories = await response.json();
        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

