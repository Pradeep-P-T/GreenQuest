document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Display success message and reset the form
        successMessage.style.display = "block";
        form.reset();

        // Hide the success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 5000);
    });
});
