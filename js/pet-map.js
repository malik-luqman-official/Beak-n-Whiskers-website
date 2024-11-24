let map;

function initMap() {
  // Check if geolocation is available in the browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize the map centered on the user's location
        map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 14,
        });

        // Add a marker for the user's location
        new google.maps.Marker({
          position: userLocation,
          map,
          title: "You are here",
        });

        // Search for nearby pet-friendly places
        const request = {
          location: userLocation,
          radius: 5000, // 5km radius
          keyword: "pet",
        };

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              createMarker(place);
            });
          } else {
            alert("No pet-friendly places found nearby.");
          }
        });
      },
      () => {
        alert("Geolocation failed. Please enable location services.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Create a marker for each nearby place
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    title: place.name,
  });

  // Add an info window for the marker
  const infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(
      `<div>
        <h3>${place.name}</h3>
        <p>${place.vicinity}</p>
        <p>Rating: ${place.rating || "N/A"} ★</p>
      </div>`
    );
    infowindow.open(map, marker);
  });
}
navigator.geolocation.getCurrentPosition((position) => {
  const userLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  map.setCenter(userLocation);
});
