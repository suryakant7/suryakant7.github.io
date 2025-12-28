/* ===================================
   SURYA KANT - PORTFOLIO JAVASCRIPT
   Minimal interactions for professional experience
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // HONEYCOMB CURSOR EFFECT
    // ===================================
    document.addEventListener('mousemove', function(e) {
        // Update CSS variables for mouse position
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
        
        // Add active class to body
        document.body.classList.add('mouse-active');
    });
    
    // Remove active class when mouse leaves the window
    document.addEventListener('mouseleave', function() {
        document.body.classList.remove('mouse-active');
    });
    
    // ===================================
    // MOBILE MENU TOGGLE
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            if (navMenu.classList.contains('active')) {
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }, 150);
            }
        });
    });
    
    // ===================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // NAVBAR SCROLL EFFECT
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Note: Expandable sections are now handled by enhancements.js
    
    // ===================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--color-accent)';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ===================================
    // SCROLL REVEAL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items, project cards, and other elements
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .project-card, .education-item, .achievement-card, .skill-category, .philosophy-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    // ===================================
    // BACK TO TOP BUTTON (OPTIONAL)
    // ===================================
    // Uncomment if you want to add a back-to-top button
    /*
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--color-accent);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    */
    
    // ===================================
    // TYPING EFFECT FOR HERO TITLE (OPTIONAL)
    // ===================================
    // Uncomment if you want a typing effect for the hero section
    /*
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
    */
    
    // ===================================
    // CONSOLE MESSAGE FOR RECRUITERS
    // ===================================
    console.log('%c👋 Hello, Recruiter!', 'font-size: 20px; font-weight: bold; color: #3498db;');
    console.log('%cThanks for checking the console. This shows attention to detail!', 'font-size: 14px; color: #555;');
    console.log('%cThis website is built with vanilla HTML, CSS, and JavaScript - no frameworks, just clean code.', 'font-size: 14px; color: #555;');
    console.log('%cFeel free to reach out: suryakant@example.com', 'font-size: 14px; color: #3498db;');
    
    // ===================================
    // PERFORMANCE LOGGING (DEVELOPMENT ONLY)
    // ===================================
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'font-size: 12px; color: #27ae60;');
            }, 0);
        });
    }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit how often a function can fire
 * Useful for scroll and resize events
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
