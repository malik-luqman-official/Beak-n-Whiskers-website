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
      // Fetch doctor details
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
        // Populate the form with the doctor's current information
        document.getElementById('name').value = doctor.fullName || '';
        document.getElementById('phone').value = doctor.phone || '';
        document.getElementById('cities').value = doctor.city || '';
        document.getElementById('specialization').value = doctor.specialization || '';
        document.getElementById('clinic-address').value = doctor.address || '';
      } else {
        throw new Error('Doctor not found');
      }
  
      // Handle the form submission to update doctor information
      document.getElementById('editDoctorForm').addEventListener('submit', async function (event) {
        event.preventDefault();
  
        // Collect the updated form data
        const updatedDoctorData = {
          fullName: document.getElementById('name').value,
          phone: document.getElementById('phone').value,
          city: document.getElementById('cities').value,
          specialization: document.getElementById('specialization').value,
          address: document.getElementById('clinic-address').value,
        };
  
        try {
          // Update doctor information
          const updateResponse = await fetch(`${API_URL}/doctor/${doctorId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDoctorData),
          });
  
          if (!updateResponse.ok) {
            throw new Error('Failed to update doctor profile');
          }
  
          alert('Doctor profile updated successfully!');
          window.location.href = `doctor-profile.html?id=${doctorId}`;  // Redirect to profile page after update
        } catch (error) {
          console.error('Error updating doctor profile:', error);
          alert('Failed to update doctor details. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      alert('Failed to load doctor details. Please try again.');
    }
  });
  