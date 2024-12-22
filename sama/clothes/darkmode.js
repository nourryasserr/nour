document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggle.addEventListener("click",function() {
        body.classList.toggle("dark-mode");

        // Change the icon and text on the button
        if (body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        } else {
            themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      }
    });
});