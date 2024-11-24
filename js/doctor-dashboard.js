const API_URL = 'http://localhost:3000/api/v1/doctor'; // Replace with your actual API URL

const token = localStorage.getItem('jwtToken');

// Fetch all doctors
async function fetchDoctors() {
    try {
      const response = await fetch(`${API_URL}/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization header with Bearer token
          'Content-Type': 'application/json',
        }
      });

  
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Failed to fetch doctors, status: ' + response.status);
      }
  
      const data = await response.json();
  
      // Check if data is an array directly
      if (Array.isArray(data)) {
        const doctors = data;
  
        const tableBody = document.getElementById('doctorTableBody');
        tableBody.innerHTML = ''; // Clear the table before adding new rows
  
        // Handle case where no doctors are returned
        if (doctors.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="10" class="text-center">No doctors found.</td></tr>';
          return;
        }
  
        // Loop through each doctor and create a row in the table
        doctors.forEach((doctor, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${doctor.fullName}</td>
            <td>${doctor.email}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.phone}</td>
            <td>${doctor.city}</td>
            <td>${doctor.address}</td>
           <td> <a href="${doctor.calendlyURL}">Link</a></td>
            <td>${doctor.status}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.error('No doctors found or invalid data structure');
        const tableBody = document.getElementById('doctorTableBody');
        tableBody.innerHTML = '<tr><td colspan="10" class="text-center">No doctors found or invalid data structure.</td></tr>';
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      const tableBody = document.getElementById('doctorTableBody');
      tableBody.innerHTML = '<tr><td colspan="10" class="text-center">An error occurred while fetching doctors. Please try again later.</td></tr>';
    }
  }

  
// Delete doctor
async function deleteDoctor(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Authorization header with Bearer token
        'Content-Type': 'application/json',
      }
    });
    fetchDoctors(); // Refresh the doctor list after deletion
  } catch (error) {
    console.error('Error deleting doctor:', error);
  }
}

// View doctor details (you can implement this function based on your requirements)
function viewDoctorDetails(doctorId) {
  console.log(`View details of doctor with ID: ${doctorId}`);
  // Implement functionality to view doctor details
}

// Initialize the doctor table when the page loads
window.onload = fetchDoctors;
