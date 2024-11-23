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
        // Fetch pet profile details
        const response = await fetch(`${API_URL}/pet/${petId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pet profile');
        }

        const pet = await response.json();

        if (pet && pet.data) {
            const petDetails = pet.data;

            // Format the birthDate to a human-readable format
            const birthDate = new Date(petDetails.birthDate);
            const formattedDate = birthDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            // Fetch category details
            const categoryResponse = await fetch(`${API_URL}/category/${petDetails.category_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!categoryResponse.ok) {
                throw new Error('Failed to fetch category details');
            }

            const category = await categoryResponse.json();

            // Update UI with pet details
            document.getElementById('petName').innerText = petDetails.petName || 'N/A';
            document.getElementById('petCategory').innerText = category.data.category || 'N/A';
            document.getElementById('petGender').innerText = petDetails.gender || 'N/A';
            document.getElementById('petColor').innerText = petDetails.color || 'N/A';
            document.getElementById('petDob').innerText = formattedDate || 'N/A';
            document.getElementById('petBreed').innerText = petDetails.breed || 'N/A';
            document.getElementById('petNeutered').innerText = petDetails.neutered ? 'Yes' : 'No';

            // Dynamically update the edit profile link with the petId
            document.getElementById('editBtn').setAttribute('href', `edit-pet.html?id=${petId}`);

            // Add delete functionality
            const deleteButton = document.getElementById('deleteBtn');
            deleteButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default link behavior
                deletePet(petId);
            });
        } else {
            document.getElementById('pet-profile').innerHTML = '<p>Pet not found.</p>';
        }

    } catch (error) {
        console.error('Error fetching pet profile:', error);
        document.getElementById('pet-profile').innerHTML = '<p>Failed to load pet details.</p>';
    }

    // Delete pet profile
    async function deletePet(petId) {
        if (confirm("Are you sure you want to delete this pet profile?")) {
            try {
                const response = await fetch(`${API_URL}/pet/${petId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    alert('Pet profile deleted successfully!');
                    window.location.href = 'all-pets.html'; // Redirect to pets list or another page
                } else {
                    const errorData = await response.json();
                    alert('Failed to delete pet: ' + (errorData.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error deleting pet profile:', error);
                alert('There was an error deleting the pet profile.');
            }
        }
    }
});
