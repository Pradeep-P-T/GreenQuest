document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});
// Select the theme toggle button
const themeToggle = document.getElementById('themeToggle');

// Check if dark mode was previously enabled
const isDarkMode = localStorage.getItem('dark-mode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Switch to sun icon
}

// Add click event listener to toggle dark mode
themeToggle.addEventListener('click', () => {
    const isDarkModeActive = document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = isDarkModeActive 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';

    // Save the theme preference
    localStorage.setItem('dark-mode', isDarkModeActive);
});

