// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Scroll to products function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Product card animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card, .feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Hero image rotation
const heroCard = document.getElementById('hero-card');
const productImages = [
    'Voltura Compact.png',
    'Voltura Max.png',
    'Voltura Pro.png'
];

let currentImageIndex = 0;

function rotateHeroImage() {
    if (heroCard) {
        const heroImage = heroCard.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.opacity = '0';
            setTimeout(() => {
                currentImageIndex = (currentImageIndex + 1) % productImages.length;
                heroImage.src = productImages[currentImageIndex];
                heroImage.style.opacity = '1';
            }, 300);
        }
    }
}

// Rotate hero image every 4 seconds
setInterval(rotateHeroImage, 4000);

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add to cart functionality - Updated to redirect to payment page
function addToCart(productId, productName, price, imagePath) {
    // Store product information in localStorage
    const productData = {
        id: productId,
        name: productName,
        price: price,
        image: imagePath,
        quantity: 1
    };
    
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Updated Add to Cart button functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-product').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image').src;
            const productId = productCard.getAttribute('data-product');
            
            // Extract numeric price from text (remove ₹ symbol)
            const numericPrice = parseFloat(productPrice.replace('₹', '').replace(',', ''));
            
            // Get image filename from src
            const imageName = productImage.split('/').pop();
            
            // Call addToCart function
            addToCart(productId, productName, numericPrice, imageName);
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.innerHTML = `
                <div style="
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: linear-gradient(135deg, #28a745, #20c997);
                    color: #fff;
                    padding: 15px 25px;
                    border-radius: 10px;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
                ">
                    <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
                    Message sent successfully!
                </div>
            `;
            
            document.body.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Add entrance animations to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
    
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.animation = 'fadeInRight 1s ease 0.3s both';
    }
});

// Add more CSS animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(additionalStyle);