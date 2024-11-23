document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        console.error("No token found in local storage.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');

    if (!doctorId) {
        console.error("No doctor ID found in URL.");
        return;
    }

    try {
        // Fetch doctor profile details
        const response = await fetch(`${API_URL}/doctor/${doctorId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(response)

        if (!response.ok) {
            throw new Error('Failed to fetch doctor profile');
        }

        const doctor = await response.json();

        if (doctor && doctor.data) {
            const doctorDetails = doctor.data;

            // Update UI with doctor details
            document.getElementById('doctorName').innerText = doctorDetails.fullName || 'N/A';
            document.getElementById('doctorSpecialty').innerText = doctorDetails.specialization || 'N/A';
            document.getElementById('doctorEmail').innerText = doctorDetails.email || 'N/A';
            document.getElementById('doctorPhone').innerText = doctorDetails.phone || 'N/A';
            document.getElementById('doctorCity').innerText = doctorDetails.city || 'N/A';
            document.getElementById('doctorClinicAddress').innerText = doctorDetails.address || 'N/A';
        } else {
            document.getElementById('page-content').innerHTML = '<p>Doctor not found.</p>';
        }

        // Add delete functionality
        const deleteButton = document.getElementById('deleteBtn');
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            deleteDoctor(doctorId);
        });

    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        document.getElementById('page-content').innerHTML = '<p>Failed to load doctor details.</p>';
    }

    // Delete doctor profile
    async function deleteDoctor(doctorId) {
        if (confirm("Are you sure you want to delete this doctor profile?")) {
            try {
                const response = await fetch(`${API_URL}/doctor/${doctorId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    alert('Doctor profile deleted successfully!');
                    window.location.href = 'all-doctors.html'; // Redirect to doctors list or another page
                } else {
                    const errorData = await response.json();
                    alert('Failed to delete doctor: ' + (errorData.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error deleting doctor profile:', error);
                alert('There was an error deleting the doctor profile.');
            }
        }
    }
});
