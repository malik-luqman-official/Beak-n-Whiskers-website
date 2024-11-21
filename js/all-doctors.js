document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "http://localhost:3000/api/v1";
  const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage

  if (!token) {
    console.error("No token found in local storage.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/doctor/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }

  
    const data = await response.json();
    console.log(data)
    const doctorCardsContainer = document.getElementById("doctor-cards");

    if (data && data.length > 0) {
      data.forEach((doctor) => {
        const doctorCard = document.createElement("div");
        doctorCard.classList.add("col");
        doctorCard.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title mt-2">${doctor.fullName}</h5>
                  <span class="badge bg-primary">${
                    doctor.specialization || "No Specialization"
                  }</span>
                </div>
                <hr />
                <div class="d-flex flex-column">
                  <div class="mb-2">
                    <i class="fas fa-phone-alt me-2 text-muted"></i>
                    <span class="text-muted meta-data">${doctor.phone || "N/A"}</span>
                  </div>
                  <div class="mb-2">
                    <i class="fas fa-envelope me-2 text-muted"></i>
                    <span class="text-muted meta-data">${doctor.email || "N/A"}</span>
                  </div>
                </div>
                <a href="doctor-profile.html?id=${doctor._id}">
                  <button class="btn main-button mt-4">View Doctor Details</button>
                </a>
              </div>
            </div>
          `;
        doctorCardsContainer.appendChild(doctorCard);
      });
    } else {
      doctorCardsContainer.innerHTML = "<p>No doctors found.</p>";
    }
    
  } catch (error) {
    console.error("Error fetching doctors:", error);
    document.getElementById("doctor-cards").innerHTML =
      "<p>Failed to load doctors.</p>";
  }
});
