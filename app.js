const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");


// MENU MOBILE
menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );
});


navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});


// HEADER AU SCROLL
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// NAVIGATION ACTIVE
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// FORMULAIRE
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");


function showError(input, message) {

    const group = input.closest(".form-group");
    const error = group.querySelector(".error-message");

    error.textContent = message;

    input.setAttribute(
        "aria-invalid",
        "true"
    );

}


function clearError(input) {

    const group = input.closest(".form-group");
    const error = group.querySelector(".error-message");

    error.textContent = "";

    input.removeAttribute(
        "aria-invalid"
    );

}


// VALIDATION DE L'EMAIL
function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


// VALIDATION DU FORMULAIRE
contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let isValid = true;


        // Effacer les anciennes erreurs
        clearError(name);
        clearError(email);
        clearError(message);


        // Vérifier le nom
        if (name.value.trim() === "") {

            showError(
                name,
                "Veuillez entrer votre nom."
            );

            isValid = false;
        }


        // Vérifier l'email
        if (email.value.trim() === "") {

            showError(
                email,
                "Veuillez entrer votre adresse email."
            );

            isValid = false;

        } else if (!isValidEmail(email.value.trim())) {

            showError(
                email,
                "Veuillez entrer une adresse email valide."
            );

            isValid = false;
        }


        // Vérifier le message
        if (message.value.trim() === "") {

            showError(
                message,
                "Veuillez écrire votre message."
            );

            isValid = false;
        }


        // S'il y a des erreurs
        if (!isValid) {

            formFeedback.textContent =
                "Veuillez corriger les erreurs.";

            formFeedback.className =
                "form-feedback error";

            return;
        }


        // Formulaire valide
        formFeedback.textContent =
            "Votre message a été validé avec succès !";

        formFeedback.className =
            "form-feedback success";


        // Réinitialiser le formulaire
        contactForm.reset();

    }
);
