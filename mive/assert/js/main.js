/* ======================================================
   STUDENT PORTFOLIO
   Main JavaScript
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================================
       MOBILE MENU
    =========================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });

    }

    /* ===========================================
       CURRENT YEAR
    =========================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* ===========================================
       BACK TO TOP BUTTON
    =========================================== */

    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", () => {

        if (!topBtn) return;

        if (window.scrollY > 400) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    if (topBtn) {

        topBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ===========================================
       TYPING EFFECT
    =========================================== */

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        const words = [
            "medical Doctor",

            "Data Science Student",

            "Machine Learning Enthusiast",

            "Data Analyst",

            "Visualization Specialist",

            "Aspiring Data Scientist"

        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, charIndex++);

                if (charIndex > currentWord.length) {

                    deleting = true;

                    setTimeout(type, 1200);

                    return;

                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length)
                        wordIndex = 0;

                }

            }

            setTimeout(type, deleting ? 40 : 90);

        }

        type();

    }

    /* ===========================================
       COUNTER ANIMATION
    =========================================== */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = +counter.dataset.target;

            const speed = 50;

            const updateCounter = () => {

                const current = +counter.innerText;

                const increment = Math.ceil(target / speed);

                if (current < target) {

                    counter.innerText = current + increment;

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ===========================================
       DARK MODE
    =========================================== */

    const themeBtn = document.getElementById("themeBtn");

    const body = document.body;

    // Load saved theme

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fas fa-sun"></i>';

        }

    }

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            body.classList.toggle("dark");

            if (body.classList.contains("dark")) {

                localStorage.setItem("theme", "dark");

                themeBtn.innerHTML =
                    '<i class="fas fa-sun"></i>';

            } else {

                localStorage.setItem("theme", "light");

                themeBtn.innerHTML =
                    '<i class="fas fa-moon"></i>';

            }

        });

    }

    /* ===========================================
       SCROLL REVEAL
    =========================================== */

    const revealElements = document.querySelectorAll(

        ".card, .project-card, .skill, .about, .cta"

    );

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

});

// Project filters (projects page)
document.addEventListener("DOMContentLoaded", () => {
    const filterBar = document.querySelector('.filters');
    if (!filterBar) return;

    const buttons = filterBar.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const projects = document.querySelectorAll('.project-card');

            projects.forEach(p => {
                const categories = p.dataset.category ? p.dataset.category.split(' ') : [];
                if (filter === 'all' || categories.includes(filter)) {
                    p.style.display = '';
                } else {
                    p.style.display = 'none';
                }
            });

        });
    });
});