const API_URL = 'http://localhost:3000/api/v1';
const token = localStorage.getItem('jwtToken');

document.addEventListener("DOMContentLoaded", async () => {
    if (token) {
        // Decode the JWT token to extract the user ID
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = JSON.parse(atob(payloadBase64));
        const userId = payloadDecoded._id; // Extract the user ID from the decoded token

        // Fetch user data from the backend using the user ID
        try {
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();

                // Populate the profile information
                if (userData.fullName) {
                    document.getElementById('userName').textContent = userData.fullName;
                }
                if (userData.email) {
                    document.getElementById('userEmail').textContent = userData.email;
                }
                if (userData.city) {
                    document.getElementById('userCity').textContent = userData.city;
                }
                if (userData.phone) {
                    document.getElementById('userPhone').textContent = userData.phone;
                }
                if (userData.address) {
                    document.getElementById('userAddress').textContent = userData.address;
                }

                // Update the Edit Profile button's href dynamically
                const editBtn = document.getElementById('editBtn');
                editBtn.setAttribute('href', `edit-user-profile.html?id=${userId}`);
            } else {
                alert('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching your profile data.');
        }
    }
});
