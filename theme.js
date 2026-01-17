/* =====================================================
   THEME HANDLER (LIGHT / DARK)
   ===================================================== */

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const logo = document.getElementById("siteLogo");

// Apply theme and update logo + icon
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("ps_theme", theme);

  if (logo) {
    logo.src = theme === "dark" ? "logo-negative.png" : "logo.png";
  }

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("ps_theme") || "light";
applyTheme(savedTheme);

// Toggle on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}
