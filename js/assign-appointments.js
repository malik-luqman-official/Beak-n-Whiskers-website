document.addEventListener("DOMContentLoaded", async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage

    if (!token) {
        console.error("No token found in local storage.");
        alert("Please log in to access this page.");
        window.location.href = "login.html"; // Redirect to login page if no token
        return;
    }

    // Extract doctorId and petId from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get("doctorId");
    const petId = urlParams.get("petId");

    if (!doctorId || !petId) {
        alert("Invalid doctor or pet ID.");
        return;
    }

    try {
        // Fetch doctor details
        const doctorResponse = await fetch(`${API_URL}/doctor/${doctorId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!doctorResponse.ok) {
            throw new Error("Failed to fetch doctor details.");
        }

        const doctorData = await doctorResponse.json();
        console.log(doctorData); // Log doctor data to inspect its structure
        const selectedDoctor = doctorData; // Directly use doctorData

        if (!selectedDoctor) {
            throw new Error("Doctor data is missing or malformed.");
        }

        // Fetch pet details
        const petResponse = await fetch(`${API_URL}/pet/${petId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!petResponse.ok) {
            throw new Error("Failed to fetch pet details.");
        }

        const petData = await petResponse.json();
        console.log(petData); // Log pet data to inspect its structure
        const selectedPet = petData.data; // Directly access the pet data

        if (!selectedPet) {
            throw new Error("Pet data is missing or malformed.");
        }

        // Display doctor details
        document.getElementById("selected-doctor-name").textContent = selectedDoctor.fullName; 

        // Display pet details
        document.getElementById("selected-pet-name").textContent = selectedPet.petName;

        // Handle the appointment assignment
        document.getElementById("assign-appointment-btn").addEventListener("click", async function () {
            try {
                const response = await fetch(`${API_URL}/appointment/assign`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        doctor_id: selectedDoctor._id,
                        pet_id: selectedPet._id
                    })
                });

                
                    alert("Appointment assigned successfully!");
                    window.location.href = `book-on-calendly.html?doctorId=${selectedDoctor._id}`; // Include doctorId in the query
                
            } catch (error) {
                console.error("Error assigning appointment:", error);
                alert("There was an error assigning the appointment.");
            }
        });

    } catch (error) {
        console.error("Error loading doctor or pet details:", error);
        alert("There was an error loading the doctor or pet details.");
    }
});
