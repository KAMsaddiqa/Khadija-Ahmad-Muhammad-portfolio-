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

    const printCvBtn = document.getElementById("printCvBtn");
    const printPreviewBtn = document.getElementById("printPreviewBtn");
    const printDirectBtn = document.getElementById("printDirectBtn");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const savePdfBtn = document.getElementById("savePdfBtn");
    const cvPdfUrl = "assert/doc/Resume%20updated.pdf";

    const buildCvPreviewHtml = () => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>CV Print Preview</title>
                <style>
                    body { margin:0; font-family: 'Poppins', sans-serif; background:#f8fafc; color:#111827; }
                    .toolbar { display:flex; flex-wrap:wrap; gap:12px; padding:18px; background:white; border-bottom:1px solid #e5e7eb; align-items:center; }
                    .toolbar button, .toolbar a { padding:12px 20px; border-radius:999px; border:none; cursor:pointer; font-weight:600; text-decoration:none; }
                    .btn-primary { background:#2563eb; color:#fff; }
                    .btn-secondary { background:#f8fafc; color:#2563eb; border:1px solid #2563eb; }
                    .iframe-wrap { position:absolute; inset:0; top:70px; }
                    iframe { width:100%; height:100%; border:none; }
                </style>
            </head>
            <body>
                <div class="toolbar">
                    <button id="previewPrintBtn" class="btn-primary">Print</button>
                    <a href="${cvPdfUrl}" download="resume.pdf" class="btn-secondary">Download PDF</a>
                    <button id="previewSaveBtn" class="btn-secondary">Save as PDF</button>
                </div>
                <div class="iframe-wrap">
                    <iframe src="${cvPdfUrl}"></iframe>
                </div>
                <script>
                    document.getElementById('previewPrintBtn').addEventListener('click', () => window.print());
                    document.getElementById('previewSaveBtn').addEventListener('click', () => window.print());
                </script>
            </body>
            </html>
        `;
    };

    if (printCvBtn) {
        printCvBtn.addEventListener("click", () => {
            window.open(cvPdfUrl, "_blank");
        });
    }

    if (printPreviewBtn) {
        printPreviewBtn.addEventListener("click", () => {
            const preview = window.open("", "_blank", "width=1000,height=800");
            if (!preview) return;
            preview.document.write(buildCvPreviewHtml());
            preview.document.close();
        });
    }

    if (printDirectBtn) {
        printDirectBtn.addEventListener("click", () => {
            const direct = window.open(cvPdfUrl, "_blank");
            if (!direct) return;
            direct.focus();
            direct.onload = () => direct.print();
        });
    }

    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener("click", () => {
            const link = document.createElement('a');
            link.href = cvPdfUrl;
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    if (savePdfBtn) {
        savePdfBtn.addEventListener("click", () => {
            const preview = window.open(cvPdfUrl, "_blank");
            if (!preview) return;
            preview.focus();
            preview.onload = () => preview.print();
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