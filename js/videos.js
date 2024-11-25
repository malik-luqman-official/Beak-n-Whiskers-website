document.addEventListener('DOMContentLoaded', async function () {
    const API_URL = 'http://localhost:3000/api/v1';
    const videoCardsContainer = document.getElementById('video-cards');
  
    try {
      const response = await fetch(`${API_URL}/videos/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
  
      const videos = await response.json();
  
      if (videos && videos.length > 0) {
        // Dynamically create video cards
        videos.forEach(video => {
          const videoCard = document.createElement('div');
          videoCard.classList.add('col');
  
          videoCard.innerHTML = `
            <div class="card">
              <img src="${video.thumbnail}" class="card-img-top" style="border-radius:20px" alt="${video.title}">
              <div class="card-body">
                <h5 class="card-title">${video.title}</h5>
                <p class="card-text">${video.description || 'No description available'}</p>
                <a href="${video.url}" target="_blank" class="btn main-button">Watch on YouTube</a>
              </div>
            </div>
          `;
  
          videoCardsContainer.appendChild(videoCard);
        });
  
        // Create a new div for the "Watch More on YouTube" button
        const buttonRow = document.createElement('div');
        buttonRow.classList.add('row', 'mt-4');
  
        buttonRow.innerHTML = `
          <div class="col-12 text-center">
            <a href="https://www.youtube.com/results?search_query=pets" target="_blank" class="btn main-button">
              Watch More on YouTube
            </a>
          </div>
        `;
  
        // Append the new row after the video cards
        videoCardsContainer.parentElement.appendChild(buttonRow);
      } else {
        videoCardsContainer.innerHTML = '<p>No videos found.</p>';
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      videoCardsContainer.innerHTML = '<p>Failed to load videos.</p>';
    }
  });
  