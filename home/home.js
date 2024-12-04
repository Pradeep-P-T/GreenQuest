// Add smooth scrolling to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: 'smooth',
            });
        }
    });
});

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      themeText.textContent = 'Light Mode';
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Update icon and text
      if (isDarkMode) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = 'Dark Mode';
      }

      // Save theme to localStorage
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  });
