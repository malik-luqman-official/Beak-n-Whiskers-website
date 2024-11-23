const API_URL = 'http://localhost:3000/api/v1'; // API base URL

document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('jwtToken'); // Retrieve JWT token

  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  // Decode JWT token to extract user ID
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  const userId = decodedToken._id; // Assuming user ID is stored in _id field of token payload

  try {
    // Fetch current user profile data from the API
    const response = await fetch(`${API_URL}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile data');
    }

    const user = await response.json();
    console.log(user); // Log the entire response to inspect its structure

    // Check if user data is returned correctly
    if (user) {
      const userDetails = user; // Adjust this line to get the correct structure

      // Populate the form with the user's existing data
      document.getElementById('name').value = userDetails.fullName || ''; // Adjust if the field is 'fullName'
      document.getElementById('city').value = userDetails.city || '';
      document.getElementById('phone').value = userDetails.phone || '';
      document.getElementById('address').value = userDetails.address || '';
    } else {
      console.error('User data not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

// Handle form submission to update user profile
document.getElementById('editProfileForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the default form submission

  const token = localStorage.getItem('jwtToken'); // Retrieve JWT token
  const userData = {
    fullName: document.getElementById('name').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
  };

  // Decode JWT token to extract user ID for PUT request
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  const userId = decodedToken._id; // Assuming user ID is stored in _id field of token payload

  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: 'PUT', // PUT method to update the profile
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const updatedUser = await response.json();
    console.log(updatedUser); // Log the updated user data

    // Show a success message and redirect to the profile page
    alert('Profile updated successfully');
    window.location.href = 'user-profile.html'; // Redirect to profile page
  } catch (error) {
    console.error('Error updating profile:', error);
  }
});
