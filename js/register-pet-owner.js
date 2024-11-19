const API_URL = 'http://localhost:3000/api/v1'


  document.querySelector('.bnw-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const userData = {
      fullName: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

        if (result.message === 'success') {
            alert('User registered successfully!');
            // Redirect or handle the response
            window.location.href = 'sign-in.html'; 
        } else {
            alert('Registration failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again later.');
    }
  });

