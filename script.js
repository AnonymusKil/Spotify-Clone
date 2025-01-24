const clientId = "34be5377e12b4eaeb871a6377ed22fc1";
const search = document.getElementById("search");
const dyna = document.getElementById("dynamic");
const clientSecret = "9bd98e964e7b4e3f8520a40b329cc053";
const btn = document.getElementById("searchSecond");
const contain = document.getElementById("container");
contain.innerHTML = "";
const base64Credentials = btoa(`${clientId}:${clientSecret}`);
console.log(base64Credentials);
const accessToken =
  "MzRiZTUzNzdlMTJiNGVhZWI4NzFhNjM3N2VkMjJmYzE6OWJkOThlOTY0ZTdiNGUzZjg1MjBhNDBiMzI5Y2MwNTM=";

// btn.addEventListener("click", () => {
//   const query = searchQueryInput.value;

//   if (query) {
//     search(query);
//   }
// });
async function getSearch(query) {
  const getinput = search.value;
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.tracks && data.tracks.items) {
    data.tracks.forEach((track) => {
      const trackElement = document.createElement("div");
      trackElement.classList.add("hover:scale-105", "transform", "transition");
      trackElement.innerHTML = `
        <div>
        <img src="${track.album.images[0].url}" alt="${track.name}">
        </div>
        <div>
        <p class="font-semibold text-white">${track.name} </p>
        <p class="text-sm text-gray-400">${track.artists[0].name}</p>
        </div>
        `;
      contain.appendChild(trackElement);
    });
  } else {
    contain.innerHTML = "No results found";
  }
}
btn.addEventListener("click", getSearch);
