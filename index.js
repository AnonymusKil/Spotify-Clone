// Replace with your client secret

const clientId = "34be5377e12b4eaeb871a6377ed22fc1";
const clientSecret = "9bd98e964e7b4e3f8520a40b329cc053";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const base64Credentials = btoa(`${clientId}:${clientSecret}`);
// Encode client credentials in Base64
// const base64Credentials = btoa`(${clientId}:${clientSecret}`);

// Make the POST request
fetch(tokenEndpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${base64Credentials}`, // Basic Auth
  },
  body: "grant_type=client_credentials", // Grant type for client credentials flow
})
  .then((response) => {
    if (!response.ok) throw new Error("Failed to fetch access token");
    return response.json();
  })
  .then((data) => {
    console.log("Access Token:", data.access_token); // Use this token in API calls
  })
  .catch((error) => console.error("Error:", error));
