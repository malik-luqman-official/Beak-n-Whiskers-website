const API_URL = 'http://localhost:3000/api/v1';

document.querySelector('.bnw-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('cities').value;
    const specialization = document.getElementById('specialization').value;
    const address = document.getElementById('clinic-address').value;

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    const userData = {
        fullName: name,
        email: email,
        password: password,
        phone: phone,  
        city: city,
        specialization: specialization,
        address: address,
        role: 'doctor' 
    };
    

    console.log("Sending data:", userData);

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
            alert('Doctor registered successfully!');
            window.location.href = 'sign-in.html'; 
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again later.');
    }
});
