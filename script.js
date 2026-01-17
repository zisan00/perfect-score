// Simple practice feedback (UI only)
const options = document.querySelectorAll(".option");

options.forEach(option => {
  option.addEventListener("click", () => {
    alert("Answer recorded. Review will be added later.");
  });
});
