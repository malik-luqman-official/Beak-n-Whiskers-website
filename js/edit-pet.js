const API_URL = 'http://localhost:3000/api/v1';  // Define API_URL globally

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

    if (!token) {
        console.error("No token found in local storage.");
        return;
    }

    // Get the pet ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id'); // Fetch 'id' parameter from URL

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
        console.log(pet);  // Log to check the structure of the API response

        if (pet && pet.data) {
            const petDetails = pet.data;

            // Format the birthDate to the required format (yyyy-MM-dd)
            const birthDate = new Date(petDetails.birthDate);
            const formattedDate = birthDate.toISOString().split('T')[0]; // Get the yyyy-MM-dd part

            // Populate the form with pet details
            document.getElementById('petName').value = petDetails.petName || '';
            document.getElementById('gender').value = petDetails.gender || '';
            document.getElementById('dob').value = formattedDate || ''; // Set the formatted date for the dob input
            document.getElementById('breed').value = petDetails.breed || '';
            document.getElementById('color').value = petDetails.color || '';

            // Set neutered option based on API data
            if (petDetails.neutered) {
                document.getElementById('neuteredYes').checked = true;
            } else {
                document.getElementById('neuteredNo').checked = true;
            }

            // Load and set the category dropdown dynamically
            await loadCategories(petDetails.category_id);
        } else {
            console.error('Pet data not found');
        }

    } catch (error) {
        console.error('Error fetching pet data:', error);
    }
});

// Function to load categories dynamically and select the current pet's category
async function loadCategories(selectedCategoryId) {
    const token = localStorage.getItem('jwtToken');

    try {
        const response = await fetch(`${API_URL}/category/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const categoriesResponse = await response.json();
        console.log('Categories Response:', categoriesResponse);  // Log to inspect the structure

        // Check if the data key exists and is an array
        if (Array.isArray(categoriesResponse.data)) {
            const categorySelect = document.getElementById('category');

            // Clear existing options
            categorySelect.innerHTML = '';

            // Add default option if needed
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select Category';
            categorySelect.appendChild(defaultOption);

            // Add category options dynamically
            categoriesResponse.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id;  // Using _id for the value
                option.textContent = category.category;  // Using category name as text

                // Check if this category is selected for the pet
                if (category._id === selectedCategoryId) {
                    option.selected = true;
                }

                categorySelect.appendChild(option);
            });
        } else {
            console.error('Categories data is not an array:', categoriesResponse.data);
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Handling form submission to update the pet
document.getElementById('updatePetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const token = localStorage.getItem('jwtToken'); // Retrieve JWT token
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id'); // Fetch 'id' parameter from URL

    if (!petId) {
        console.error("No pet ID found in URL.");
        return;
    }

    const petData = {
        petName: document.getElementById('petName').value,
        gender: document.getElementById('gender').value,
        birthDate: document.getElementById('dob').value,
        breed: document.getElementById('breed').value,
        color: document.getElementById('color').value,
        neutered: document.querySelector('input[name="neutered"]:checked').value === 'yes',
        category_id: document.getElementById('category').value,
    };

    try {
        const response = await fetch(`${API_URL}/pet/${petId}`, {
            method: 'PUT', // PUT method to update the pet
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData),
        });

        if (!response.ok) {
            throw new Error('Failed to update pet');
        }

        const updatedPet = await response.json();
        console.log(updatedPet);  // Log the updated pet data
        alert('Pet updated successfully');
        window.location.href = `pet-profile.html?id=${petId}`;


    } catch (error) {
        console.error('Error updating pet:', error);
    }
});
