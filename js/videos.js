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
        videos.forEach(video => {
          const videoCard = document.createElement('div');
          videoCard.classList.add('col');
  
          videoCard.innerHTML = `
            <div class="card">
              <img src="${video.thumbnail}" class="card-img-top" alt="${video.title}">
              <div class="card-body">
                <h5 class="card-title">${video.title}</h5>
                <p class="card-text">${video.description || 'No description available'}</p>
                <a href="${video.url}" target="_blank" class="btn btn-primary">Watch on YouTube</a>
              </div>
            </div>
          `;
  
          videoCardsContainer.appendChild(videoCard);
        });
      } else {
        videoCardsContainer.innerHTML = '<p>No videos found.</p>';
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      videoCardsContainer.innerHTML = '<p>Failed to load videos.</p>';
    }
  });
  