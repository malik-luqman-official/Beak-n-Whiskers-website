const pageTitle = document.createElement('pageTitle');

pageTitle.innerHTML=`
      <div class="container-fluid">
      <div class="overlay">
        <img
          src="images/title img.jpg"
          alt="beak n whiskers"
          class="background-img"
        />
        <div class="content">
          <h1 class="title">Title</h1>
        </div>
      </div>
    </div>
`
document.body.prepend(pageTitle);
