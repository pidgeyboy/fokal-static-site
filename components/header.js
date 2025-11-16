// Load header HTML
async function loadHeader() {
    try {
        const response = await fetch('/components/header.html');
        const html = await response.text();
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
            initializeBurgerMenu();
            initializeScrollEffect();
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Initialize burger menu functionality
function initializeBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Initialize scroll effect for navbar
function initializeScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeader);
