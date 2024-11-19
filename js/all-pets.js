import jwt_decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', async function() {
    const API_URL = 'http://localhost:3000/api/v1'; // Replace with actual API endpoint
    const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
    
    if (!token) {
        console.error("No token found. Please log in.");
        document.getElementById('pet-cards').innerHTML = '<p>Please log in to view pets.</p>';
        return;
    }

    // Decode token to get user ID
    const decoded = jwt_decode(token);
    const userId = decoded.userId; // Adjust this according to your JWT payload structure

    try {
        // Fetch pets by user ID
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

        // Check if pets exist in the data
        if (data && data.data && data.data.length > 0) { // Assuming pets are in `data.data`
            data.data.forEach(pet => {
                // Create a card for each pet
                const petCard = document.createElement('div');
                petCard.classList.add('col');

                petCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title mt-2">${pet.petName}</h5>
                                <span class="badge bg-primary">${pet.category_id.name}</span>
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
                            <button class="btn main-button mt-4">View Pet Details</button>
                        </div>
                    </div>
                `;

                // Append the created pet card to the container
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
