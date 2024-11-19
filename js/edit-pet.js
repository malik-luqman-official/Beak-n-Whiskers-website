const API_URL = 'http://localhost:3000/api/v1';
const token = localStorage.getItem('jwtToken');
const petId = querySelector('query')

async function fetchPetData() {
    try {
        const response = await fetch(`${API_URL}/pet/${petId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch pet data');
        }

        const data = await response.json();

        if (data && data.pet) {
            const pet = data.pet;
            document.getElementById("petName").value = pet.petName;
            document.getElementById("gender").value = pet.gender;
            document.getElementById("dob").value = pet.birthDate;
            document.getElementById("breed").value = pet.breed;
            document.getElementById("color").value = pet.color;
            document.getElementById("category").value = pet.category_id;
            // Handle neutered
            const neuteredRadio = document.querySelector(`input[name="neutered"][value="${pet.neutered ? 'yes' : 'no'}"]`);
            if (neuteredRadio) neuteredRadio.checked = true;
        }
    } catch (error) {
        console.error("Error fetching pet data:", error);
        alert("An error occurred while fetching the pet profile.");
    }
}

fetchPetData();


document.getElementById("petForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    const petName = document.getElementById("petName").value;
    const gender = document.getElementById("gender").value;
    const birthDate = document.getElementById("dob").value;
    const breed = document.getElementById("breed").value;
    const color = document.getElementById("color").value;
    const neutered = document.querySelector('input[name="neutered"]:checked') ? 
        document.querySelector('input[name="neutered"]:checked').value === 'yes' : false;
    const selectedCategoryId = document.getElementById("category").value;

    // Validate form fields before proceeding
    if (!petName || !gender || !birthDate || !breed || !color || !selectedCategoryId || neutered === undefined) {
        alert("Please fill all required fields.");
        return;
    }

    const petData = {
        petName,
        gender,
        birthDate,
        breed,
        color,
        neutered,
        category_id: selectedCategoryId
    };

    try {
        const response = await fetch(`${API_URL}/pet/${petId}`, {
            method: "PUT", 
            body: JSON.stringify(petData),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (response.ok) {
            alert("Pet profile updated successfully!");
            // Optionally redirect to a different page or reset the form
            document.getElementById("petForm").reset();
        } else {
            console.error("Failed to update pet profile:", result);
            alert("Failed to update pet profile: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the pet profile.");
    }
});
