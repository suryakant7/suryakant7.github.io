/* ===================================
   PORTFOLIO ENHANCEMENTS v2.0
   Complete Interactive Expandable Sections
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. MOBILE MENU ENHANCED ANIMATIONS
    // ===================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Add click animation to nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add click animation
                this.classList.add('clicked');
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('nav-ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    this.classList.remove('clicked');
                    ripple.remove();
                }, 500);
                
                // Close mobile menu with delay for smooth transition
                if (navMenu.classList.contains('active')) {
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }, 200);
                }
            });
        });
    }
    
    // ===================================
    // 2. ABOUT SECTION - EXPANDABLE HIGHLIGHTS
    // ===================================
    const highlightItems = document.querySelectorAll('.highlight-item.expandable');
    const expandableContents = document.querySelectorAll('.expandable-content');
    
    highlightItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Close all other items first
            highlightItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            expandableContents.forEach(content => {
                if (content !== targetContent) {
                    content.classList.remove('expanded');
                }
            });
            
            // Toggle current item with animation
            this.classList.toggle('expanded');
            
            if (targetContent) {
                targetContent.classList.toggle('expanded');
                
                // Auto-scroll the horizontal timeline
                if (targetContent.classList.contains('expanded')) {
                    const timeline = targetContent.querySelector('.timeline-horizontal');
                    if (timeline) {
                        // Animate scroll to show content
                        setTimeout(() => {
                            timeline.scrollTo({ left: 0, behavior: 'smooth' });
                        }, 300);
                        
                        // Add entrance animation to items
                        const items = timeline.querySelectorAll('.timeline-item');
                        items.forEach((item, index) => {
                            item.style.animation = 'none';
                            item.offsetHeight; // Trigger reflow
                            item.style.animation = `slideInFromRight 0.5s ease forwards ${index * 0.1}s`;
                        });
                    }
                }
            }
        });
    });
    
    // ===================================
    // 3. PROFESSIONAL EXPERIENCE - COMPACT EXPANDABLE
    // ===================================
    const experienceSection = document.querySelector('#experience .timeline');
    if (experienceSection) {
        const timelineItems = experienceSection.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            if (!content) return;
            
            const header = content.querySelector('.timeline-header');
            const details = content.querySelector('.timeline-details');
            
            if (header && details) {
                // Initially hide details
                details.style.maxHeight = '0';
                details.style.overflow = 'hidden';
                details.style.opacity = '0';
                details.style.transition = 'max-height 0.5s ease, opacity 0.3s ease';
                
                // Make header clickable
                header.style.cursor = 'pointer';
                
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Close other expanded items
                    timelineItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherContent = otherItem.querySelector('.timeline-content');
                            const otherDetails = otherItem.querySelector('.timeline-details');
                            if (otherContent && otherDetails) {
                                otherContent.classList.remove('expanded');
                                otherDetails.style.maxHeight = '0';
                                otherDetails.style.opacity = '0';
                            }
                        }
                    });
                    
                    // Toggle current item
                    content.classList.toggle('expanded');
                    
                    if (content.classList.contains('expanded')) {
                        details.style.maxHeight = details.scrollHeight + 'px';
                        details.style.opacity = '1';
                        
                        // Animate list items
                        const listItems = details.querySelectorAll('li');
                        listItems.forEach((li, index) => {
                            li.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.1}s`;
                            li.style.opacity = '0';
                        });
                    } else {
                        details.style.maxHeight = '0';
                        details.style.opacity = '0';
                    }
                });
            }
        });
    }
    
    // ===================================
    // 4. PROJECTS - COMPACT EXPANDABLE
    // ===================================
    const projectCards = document.querySelectorAll('.project-card.expandable');
    
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        const title = card.querySelector('.project-title');
        const details = card.querySelector('.project-details');
        
        if (details) {
            // Initially hide details
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.opacity = '0';
            details.style.transition = 'max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease';
            details.style.paddingTop = '0';
            
            // Create click target
            const clickTarget = header || title;
            if (clickTarget) {
                clickTarget.style.cursor = 'pointer';
                
                clickTarget.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Close other cards
                    projectCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            const otherDetails = otherCard.querySelector('.project-details');
                            if (otherDetails) {
                                otherCard.classList.remove('expanded');
                                otherDetails.style.maxHeight = '0';
                                otherDetails.style.opacity = '0';
                                otherDetails.style.paddingTop = '0';
                            }
                        }
                    });
                    
                    // Toggle current card
                    card.classList.toggle('expanded');
                    
                    if (card.classList.contains('expanded')) {
                        details.style.maxHeight = details.scrollHeight + 50 + 'px';
                        details.style.opacity = '1';
                        details.style.paddingTop = 'var(--spacing-md)';
                        
                        // Animate highlights
                        const highlights = details.querySelectorAll('.highlights-list li');
                        highlights.forEach((li, index) => {
                            li.style.animation = `slideInFromLeft 0.4s ease forwards ${index * 0.1}s`;
                            li.style.opacity = '0';
                        });
                    } else {
                        details.style.maxHeight = '0';
                        details.style.opacity = '0';
                        details.style.paddingTop = '0';
                    }
                });
            }
        }
    });
    
    // ===================================
    // 5. EDUCATION - COMPACT EXPANDABLE
    // ===================================
    const educationItems = document.querySelectorAll('.education-item.expandable');
    
    educationItems.forEach(item => {
        const header = item.querySelector('.education-header');
        const summary = item.querySelector('.education-summary');
        const details = item.querySelector('.education-details');
        
        if (details) {
            // Initially hide details
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.opacity = '0';
            details.style.transition = 'max-height 0.5s ease, opacity 0.3s ease';
            
            // Make clickable
            const clickTarget = header || summary || item;
            clickTarget.style.cursor = 'pointer';
            
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                
                // Close other items
                educationItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDetails = otherItem.querySelector('.education-details');
                        if (otherDetails) {
                            otherItem.classList.remove('expanded');
                            otherDetails.style.maxHeight = '0';
                            otherDetails.style.opacity = '0';
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('expanded');
                
                if (item.classList.contains('expanded')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.opacity = '1';
                    
                    // Add animation
                    const desc = details.querySelector('.education-description');
                    if (desc) {
                        desc.style.animation = 'fadeInUp 0.4s ease forwards';
                    }
                } else {
                    details.style.maxHeight = '0';
                    details.style.opacity = '0';
                }
            });
        }
    });
    
    // ===================================
    // 6. CONTACT CARDS - ENHANCED ANIMATIONS
    // ===================================
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        // Add floating animation with staggered delay
        card.style.animation = `contactFloat 4s ease-in-out infinite ${index * 0.5}s`;
        
        // Add particle effect on hover
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
    
    function createParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('span');
            particle.classList.add('contact-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            element.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    // ===================================
    // 7. SCROLL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .project-card, .education-item, .achievement-card, .skill-category, .philosophy-item, .contact-card, .highlight-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(element);
    });
    
    // Add class for animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            @keyframes slideInFromRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes contactFloat {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-8px);
                }
            }
            
            .contact-particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: var(--color-accent);
                border-radius: 50%;
                pointer-events: none;
                animation: particleRise 1s ease-out forwards;
            }
            
            @keyframes particleRise {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
            
            .nav-ripple {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleExpand 0.5s ease-out;
            }
            
            @keyframes rippleExpand {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        </style>
    `);
    
    console.log('✨ Enhanced portfolio interactions loaded successfully!');
});
