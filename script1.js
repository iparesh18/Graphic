const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Search Functionality */ 

const UNSPLASH_API_KEY = "Ps_Za7oN11AN73hqKwv9gZBCdvXIb_wO1t0o_qkwSfw"; // Replace with your API key
const designGrid = document.getElementById("designGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Click event for search button
searchButton.addEventListener("click", () => {
  searchImages();
});

// Enter key event for search input
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchImages();
  }
});

async function searchImages() {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a search term!");
    return;
  }

  designGrid.innerHTML = `<p class="loading">🔄 Loading images...</p>`; // Loading message

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=27&orientation=landscape&client_id=${UNSPLASH_API_KEY}`
    );

    const data = await response.json();
    designGrid.innerHTML = ""; // Clear previous content

    if (data.results.length === 0) {
      designGrid.innerHTML = "<p>No images found. Try another search!</p>";
      return;
    }

    data.results.forEach(photo => {
      const designCard = document.createElement("div");
      designCard.classList.add("design-card");

      const imgElement = document.createElement("img");
      imgElement.src = photo.urls.regular;
      imgElement.alt = query;
      imgElement.loading = "lazy"; // Optimize performance

      const linkElement = document.createElement("a");
      linkElement.href = photo.links.html;
      linkElement.target = "_blank"; // Open Unsplash image in a new tab
      linkElement.appendChild(imgElement);

      designCard.appendChild(linkElement);
      designGrid.appendChild(designCard);
    });

  } catch (error) {
    designGrid.innerHTML = "<p>🚨 Failed to load images. Try again later!</p>";
    console.error("Error fetching images:", error);
  }
}
