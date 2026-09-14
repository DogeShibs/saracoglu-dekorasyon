// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Kapatma Linki Tıklanırsa
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
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

// Form Validation ve Gönderim
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Form Validasyonu
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Lütfen tüm alanları doldurunuz!');
            return;
        }

        // Email validasyonu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Lütfen geçerli bir email adresi giriniz!');
            return;
        }

        // Telefon validasyonu
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('Lütfen geçerli bir telefon numarası giriniz!');
            return;
        }

        // Başarı mesajı
        alert(`Teşekkür ederiz ${formData.name}! Mesajınız alındı. En kısa zamanda sizinle iletişime geçeceğiz.`);
        contactForm.reset();
    });
}

// Scroll Animasyonları
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Service Cards Gözleme Başla
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Portfolio Items Gözleme Başla
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Stat Numbers Animasyonu
const animateNumbers = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = Date.now();

    const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        
        element.textContent = value + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(num => {
                animateNumbers(num);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Active Nav Link Gösterme
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Sayfa Yükleme Animasyonu
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Back to Top Button (Opsiyonel)
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '⬆️';
backToTopButton.id = 'backToTop';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Efekti (Opsiyonel)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.pageYOffset * 0.5}px`;
    }
});

// Lazy Loading Placeholder
document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.3s ease';
});

console.log('Saraçoğlu Dekorasyon Web Sitesi Yüklendi ✅');