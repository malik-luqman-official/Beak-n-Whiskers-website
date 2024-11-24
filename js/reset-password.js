const API_URL = 'http://localhost:3000/api/v1'; // Your API endpoint

    // Function to get a parameter value from the URL query string
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    document.getElementById('resetPasswordForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = getQueryParam('token');  // Get the token from the URL query string
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Password validation (basic check)
        if (newPassword.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Send the request to reset the password
            console.log(token)
            const response = await fetch(`${API_URL}/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,          // Send the token received from the query string
                    password: newPassword, // Send the new password
                    confirmPassword: confirmPassword  // Send the confirm password
                })
            });

            const result = await response.json();  // Parse response
            console.log(newPassword, confirmPassword)
            console.log(response)

            if (response.ok) {
                alert('Password reset successfully!');
                window.location.href = 'sign-in.html'; // Redirect to login after successful reset
            } else {
                console.error('Error response:', result);
                document.getElementById('errorMessage').style.display = 'block'; // Show error message if reset fails
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('errorMessage').style.display = 'block';  // Show error message on failure
        }
    });