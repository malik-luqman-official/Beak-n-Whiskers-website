const API_URL = 'http://localhost:3000/api/v1'

document.querySelector('.bnw-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the values from the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const city = document.getElementById('city').value || ''; // Optional field, defaults to empty string if not provided
    const phone = document.getElementById('phone').value || ''; // Optional field, defaults to empty string if not provided
    const address = document.getElementById('address').value || ''; // Optional field, defaults to empty string if not provided

    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Prepare user data
    const userData = {
        fullName: name,
        email: email,
        password: password,
        city: city,   // Optional field
        phone: phone, // Optional field
        address: address // Optional field
    };

    try {
        // Send registration request
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        // Handle successful registration response
        if (result.message === 'success') {
            alert('User registered successfully!');
            // Redirect to sign-in page
            window.location.href = 'sign-in.html'; 
        } else {
            alert('Registration failed: ' + result.message);
        }
    } catch (error) {
        // Handle any errors
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again later.');
    }
});
