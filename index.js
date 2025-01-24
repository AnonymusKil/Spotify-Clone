const searchButton = document.getElementById('searchButton');
const searchQueryInput = document.getElementById('searchQuery');
const resultsDiv = document.getElementById('results');

// Replace this with your actual token
const accessToken = 'YOUR_ACCESS_TOKEN';

// Event listener for search button
searchButton.addEventListener('click', () => {
  const query = searchQueryInput.value;

  if (query) {
    search(query);
  }
});

// Function to search for tracks
function search(query) {
  const url = https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10;

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': Bearer ${accessToken},
    },
  })
    .then(response => response.json())
    .then(data => {
      displayResults(data.tracks.items);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display results for tracks
function displayResults(tracks) {
  resultsDiv.innerHTML = ''; // Clear previous results

  if (tracks.length === 0) {
    resultsDiv.innerHTML = '<p>No tracks found</p>';
    return;
  }

  tracks.forEach(track => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');

    const name = track.name;
    const artists = track.artists.map(artist => artist.name).join(', ');
    const albumName = track.album.name;
    const image = track.album.images[0]?.url || 'default-image-url.jpg';

    resultElement.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
      <p>Artist(s): ${artists}</p>
      <p>Album: ${albumName}</p>
    `;

    resultsDiv.appendChild(resultElement);
  });
}