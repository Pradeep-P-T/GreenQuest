// Hamburger menu for mobile navbar
const hamburger = document.getElementById('hamburger');
const navbarLinks = document.querySelector('.navbar-links');

hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('hidden');
});

// Contact form submission (simulated)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
});
