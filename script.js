const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  minutes = minutes.toString().padStart(2, "0"); // Ensure two digits

  document.getElementById("timeDisplay").textContent = `[ ${hours}:${minutes} ${amPm} ]`;
}

setInterval(updateTime, 1000);
updateTime(); // Initial call
