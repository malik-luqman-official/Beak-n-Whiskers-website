document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken');
    
    // Redirect to login if the user is not authenticated
    if (!token) {
      alert('Please log in to access this page.');
      window.location.href = 'login.html';
      return;
    }

    // Decode the JWT token to extract the user ID manually
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = JSON.parse(atob(payloadBase64));
    const doctorId = payloadDecoded._id;  // Extract the user ID from the decoded token
  
    if (!doctorId) {
      alert('No doctor ID found in the URL.');
      return;
    }
  
    try {
      // Fetch doctor details using the decoded user ID for authorization
      const response = await fetch(`${API_URL}/doctor/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctor profile');
      }
  
      const doctor = await response.json();
  
      // Check if doctor details are returned
      if (doctor && doctor._id) {
        // Update profile information
        document.getElementById('doctorName').textContent = doctor.fullName || 'N/A';
        document.getElementById('doctorSpecialization').textContent = doctor.specialization || 'N/A';
        document.getElementById('doctorEmail').textContent = doctor.email || 'N/A';
        document.getElementById('doctorPhone').textContent = doctor.phone || 'N/A';  // Assuming phone is in the response
        document.getElementById('doctorCity').textContent = doctor.city || 'N/A';
        document.getElementById('doctorClinic').textContent = doctor.address || 'N/A';
    
        // Update the Edit button link dynamically
        const editBtn = document.getElementById('editBtn');
        editBtn.href = `edit-doctor-profile.html?id=${doctorId}`;
      } else {
        throw new Error('Doctor not found');
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      alert('Failed to load doctor details. Please try again.');
    }
});
