/* ===================================
   PORTFOLIO ENHANCEMENTS v3.0
   Complete Interactive Expandable Sections
   Tech Tag Tooltips & More
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
    // 3. PROFESSIONAL EXPERIENCE - CLICK ANYWHERE TO EXPAND
    // ===================================
    const experienceSection = document.querySelector('#experience .timeline');
    if (experienceSection) {
        const timelineItems = experienceSection.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            if (!content) return;
            
            const details = content.querySelector('.timeline-details');
            
            if (details) {
                // Initially hide details
                details.style.maxHeight = '0';
                details.style.overflow = 'hidden';
                details.style.opacity = '0';
                details.style.transition = 'max-height 0.5s ease, opacity 0.3s ease';
                
                // Make entire content clickable
                content.style.cursor = 'pointer';
                
                content.addEventListener('click', function(e) {
                    // Don't expand if clicking on a tech tag
                    if (e.target.classList.contains('tech-tag')) return;
                    
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
    // 4. PROJECTS - CLICK ANYWHERE TO EXPAND
    // ===================================
    const projectCards = document.querySelectorAll('.project-card.expandable');
    
    projectCards.forEach(card => {
        const details = card.querySelector('.project-details');
        
        if (details) {
            // Initially hide details
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.opacity = '0';
            details.style.transition = 'max-height 0.5s ease, opacity 0.3s ease, padding 0.3s ease';
            details.style.paddingTop = '0';
            
            // Make entire card clickable
            card.addEventListener('click', function(e) {
                // Don't expand if clicking on a tech tag
                if (e.target.classList.contains('tech-tag')) return;
                
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
    });
    
    // ===================================
    // 5. EDUCATION CARDS - CLICK ANYWHERE TO EXPAND
    // ===================================
    const educationCards = document.querySelectorAll('.education-card.expandable');
    
    educationCards.forEach(card => {
        const details = card.querySelector('.education-details');
        
        if (details) {
            card.addEventListener('click', function() {
                // Close other cards
                educationCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
            });
        }
    });
    
    // ===================================
    // 6. ACHIEVEMENT CARDS - CLICK ANYWHERE TO EXPAND
    // ===================================
    const achievementCards = document.querySelectorAll('.achievement-card.expandable');
    
    achievementCards.forEach(card => {
        const details = card.querySelector('.achievement-details');
        
        if (details) {
            card.addEventListener('click', function() {
                // Close other cards
                achievementCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
            });
        }
    });
    
    // ===================================
    // 7. TECH TAGS & SKILL ITEMS - TOOLTIP ON CLICK
    // ===================================
    const techTagInfo = {
        // Programming Languages
        'Java': { icon: '☕', desc: 'Primary language for enterprise applications, microservices, and backend development. 5+ years experience.' },
        'Python': { icon: '🐍', desc: 'Used for scripting, automation, and data analysis tasks.' },
        'JavaScript': { icon: '📜', desc: 'Frontend development and Node.js based tooling.' },
        'Kotlin': { icon: '🅺', desc: 'Modern JVM language for Android and backend development.' },
        
        // Frameworks
        'Spring Boot': { icon: '🌱', desc: 'Primary framework for building production-ready microservices and REST APIs.' },
        'Spring Framework': { icon: '🌿', desc: 'Core framework for dependency injection, AOP, and enterprise Java development.' },
        'Hibernate / JPA': { icon: '🗄️', desc: 'ORM framework for database operations and entity management.' },
        'REST APIs': { icon: '🔗', desc: 'Designing and implementing RESTful web services following best practices.' },
        
        // Architecture
        'Microservices': { icon: '🔲', desc: 'Designing distributed systems with independent, scalable services.' },
        'System Design': { icon: '📐', desc: 'Architecting scalable, reliable systems for enterprise needs.' },
        'Design Patterns': { icon: '🎨', desc: 'Applying proven solutions like Singleton, Factory, Strategy, etc.' },
        'Distributed Systems': { icon: '🌐', desc: 'Building systems that operate across multiple nodes reliably.' },
        'Event-Driven Architecture': { icon: '⚡', desc: 'Async communication patterns using events and message queues.' },
        'Scalability': { icon: '📈', desc: 'Designing systems that handle growth in users and data.' },
        
        // Databases
        'SQL': { icon: '📊', desc: 'Writing optimized queries, stored procedures, and database design.' },
        'PostgreSQL': { icon: '🐘', desc: 'Advanced relational database for complex applications.' },
        'MySQL': { icon: '🐬', desc: 'Popular relational database for web applications.' },
        'Oracle DB': { icon: '🔴', desc: 'Enterprise database for large-scale applications.' },
        'MongoDB': { icon: '🍃', desc: 'NoSQL database for flexible document storage.' },
        
        // Cloud & DevOps
        'Azure': { icon: '☁️', desc: 'Microsoft cloud platform for deployment and infrastructure.' },
        'Docker': { icon: '🐳', desc: 'Containerization for consistent deployments across environments.' },
        'Kubernetes': { icon: '⚓', desc: 'Container orchestration for managing microservices at scale.' },
        'CI/CD': { icon: '🔄', desc: 'Automated build, test, and deployment pipelines.' },
        'Git': { icon: '📌', desc: 'Version control and collaborative development workflows.' },
        
        // Tools
        'Camunda BPM': { icon: '⚙️', desc: 'Business process management and workflow automation.' },
        'Camunda': { icon: '⚙️', desc: 'BPMN workflow engine for process automation.' },
        'Maven': { icon: '🏗️', desc: 'Build automation and dependency management for Java.' },
        'Gradle': { icon: '🔧', desc: 'Modern build tool for Java and multi-language projects.' },
        'JUnit': { icon: '✅', desc: 'Unit testing framework for Java applications.' },
        'Mockito': { icon: '🎭', desc: 'Mocking framework for unit tests.' },
        'Postman': { icon: '📮', desc: 'API testing and documentation tool.' },
        
        // Soft Skills
        'Problem Solving': { icon: '🧩', desc: 'Analytical thinking and breaking down complex problems.' },
        'Code Review': { icon: '👁️', desc: 'Ensuring code quality through systematic reviews.' },
        'Technical Documentation': { icon: '📝', desc: 'Writing clear technical docs and API specifications.' },
        'Agile/Scrum': { icon: '🏃', desc: 'Working in sprints with iterative development.' },
        'Team Collaboration': { icon: '🤝', desc: 'Working effectively with cross-functional teams.' },
        
        // Project specific
        'Android': { icon: '🤖', desc: 'Mobile app development for Android platform.' },
        'Java/Kotlin': { icon: '📱', desc: 'Native Android development languages.' },
        'AI-Assisted Development': { icon: '🤖', desc: 'Using AI tools to accelerate development.' },
        'Prompt Engineering': { icon: '💬', desc: 'Crafting effective prompts for AI assistance.' }
    };
    
    let activeTooltip = null;
    let tooltipTimeout = null;
    
    function showTechTooltip(element, tagName) {
        // Remove any existing tooltip
        removeTooltip();
        
        const info = techTagInfo[tagName] || { 
            icon: '💡', 
            desc: `${tagName} - A technology used in this project/role.` 
        };
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.innerHTML = `
            <h4>${info.icon} ${tagName}</h4>
            <p>${info.desc}</p>
            <div class="tooltip-bar">
                <div class="tooltip-progress"></div>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        activeTooltip = tooltip;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.bottom + 10;
        
        // Keep within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = rect.top - tooltipRect.height - 10;
            tooltip.style.transform = 'translateY(0)';
            tooltip.querySelector('::before')?.remove();
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        
        // Add active class to tag
        element.classList.add('active');
        
        // Auto-remove after 3 seconds
        tooltipTimeout = setTimeout(() => {
            removeTooltip();
        }, 3000);
    }
    
    function removeTooltip() {
        if (activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = null;
        }
        // Remove active class from all tags
        document.querySelectorAll('.tech-tag.active, .skill-item.active').forEach(el => {
            el.classList.remove('active');
        });
    }
    
    // Add click handlers to tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            const tagName = this.textContent.trim();
            
            if (this.classList.contains('active')) {
                removeTooltip();
            } else {
                showTechTooltip(this, tagName);
            }
        });
    });
    
    // Add click handlers to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const tagName = this.textContent.trim();
            
            if (this.classList.contains('active')) {
                removeTooltip();
            } else {
                showTechTooltip(this, tagName);
            }
        });
    });
    
    // Close tooltip when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('tech-tag') && 
            !e.target.classList.contains('skill-item') &&
            !e.target.closest('.tech-tooltip')) {
            removeTooltip();
        }
    });
    
    // ===================================
    // 8. CONTACT CARDS - ENHANCED ANIMATIONS
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
    // 9. SCROLL ANIMATIONS
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
        '.timeline-item, .project-card, .education-card, .achievement-card, .skill-category, .philosophy-item, .contact-card, .highlight-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(element);
    });
    
    // Add dynamic styles
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
    
    console.log('✨ Enhanced portfolio v3.0 loaded successfully!');
});
