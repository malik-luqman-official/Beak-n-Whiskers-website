const header = document.createElement("header");

header.innerHTML = `
  <!-- start of header -->
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container">
      <!-- Navbar brand -->
      <a class="navbar-brand me-2 ml-3" href="index.html">
        <img
          src="images/logo/logo.png"
          height="auto"
          width="120px"
          alt="Logo"
          loading="lazy"
          style="margin-top: -1px"
        />
      </a>

      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarButtonsExample"
        aria-controls="navbarButtonsExample"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarButtonsExample">
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 ml-5 mb-lg-0">
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Services</a>
          </li>
          <li class="nav-item ml-2">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
        </ul>
        <!-- Left links -->

        <div class="d-flex align-items-center mr-3">

          <!-- Show when logged out -->
          <a id="loginBtn" class="px-3 me-2" href="sign-in.html">
            Sign In
          </a>
          <a href="choose-your-role.html">
            <button id="signupBtn" type="button" class="main-button">
              Sign up for free
            </button>
          </a>

          <!-- Show when logged in -->
          <div id="userDropdown" class="dropdown" style="display: none;">
            <a class="dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              User Name
            </a>
            <ul class="dropdown-menu" aria-labelledby="userMenu">
              <li><a class="dropdown-item" href="#" id="profileLink">Profile</a></li>
              <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
            </ul>
          </div>
          <a href="#">
          <button id="addPetBtn" data-mdb-ripple-init type="button" class="main-button ml-4" style="display: none;">
            Add Your Pet
          </button>
          </a>
          <a href="all-doctors.html">
          <button id="bookAppointmentBtn" data-mdb-ripple-init type="button" class="main-button ml-3" style="display: none;">
            Book an Appointment
          </button>
          </a>
        </div>
      </div>
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
  <!-- end of header -->

  <div class="container-fluid page-title-bg">
    <div class="overlay">
      <div class="content">
        <h1 class="title" id="page-title">Title</h1>
      </div>
    </div>
  </div>
`;

document.body.prepend(header);

// Set page title dynamically based on URL
const pageTitle = document.getElementById("page-title");
const pageName = document.title || "Home";
pageTitle.textContent = pageName;

// Function to decode JWT payload
function decodeJWT(token) {
  const base64Url = token.split('.')[1]; // Get the payload part of the token
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace base64 URL encoding with standard base64 encoding
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload); // Return the decoded payload
}

function updateNavbar() {
  const jwtToken = localStorage.getItem("jwtToken");

  if (!jwtToken) {
    return; // If there's no token, user is not logged in
  }

  const decodedToken = decodeJWT(jwtToken); // Decode JWT manually

  const isLoggedIn = decodedToken != null;
  document.getElementById("loginBtn").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("signupBtn").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("userDropdown").style.display = isLoggedIn ? "block" : "none";

  const addPetBtn = document.getElementById("addPetBtn");
  const addPetLink = addPetBtn.closest("a"); // Get the parent <a> element
  const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");
  const bookAppointmentLink = bookAppointmentBtn.closest("a"); // Get the parent <a> element

  if (isLoggedIn) {
    // Use decoded user data
    const profileLink = document.getElementById("profileLink");

    // Set user name in the dropdown
    document.getElementById("userDropdown").querySelector("a").textContent =
      decodedToken.fullName || "User";

    // Adjust the profile link and buttons based on the user's role
    if (decodedToken.role) {
      if (decodedToken.role === 'user') {
        profileLink.href = 'user-profile.html'; // Profile link for regular users
        addPetBtn.style.display = "block";
        addPetBtn.textContent = "Add Your Pet";
        addPetLink.href = "add-pet.html"; // Set the correct link for users

        bookAppointmentBtn.style.display = "block";
        bookAppointmentBtn.textContent = "Book an Appointment";
        bookAppointmentLink.href = "all-doctors.html"; // Set the correct link for booking appointments
      } else if (decodedToken.role === 'doctor') {
        profileLink.href = 'doctor-profile.html'; // Profile link for doctors
        addPetBtn.style.display = "block";
        addPetBtn.textContent = "View Appointments";
        addPetLink.href = "all-appointments.html"; // Set the correct link for doctors

        bookAppointmentBtn.style.display = "none"; // Hide for doctors
      }
    } else {
      console.error('User role is missing!');
    }
  }
}




// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Remove JWT token and user data from localStorage
  localStorage.removeItem("jwtToken");

  // Update the navbar to reflect the logged-out state
  updateNavbar();

  // Optionally redirect to the login page
  window.location.href = "sign-in.html"; // Redirect to login page or home page
});

// Hide the page-title-bg on the index.html page
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  const pageTitleBg = document.querySelector(".page-title-bg");
  if (pageTitleBg) {
    pageTitleBg.style.display = "none";
  }
}


// Call updateNavbar on page load
updateNavbar();
