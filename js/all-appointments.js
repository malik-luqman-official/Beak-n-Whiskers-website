document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage
    if (!token) {
        // Handle missing token
        console.error("JWT token is missing");
        return;
    }

    try {
        // Decode the JWT token to extract the user ID
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = JSON.parse(atob(payloadBase64));
        const userId = payloadDecoded._id; // Extract the user ID from the decoded token

        // Fetch user data using the user ID
        const userResponse = await fetch(`${API_URL}/user/${userId}`, { // Use '/user/:id' to get user data
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();

        // Get the Calendly URL from the user data
        const calendlyURL = userData.calendlyURL; // Assuming Calendly URL is part of user data

        // Fetch appointments using the Calendly URL
        const appointmentsResponse = await fetch(`${API_URL}/appointment/calendly/appointments?calendlyURL=${encodeURIComponent(calendlyURL)}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!appointmentsResponse.ok) {
            throw new Error("Failed to fetch appointments from Calendly");
        }

        const appointmentsData = await appointmentsResponse.json();

        // Log appointments response to check the structure
        console.log(appointmentsData);

        // Ensure the appointmentsData contains the 'appointments' array
        if (appointmentsData && Array.isArray(appointmentsData.appointments)) {
            displayAppointments(appointmentsData.appointments); // Function to display the appointments
        } else {
            console.error('Appointments data does not contain an array of appointments', appointmentsData);
        }

    } catch (error) {
        console.error('Error fetching user info or appointments:', error);
    }
});

// Function to display the appointments
const displayAppointments = (appointments) => {
    const appointmentsContainer = document.querySelector('#appointments-container');
    
    // Check if the container exists
    if (!appointmentsContainer) {
        console.error("Appointments container not found.");
        return;
    }

    appointments.forEach(appointment => {
        const appointmentCard = document.createElement('div');
        appointmentCard.classList.add('col');  // Adjusted for your grid system

        // Extracting values from the appointment object
        const inviteeName = appointment.event_memberships[0]?.user_name || 'Invitee Name Not Available';
        const inviteeEmail = appointment.event_memberships[0]?.user_email || 'Email Not Available';
        const status = appointment.status ? appointment.status : 'No Status Available';
        const startTime = appointment.start_time ? new Date(appointment.start_time).toLocaleString() : 'No Start Time Available';
        const endTime = appointment.end_time ? new Date(appointment.end_time).toLocaleString() : 'No End Time Available';
        const location = appointment.location ? appointment.location.location : 'Location Not Available';

        // Construct the appointment card
        appointmentCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <!-- Title with invitee name -->
                    <h5 class="card-title mt-2">${inviteeName}</h5>
                    <p class="text-muted mb-3">${inviteeEmail}</p>
                    
                    <!-- Badge for status -->
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${status}</span>
                    </div>
                    <hr>

                    <!-- Appointment details -->
                    <div class="d-flex flex-column">
                        <div class="d-flex align-items-center mb-2">
                            <span class="text-muted">Location:</span>
                            <span class="ms-2 text-dark">${location}</span>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <span class="text-muted">Start Time:</span>
                            <span class="ms-2 text-dark">${startTime}</span>
                        </div>
                        <div class="d-flex align-items-center mb-2">
                            <span class="text-muted">End Time:</span>
                            <span class="ms-2 text-dark">${endTime}</span>
                        </div>
                    </div>

                    <!-- View Details Button -->
                    <a href="appointment-details.html?id=${appointment.calendar_event.external_id}">
                        <button class="btn main-button btn-sm mt-4">View Details</button>
                    </a>
                </div>
            </div>
        `;
        
        appointmentsContainer.appendChild(appointmentCard);
    });
};
