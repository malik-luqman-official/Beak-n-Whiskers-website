// Dynamically set the petId (this would be fetched from your backend or local data)
const petId = '12345'; // Example petId
const editLink = document.getElementById('editBtn');
editLink.href = `edit-pet.html?id=${petId}`;

document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
        console.error("No token found in local storage.");
        return;
    }

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

        if (pet && pet.data) {
            const petDetails = pet.data;

            // Populate the form with the pet's current data
            document.getElementById('petName').value = petDetails.petName || '';
            document.getElementById('category').value = petDetails.category_id || ''; // Assuming you have a category ID to map
            document.getElementById('gender').value = petDetails.gender || '';
            document.getElementById('dob').value = petDetails.birthDate || '';
            document.getElementById('breed').value = petDetails.breed || '';
            document.getElementById('color').value = petDetails.color || '';

            // Set the Neutered radio buttons based on the pet data
            if (petDetails.neutered) {
                document.getElementById('neuteredYes').checked = true;
            } else {
                document.getElementById('neuteredNo').checked = true;
            }
        } else {
            console.error('Pet data not found');
        }

        // Handle form submission
        const form = document.getElementById('petForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedData = {
                petName: document.getElementById('petName').value,
                category_id: document.getElementById('category').value,
                gender: document.getElementById('gender').value,
                birthDate: document.getElementById('dob').value,
                breed: document.getElementById('breed').value,
                color: document.getElementById('color').value,
                neutered: document.querySelector('input[name="neutered"]:checked').value === 'yes',
            };

            try {
                const updateResponse = await fetch(`${API_URL}/pet/${petId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (updateResponse.ok) {
                    alert('Pet profile updated successfully');
                    window.location.href = `pet-profile.html?id=${petId}`; // Redirect to the updated pet profile page
                } else {
                    throw new Error('Failed to update pet profile');
                }
            } catch (error) {
                console.error('Error updating pet profile:', error);
            }
        });

    } catch (error) {
        console.error('Error fetching pet data:', error);
    }
});
