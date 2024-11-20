const header = document.createElement("header");

header.innerHTML = `
  <!-- start of header -->
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Navbar brand -->
      <a class="navbar-brand me-2 ml-3" href="#">
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
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div>
          <button id="addPetBtn" data-mdb-ripple-init type="button" class="main-button ml-4" style="display: none;">
            Add Your Pet
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

// Toggle buttons based on login state
function updateNavbar() {
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;
  document.getElementById("loginBtn").style.display = isLoggedIn
    ? "none"
    : "block";
  document.getElementById("signupBtn").style.display = isLoggedIn
    ? "none"
    : "block";
  document.getElementById("userDropdown").style.display = isLoggedIn
    ? "block"
    : "none";
  document.getElementById("addPetBtn").style.display = isLoggedIn
    ? "block"
    : "none";

  // If logged in, set the username if available
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("tokenObject"));
    document.getElementById("userDropdown").querySelector("a").textContent =
      user?.fullName || "User";
  }
}

// Call updateNavbar on page load
updateNavbar();
