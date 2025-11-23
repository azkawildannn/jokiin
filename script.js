// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu');

    if (mobileMenuBtn && mobileMenuOverlay && closeMenuBtn) {
        // Function to open menu
        const openMenu = () => {
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Function to close menu
        const closeMenu = () => {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Open menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });

        // Close menu
        closeMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });

        // Close menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});

// Smooth Scroll
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

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Get form data
            const formData = new FormData(form);
            const formValues = {};
            formData.forEach((value, key) => {
                formValues[key] = value;
            });

            // Format message for WhatsApp
            let message = 'Assalamualaikum Wr. Wb.\n\n';
            message += 'Halo Admin Jokiin, saya tertarik dengan layanan jasa joki yang ditawarkan.\n\n';
            message += 'Berikut adalah detail informasi saya:\n\n';
            message += `Nama Lengkap: ${formValues.name || '-'}\n`;
            message += `Email: ${formValues.email || '-'}\n`;
            message += `No. WhatsApp: ${formValues.phone || '-'}\n`;
            message += `Jenis Layanan: ${formValues.service || '-'}\n`;
            message += `Deadline: ${formValues.deadline || '-'}\n`;
            message += `Detail Tugas: ${formValues.message || '-'}\n\n`;
            message += 'Terima kasih atas perhatiannya.\n';
            message += 'Wassalamualaikum Wr. Wb.';

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp number
            const whatsappNumber = '6287851824163';
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Reset form
            form.reset();
        } else {
            alert('Mohon lengkapi semua field yang wajib diisi.');
        }
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Close other answers
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherAnswer = otherQuestion.nextElementSibling;
                const otherIcon = otherQuestion.querySelector('i');
                otherAnswer.style.maxHeight = null;
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current answer
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
        icon.style.transform = icon.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// Testimonial Slider
if (document.querySelector('.testimonial-slider')) {
    const swiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 3
            }
        }
    });
}

// Rating System
const ratingInputs = document.querySelectorAll('.rating-input i');
ratingInputs.forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.dataset.rating;
        ratingInputs.forEach(s => {
            if (s.dataset.rating <= rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-top-btn.show {
        opacity: 1;
        visibility: visible;
    }

    .scroll-top-btn:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }

    .error {
        border-color: var(--accent-color) !important;
    }
`;
document.head.appendChild(style);

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
}); 