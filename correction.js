const clientId = "34be5377e12b4eaeb871a6377ed22fc1";
const clientSecret = "9bd98e964e7b4e3f8520a40b329cc053";
const base64Credentials = btoa(`${clientId}:${clientSecret}`);
const search = document.getElementById("search");
const btn = document.getElementById("searchSecond");
const contain = document.getElementById("container");

contain.innerHTML = "";

const accessToken =
  "BQDzg0d6hifkisDitUk9ytoPRf9mwDNPtoU9FcTvHIdD-3YmfDALxl3TnV4f9zNwUg0uqjaPuTrJZIPLyM1xSiNiCL0CGL_nz02qg_zRg3o7arQBfeA"; // Replace with a valid access token

async function getSearch() {
  const query = search.value.trim(); // Get search input value and trim whitespace

  if (!query) {
    contain.innerHTML = "Please enter a search term.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Bearer before token
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    contain.innerHTML = ""; // Clear previous results

    if (data.tracks && data.tracks.items.length > 0) {
      data.tracks.items.forEach((track) => {
        const trackElement = document.createElement("div");
        trackElement.classList.add(
          "hover:scale-105",
          "transform",
          "transition"
        );
        trackElement.innerHTML = `
          <div>
            <img src="${track.album.images[0].url}" alt="${track.name}" />
          </div>
          <div>
            <p class="font-semibold text-white">${track.name}</p>
            <p class="text-sm text-gray-400">${track.artists[0].name}</p>
          </div>
        `;
        contain.appendChild(trackElement);
      });
    } else {
      contain.innerHTML = "No results found.";
    }
  } catch (error) {
    console.error(error);
    contain.innerHTML = "An error occurred. Please try again later.";
  }
}

btn.addEventListener("click", getSearch);
