document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header height
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .service-card, .section-title, .about-content');

    animateElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    /* --- Modal Logic (Global) --- */
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Clear content if it's the lightbox to stop video/reset state if needed
            if (modal.id === 'lightboxModal') {
                const body = modal.querySelector('.lightbox-content');
                if (body) body.innerHTML = '';
            }
        }, 300); // Match transition duration
    }

    // Close on 'x' click
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.modal.show');
            if (visibleModal) {
                closeModal(visibleModal);
            }
        }
    });

    /* --- Portfolio Lightbox --- */
    // Inject Lightbox Modal if not present (for portfolio page)
    if (!document.getElementById('lightboxModal') && document.querySelector('.project-card')) {
        const lightboxHtml = `
        <div id="lightboxModal" class="modal">
            <span class="close-modal" style="position: absolute; top: 20px; right: 30px; z-index: 2001; color: white;">&times;</span>
            <div class="lightbox-content">
                <!-- Content injected via JS -->
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxHtml);

        // Add close listener to new lightbox close button
        const newClose = document.querySelector('#lightboxModal .close-modal');
        newClose.addEventListener('click', () => closeModal(document.getElementById('lightboxModal')));

        // Add click listeners to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', function () {
                const img = this.querySelector('img');
                const title = this.querySelector('h4').innerText;
                const desc = this.querySelector('p').innerText;
                const imgSrc = img ? img.src : null;

                if (imgSrc) { // Only open if there's an image
                    const lightboxModal = document.getElementById('lightboxModal');
                    const content = lightboxModal.querySelector('.lightbox-content');

                    content.innerHTML = `
                        <img src="${imgSrc}" class="lightbox-img" alt="${title}">
                        <div class="lightbox-caption">
                            <h3>${title}</h3>
                            <p>${desc}</p>
                            ${card.dataset.tools ? `<div style="margin-top: 1rem; text-align: left; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 6px;"><strong>🛠️ Tools Used:</strong> <span style="color: #ccc;">${card.dataset.tools}</span></div>` : ''}
                            ${card.dataset.breakdown ? `<div style="margin-top: 0.5rem; text-align: left; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 6px;"><strong>📝 Breakdown:</strong> <span style="color: #ccc;">${card.dataset.breakdown}</span></div>` : ''}
                            ${card.dataset.outcome ? `<div style="margin-top: 0.5rem; text-align: left; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 6px;"><strong>✅ Outcome:</strong> <span style="color: #ccc;">${card.dataset.outcome}</span></div>` : ''}
                        </div>
                    `;

                    lightboxModal.style.display = 'block';
                    // Trigger reflow
                    void lightboxModal.offsetWidth;
                    lightboxModal.classList.add('show');
                }
            });

            // Add pointer cursor to indicate interactiveness
            card.style.cursor = 'pointer';
        });
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
