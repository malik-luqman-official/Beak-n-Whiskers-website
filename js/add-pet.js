const API_URL = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('jwtToken');

// Fetch and populate categories
fetch(`${API_URL}/category/categories`, {
    headers: {
        'Authorization': `Bearer ${token}`, // Include token here
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            throw new Error('Unexpected response format');
        }
    })
    .then(data => {
        if (data && data.data) {
            const categoryDropdown = document.getElementById('category');
            data.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id; // category ID
                option.textContent = category.category; // category name
                categoryDropdown.appendChild(option);
            });
        } else {
            console.error("Unexpected data format:", data);
        }
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });

// Form submission
document.getElementById("petForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect form data
    // Collect form data
    const petName = document.getElementById("petName").value;
    const gender = document.getElementById("gender").value;  // Ensure this value matches the expected options (e.g., "male", "female")
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

    // Check that gender is valid (assuming "male" and "female" are the only allowed values)
    const validGenders = ["Male", "Female"];
    if (!validGenders.includes(gender)) {
        alert("Invalid gender selected.");
        return;
    }

    // Construct the data object
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
        // Send data as JSON
        const response = await fetch(`${API_URL}/pet/add-pet`, {
            method: "POST",
            body: JSON.stringify(petData), // Send data as JSON
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Set the content type to JSON
            },
        });

        const result = await response.json();
        if (response.ok) {
            alert("Pet profile created successfully!");
            document.getElementById("petForm").reset();
            window.location.href = 'all-pets.html'
        } else {
            console.error("Failed to create pet profile:", result);
            alert("Failed to create pet profile: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the pet profile.");
    }
});
