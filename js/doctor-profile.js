document.addEventListener('DOMContentLoaded', async function () {
  const API_URL = 'http://localhost:3000/api/v1';
  const token = localStorage.getItem('jwtToken');
  
  if (!token) {
      alert('Please log in to access this page.');
      window.location.href = 'login.html';
      return;
  }

  const payloadBase64 = token.split('.')[1];
  const payloadDecoded = JSON.parse(atob(payloadBase64));
  const doctorId = payloadDecoded._id; 

  if (!doctorId) {
      alert('No doctor ID found in the URL.');
      return;
  }

  try {
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

      if (doctor && doctor._id) {
          document.getElementById('doctorName').textContent = doctor.fullName || 'N/A';
          document.getElementById('doctorSpecialization').textContent = doctor.specialization || 'N/A';
          document.getElementById('doctorEmail').textContent = doctor.email || 'N/A';
          document.getElementById('doctorPhone').textContent = doctor.phone || 'N/A';  
          document.getElementById('doctorCity').textContent = doctor.city || 'N/A';
          document.getElementById('doctorClinic').textContent = doctor.address || 'N/A';
  
          const editBtn = document.getElementById('editBtn');
          editBtn.href = `edit-doctor-profile.html?id=${doctorId}`;

          const statusElement = document.getElementById('doctorStatus');
          const contactUsRow = document.getElementById('contactUsRow');

          if (doctor.status === 'approved') {
              statusElement.textContent = 'Approved';
              contactUsRow.style.display = 'none';
          } else if (doctor.status === 'pending') {
              statusElement.textContent = 'Pending';
              contactUsRow.style.display = 'block';
          } else {
              statusElement.textContent = 'Unknown';
              contactUsRow.style.display = 'none';
          }

          const calendlyElement = document.getElementById('doctorCalendlyURL');
          if (doctor.calendlyURL) {
              calendlyElement.innerHTML = `<a href="${doctor.calendlyURL}" target="_blank">${doctor.calendlyURL}</a>`;
          } else {
              calendlyElement.textContent = 'Contact Us to Get Approved';
          }
      } else {
          throw new Error('Doctor not found');
      }
  } catch (error) {
      console.error('Error fetching doctor profile:', error);
      alert('Failed to load doctor details. Please try again.');
  }
});
