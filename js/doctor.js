document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem('jwtToken');
    
    // Redirect to login if the user is not authenticated
    if (!token) {
      alert('Please log in to access this page.');
      window.location.href = 'login.html';
      return;
    }

    // Get the doctor ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id'); // Get 'id' parameter from URL

    if (!doctorId) {
      alert('No doctor ID found in the URL.');
      return;
    }

    try {
      // Fetch doctor details using the doctor ID from query parameter
      const response = await fetch(`${API_URL}/doctor/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response)
  
      if (!response.ok) {
        throw new Error('Failed to fetch doctor profile');
      }
  
      const doctor = await response.json();

      // Check if doctor details are returned
      if (doctor && doctor._id) {
        // Now you can use the doctorId from the fetched doctor object
        const doctorId = doctor._id;

        // Update profile information
        document.getElementById('doctorName').textContent = doctor.fullName || 'N/A';
        document.getElementById('doctorSpecialization').textContent = doctor.specialization || 'N/A';
        document.getElementById('doctorEmail').textContent = doctor.email || 'N/A';
        document.getElementById('doctorPhone').textContent = doctor.phone || 'N/A';  
        document.getElementById('doctorCity').textContent = doctor.city || 'N/A';
        document.getElementById('doctorClinic').textContent = doctor.address || 'N/A';
    
    
      } else {
        throw new Error('Doctor not found');
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      alert('Failed to load doctor details. Please try again.');
    }
});



document.getElementById('bookAppointment').addEventListener('click', function(event) {
    // Prevent default link behavior to dynamically add the query parameter
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id'); // Get doctor ID from the query parameter
    if (!doctorId) {
        alert('No doctor ID found.');
        return;
    }

    // Redirect to the all-pets page with doctor ID as a query parameter
    window.location.href = `all-pets.html?doctorId=${doctorId}`;
});
