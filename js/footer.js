const footer = document.createElement('footer');

footer.innerHTML = `
  <!-- Start of footer -->
  <div class="container-fluid footer">
    <footer class="text-white text-center text-lg-start" ">
      
      <!-- Grid container -->
      <div class="container p-4">

        <!-- Grid row -->
        <div class="row mt-4">
          
          <!-- Column 1: Logo and Social -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="footer-logo mb-3">
                <h3 class="text-light">Beak n Whiskers</h3>
              
            </div>

          </div>

          <!-- Column 2: Menu -->
          <div class="col-lg-4 col-md-6 mb-4">
            <h5 class="text-uppercase mb-4">Menu</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="index.html" class="text-light">Home</a></li>
              <li class="mb-2"><a href="videos.html" class="text-light">Watch Videos</a></li>
              <li class="mb-2"><a href="explore-locations.html" class="text-light">Explore Locations</a></li>
              <li class="mb-2"><a href="contact-us.html" class="text-light">Contact Us</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact -->
          <div class="col-lg-4 col-md-6 mb-4">
            <h5 class="text-uppercase mb-4">Contact</h5>
            <ul class="fa-ul" style="margin-left: 1.65em;">
              <li class="mb-3">
                <span class="fa-li"><i class="fas fa-home"></i></span>
                <a class="text-light">New York, NY 10012, US</a>
              </li>
              <li class="mb-3">
                <span class="fa-li"><i class="fas fa-envelope"></i></span>
                <a class="text-light" href="mailto:info@example.com">info@example.com</a>
              </li>
              <li class="mb-3">
                <span class="fa-li"><i class="fas fa-phone"></i></span>
                <a class="text-light" href="tel:01 234 567 88">+ 01 234 567 88</a>
              </li>
              <li class="mb-3">
                <span class="fa-li"><i class="fas fa-print"></i></span>
                <a class="text-light" h>+ 01 234 567 89</a>
              </li>
            </ul>
          </div>

        </div>
        <!-- Grid row -->

      </div>
      <!-- Grid container -->

      <!-- Copyright -->
      <div class="text-center p-3 pb-1" style="background-color: #ff9972">
      <p style="color:black!important">
        © 2024 Copyright Beak n Whiskers
      <p>
      </div>
      <!-- Copyright -->

    </footer>
  </div>
  <!-- End of .container -->
`;
document.body.append(footer);
