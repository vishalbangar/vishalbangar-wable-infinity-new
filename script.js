// Animate "Wable Infinity" text in the header with Indian flag colors
const name = "WABLE INFINITY";
const container = document.getElementById("animated-text");

[...name].forEach((char, index) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animationDelay = `${index * 0.1}s`; // Delay for each letter

    // Indian flag color logic
    if (index < 5) { // "WABLE" (index 0 to 4)
        span.style.color = "#FF9933"; // Saffron
    } else if (index === 5) { // Space between "WABLE" and "INFINITY"
        span.style.color = "transparent"; // Space ko transparent rakha
    } else if (index === 6 || index === 7) { // "IN" (index 6 to 7)
        span.style.color = "#FFFFFF"; // White
    } else { // "FINITY" (index 8 to 13)
        span.style.color = "#138808"; // Green
    }

    container.appendChild(span);
});

// Slider Functionality
let slideIndex = 1;

// Initialize the slider
showSlides(slideIndex);

// Auto-slide every 5 seconds
setInterval(() => {
    plusSlides(1);
}, 5000);

// Function to move to the next/previous slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to display slides and trigger animation
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");

    // Loop back to the first slide if at the end
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // Trigger letter-by-letter animation on slide change
    triggerLetterAnimation();
}

// Function to trigger letter-by-letter animation
function triggerLetterAnimation() {
    // Select all span elements in h1 and p
    const headingSpans = document.querySelectorAll('.hero-content h1 span');
    const paragraphSpans = document.querySelectorAll('.hero-content p span');
    const heading = document.querySelector('.hero-content h1');

    // Check if it's mobile view (screen width <= 768px)
    const isMobileView = window.innerWidth <= 768;

    // Remove existing <br> tags inside h1 to avoid stacking
    const existingBrs = heading.querySelectorAll('br');
    existingBrs.forEach(br => br.remove());

    // Reset animation for heading and insert <br> in mobile view
    headingSpans.forEach((span, index) => {
        span.style.animation = 'none'; // Reset animation
        span.offsetHeight; // Trigger reflow to restart animation
        span.style.animation = 'letterFadeIn 0.5s ease forwards';
        span.style.animationDelay = `calc(0.1s * ${span.style.getPropertyValue('--letter-index')})`;

        // Insert <br> after "Welcome to" (index 9) in mobile view
        if (isMobileView && index === 9) {
            const br = document.createElement('br');
            span.parentNode.insertBefore(br, span.nextSibling);
        }
    });

    // Reset animation for paragraph
    paragraphSpans.forEach(span => {
        span.style.animation = 'none'; // Reset animation
        span.offsetHeight; // Trigger reflow to restart animation
        span.style.animation = 'letterFadeIn 0.5s ease forwards';
        span.style.animationDelay = `calc(0.1s * ${span.style.getPropertyValue('--letter-index')})`;
    });
}

// Hamburger Menu Toggle and Scroll-Triggered Animations
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Scroll-Triggered Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const scaleElements = document.querySelectorAll('.scale-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));
    scaleElements.forEach(element => observer.observe(element));

    // Initial animation on page load
    triggerLetterAnimation();
});