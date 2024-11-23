const API_URL = 'http://localhost:3000/api/v1'; // Adjust API URL if needed
        
    document.getElementById('forgetPasswordForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const frontendPort = window.location.port || 3000;  // Get the port dynamically (5501 for frontend, default 3000)

        // Email validation (basic check)
        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Frontend-Port': frontendPort,  // Pass the port as a custom header
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Password reset link sent to your email.');
            } else {
                document.getElementById('errorMessage').style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('errorMessage').style.display = 'block';
        }
    });

    // Basic email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }