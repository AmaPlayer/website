document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 12, 27, 0.95)';
            header.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            header.style.background = 'rgba(10, 25, 47, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hover effect for cards (Tilt)
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Countdown Timer (End of Month)
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        // Set launch date to end of current month
        const now = new Date();
        const launchDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();

        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const distance = launchDate - currentTime;

            if (distance < 0) {
                countdownElement.innerHTML = "<h3 style='color: var(--color-primary);'>WE ARE LIVE!</h3>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }

    // ----------------------------------------------------
    // PHASE 7: ELITE UX MOTION
    // ----------------------------------------------------

    // 1. Hero Parallax
    const heroSection = document.querySelector('.hero-wrapper');
    const heroDecor = document.querySelectorAll('.animate-float');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Only animate if near top to save performance
        if (scrolled < window.innerHeight) {
            // Background moves slow
            // We use 'background-position-y' simply or transform on a bg layer. 
            // Since we stuck to CSS background, let's just move text slightly faster for depth.
            const content = document.querySelector('.hero-content');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.4}px)`;
                content.style.opacity = 1 - (scrolled / 700);
            }

            // Floaters move at different speeds
            heroDecor.forEach((el, index) => {
                const speed = (index + 1) * 0.2;
                el.style.transform = `translateY(${scrolled * speed * -1}px)`;
            });
        }
    });

    // 2. Power Line Progress (How It Works)
    const processSection = document.querySelector('.section-py[style*="overflow: hidden"]'); // Identifying the How It Works section
    if (processSection) {
        // Create the line element dynamically if not in HTML
        let powerLine = processSection.querySelector('.power-line-fill');
        if (!powerLine) {
            const container = processSection.querySelector('div[style*="position: absolute"]');
            if (container) {
                container.classList.add('power-line-container'); // Add class for styling
                container.innerHTML = '<div class="power-line-fill"></div>';
                powerLine = container.querySelector('.power-line-fill');
            }
        }

        window.addEventListener('scroll', () => {
            const rect = processSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate percentage of section scrolled
            // Start filling when section top hits middle of screen
            let percentage = 0;
            const start = windowHeight * 0.8;
            const end = -rect.height * 0.2;

            if (rect.top < start && rect.bottom > 0) {
                const total = start - end;
                const current = start - rect.top;
                percentage = (current / total) * 100;
                percentage = Math.min(Math.max(percentage, 0), 100);

                if (powerLine) powerLine.style.width = `${percentage}%`;
            }
        });
    }
});