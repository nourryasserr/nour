document.getElementById("submitButton").addEventListener("click", function () {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Reset error styles and messages
    nameInput.style.border = "";
    emailInput.style.border = "";
    messageInput.style.border = "";
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    let isValid = true;

    // Validate name
    if (!name || /\d/.test(name)) {
        nameInput.style.border = "2px solid red";
        nameError.textContent = "Please enter a valid name.";
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailInput.style.border = "2px solid red";
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate message
    if (!message) {
        messageInput.style.border = "2px solid red";
        messageError.textContent = "Please fill out the message field.";
        isValid = false;
    }

    if (isValid) {
        console.log(`Message from ${name} (${email}): ${message}`);
        alert(`Thank you, ${name}! Your message has been sent.`);
        // Reset form fields
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }
});
