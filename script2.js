
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const paletteContainer = document.getElementById("paletteContainer");
const themeInput = document.getElementById("themeInput");
const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", generatePalette);
themeInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    generatePalette();
  }
});

function generatePalette() {
  const theme = themeInput.value.trim();
  if (theme !== "") {
    fetchColorPalette(theme);
  }
}

async function fetchColorPalette(theme) {
  paletteContainer.innerHTML = "<p> 🔄 Loading...</p>";

  try {
    const response = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: JSON.stringify({ model: "default" }),
    });

    const data = await response.json();
    if (!data.result) {
      paletteContainer.innerHTML = "<p>Failed to load colors. Try again!</p>";
      return;
    }

    paletteContainer.innerHTML = ""; // Clear previous palette

    let colors = data.result.map(color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    
    let bgColor = colors[0]; // Background color
    let textColor = colors[4]; // Text color
    let accentColor = colors[2]; // Accent color (buttons, links)

    data.result.forEach(color => {
      const hexColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.background = hexColor;
      colorBox.innerText = rgbToHex(color[0], color[1], color[2]);
      colorBox.addEventListener("click", () => copyToClipboard(colorBox.innerText));
      paletteContainer.appendChild(colorBox);
    });

    const suggestionBox = document.createElement("div");
    suggestionBox.classList.add("suggestions");
    suggestionBox.innerHTML = `
      <h3>Suggested Colors for Your Theme:</h3>
      <p><strong>Background Color:</strong> <span style="background:${bgColor}; color: white; padding: 5px 10px;">${bgColor}</span></p>
      <p><strong>Text Color:</strong> <span style="background:${textColor}; color: black; padding: 5px 10px;">${textColor}</span></p>
      <p><strong>Accent Color:</strong> <span style="background:${accentColor}; color: white; padding: 5px 10px;">${accentColor}</span></p>
    `;

    paletteContainer.appendChild(suggestionBox);
  } catch (error) {
    paletteContainer.innerHTML = "<p>Something went wrong. Try again!</p>";
    console.error("Error fetching color palette:", error);
  }
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function copyToClipboard(hex) {
  navigator.clipboard.writeText(hex);
  alert(`Copied: ${hex}`);
}


