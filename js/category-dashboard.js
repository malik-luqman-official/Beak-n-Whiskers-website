const API_URL = 'http://localhost:3000/api/v1/category';

const token = localStorage.getItem('jwtToken');

async function addCategory() {
  const newCategory = prompt("Enter the new category name:");
  if (!newCategory) return; // If the user cancels or enters an empty string, exit the function

  try {
      const response = await fetch(`${API_URL}/add-category`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token here
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category: newCategory }) // Send the new category data
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Error response:", errorMessage);
      } else {
          fetchCategories(); // Refresh the category list after adding the new category
      }
  } catch (error) {
      console.error('Error adding category:', error);
  }
}


async function fetchCategories() {
  try {
      const response = await fetch(`${API_URL}/categories`, {
          headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token here
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Ensure response has success flag and data array
      if (result.success && Array.isArray(result.data)) {
          const categories = result.data;
          const tableBody = document.getElementById('categoryTableBody');
          tableBody.innerHTML = ''; // Clear existing content

          // Loop through categories and create rows
          categories.forEach((category, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${index + 1}</td> <!-- SR (Serial Number) -->
                  <td>${category.category}</td> <!-- Category Name -->
                  <td>
                      <button class="btn btn-secondary" onclick="editCategory('${category._id}')">Edit</button>
                      <button class="btn btn-secondary" onclick="deleteCategory('${category._id}')">Delete</button>
                  </td> <!-- Actions -->
              `;
              tableBody.appendChild(row);
          });
      } else {
          console.error('Unexpected response format:', result);
      }
  } catch (error) {
      console.error('Error fetching categories:', error);
  }
}



// Delete category by ID
async function deleteCategory(id) {
  try {
      await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token here
              'Content-Type': 'application/json'
          }
      });
      fetchCategories(); // Refresh the category list after deletion
  } catch (error) {
      console.error('Error deleting category:', error);
  }
}

// Edit category (for simplicity, using prompt; consider a form for production)
async function editCategory(id) {
  const newName = prompt("Enter the new category name:");
  if (!newName) return;

  try {
      await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${token}`, // Add Bearer token here
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category: newName })
      });
      fetchCategories(); // Refresh the category list after editing
  } catch (error) {
      console.error('Error updating category:', error);
  }
}


// Initial load
fetchCategories();
