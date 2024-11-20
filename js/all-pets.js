document.addEventListener('DOMContentLoaded', async function() {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
    
    if (!token) {
        console.error("No token found in local storage.");
        return;
    }

    // Decode the JWT token to extract the user ID
    const payloadBase64 = token.split('.')[1];  // Get the payload part of the JWT
    const payloadDecoded = JSON.parse(atob(payloadBase64));  // Decode and parse the JSON payload
    const userId = payloadDecoded._id;  // Assuming the user ID is stored as '_id' in the payload

    try {
        const response = await fetch(`${API_URL}/pet/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pets');
        }

        const data = await response.json();
        const petCardsContainer = document.getElementById('pet-cards');

        if (data && data.data && data.data.length > 0) {
            // Iterate through the pets and create a card for each one
            data.data.forEach(pet => {
                const petCard = document.createElement('div');
                petCard.classList.add('col');
                petCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title mt-2">${pet.petName}</h5>
                                <span class="badge bg-primary">${pet.category_id.category}</span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-start">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="text-muted meta-data">${pet.color}</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="ms-2 text-muted meta-data">${pet.breed}</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <span class="ms-2 text-muted meta-data">${pet.gender}</span>
                                </div>
                            </div>
                            <a  href="pet-profile.html?id=${pet._id}">
                            <button class="btn main-button mt-4">View Pet Details</button>
                            </a>
                        </div>
                    </div>
                `;
                petCardsContainer.appendChild(petCard);
            });
        } else {
            petCardsContainer.innerHTML = '<p>No pets found.</p>';
        }
    } catch (error) {
        console.error('Error fetching pets:', error);
        document.getElementById('pet-cards').innerHTML = '<p>Failed to load pets.</p>';
    }
});