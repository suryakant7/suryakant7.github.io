/* ===================================
   PORTFOLIO ENHANCEMENTS v3.0
   Complete Interactive Expandable Sections
   Tech Tag Tooltips & More
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // SKILLS PROGRESS BAR ANIMATION (Re-triggers on scroll)
    // ===================================
    const skillItems = document.querySelectorAll('.skill-progress-item');
    const skillsSection = document.getElementById('skills');
    
    function animateSkillBars() {
        skillItems.forEach((item, index) => {
            const percent = item.getAttribute('data-percent');
            const fill = item.querySelector('.skill-fill');
            
            // Reset first
            fill.style.transition = 'none';
            fill.style.width = '0';
            
            // Force reflow
            fill.offsetHeight;
            
            // Animate with stagger
            setTimeout(() => {
                fill.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                fill.style.width = percent + '%';
            }, index * 60);
        });
    }
    
    function resetSkillBars() {
        skillItems.forEach(item => {
            const fill = item.querySelector('.skill-fill');
            fill.style.transition = 'none';
            fill.style.width = '0';
        });
    }
    
    // Observe skills section for re-triggering animation
    if (skillsSection) {
        const skillSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                } else {
                    resetSkillBars();
                }
            });
        }, { threshold: 0.2 });
        
        skillSectionObserver.observe(skillsSection);
    }
    
    // ===================================
    // 1. MOBILE MENU ENHANCED ANIMATIONS
    // Note: Menu toggle is handled in script.js
    // This section only handles nav link click animations
    // ===================================
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    
    // Add click animation to nav links only
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
        });
    });
    
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
    // 3. PROFESSIONAL EXPERIENCE - TIMELINE LAYOUT
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item.expandable');
    
    timelineItems.forEach(item => {
        const card = item.querySelector('.timeline-card');
        if (card) {
            card.addEventListener('click', function(e) {
                // Don't expand if clicking on a tech tag
                if (e.target.classList.contains('tech-tag')) return;
                
                e.stopPropagation();
                
                // Close other items
                timelineItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('expanded');
                
                // Position in view if expanded
                if (item.classList.contains('expanded')) {
                    const details = item.querySelector('.timeline-details');
                    if (details) {
                        positionExpandedContent(item, details);
                    }
                }
            });
        }
    });
    
    // ===================================
    // 4. PROJECTS - CLICK ANYWHERE TO EXPAND (FIXED)
    // ===================================
    const projectCards = document.querySelectorAll('.project-card.expandable');
    
    projectCards.forEach(card => {
        const details = card.querySelector('.project-details');
        const expandIcon = card.querySelector('.expand-icon');
        
        if (details) {
            // Initially hide details
            details.style.maxHeight = '0';
            details.style.overflow = 'hidden';
            details.style.opacity = '0';
            details.style.transition = 'max-height 0.4s ease-out, opacity 0.3s ease, padding 0.3s ease';
            details.style.paddingTop = '0';
            
            // Single click handler for expand/collapse
            card.addEventListener('click', function(e) {
                // Don't expand if clicking on a tech tag or game button
                if (e.target.classList.contains('tech-tag') || 
                    e.target.classList.contains('game-btn') ||
                    e.target.closest('.game-btn')) return;
                
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = card.classList.contains('expanded');
                
                // Close all other cards first
                projectCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        const otherDetails = otherCard.querySelector('.project-details');
                        const otherIcon = otherCard.querySelector('.expand-icon');
                        otherCard.classList.remove('expanded');
                        if (otherDetails) {
                            otherDetails.style.maxHeight = '0';
                            otherDetails.style.opacity = '0';
                            otherDetails.style.paddingTop = '0';
                        }
                        if (otherIcon) otherIcon.textContent = '▼';
                    }
                });
                
                // Toggle current card
                if (isExpanded) {
                    // Collapse
                    card.classList.remove('expanded');
                    details.style.maxHeight = '0';
                    details.style.opacity = '0';
                    details.style.paddingTop = '0';
                    if (expandIcon) expandIcon.textContent = '▼';
                } else {
                    // Expand
                    card.classList.add('expanded');
                    details.style.maxHeight = details.scrollHeight + 50 + 'px';
                    details.style.opacity = '1';
                    details.style.paddingTop = '20px';
                    if (expandIcon) expandIcon.textContent = '▲';
                    
                    // Scroll card into view smoothly
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                    
                    // Animate highlights if any
                    const highlights = details.querySelectorAll('.highlights-list li');
                    highlights.forEach((li, index) => {
                        li.style.opacity = '0';
                        li.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            li.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            li.style.opacity = '1';
                            li.style.transform = 'translateX(0)';
                        }, index * 80);
                    });
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
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Close other cards
                educationCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                
                // Position details relative to card
                if (card.classList.contains('expanded')) {
                    positionExpandedContent(card, details);
                }
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
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Close other cards
                achievementCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
                
                // Position details relative to card
                if (card.classList.contains('expanded')) {
                    positionExpandedContent(card, details);
                }
            });
        }
    });
    
    // ===================================
    // CLOSE EXPANDED CARDS ON SCROLL
    // ===================================
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Close all expanded cards
            document.querySelectorAll('.expandable.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Close expanded highlights content
            document.querySelectorAll('.expandable-content.expanded').forEach(content => {
                content.classList.remove('expanded');
            });
        }, 100); // Small delay to avoid triggering on minor scrolls
    });
    
    // ===================================
    // CLOSE EXPANDED CARDS ON OUTSIDE CLICK
    // ===================================
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.expandable')) {
            document.querySelectorAll('.expandable.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
    
    // ===================================
    // HELPER FUNCTION TO POSITION EXPANDED CONTENT
    // ===================================
    function positionExpandedContent(card, details) {
        // This ensures the details stay within the card
        // The CSS handles the positioning, this is for any dynamic adjustments
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if card is too close to bottom
        if (cardRect.bottom > viewportHeight * 0.8) {
            // Scroll card into view smoothly
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
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
    
    // Update tooltip position on scroll
    let tooltipTrigger = null;
    window.addEventListener('scroll', function() {
        if (activeTooltip && tooltipTrigger) {
            const rect = tooltipTrigger.getBoundingClientRect();
            const tooltipRect = activeTooltip.getBoundingClientRect();
            
            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.bottom + 10;
            
            // Keep within viewport
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top + tooltipRect.height > window.innerHeight - 10 || rect.top < 0 || rect.bottom > window.innerHeight) {
                // Close tooltip if trigger is out of view
                removeTooltip();
                tooltipTrigger = null;
                return;
            }
            
            activeTooltip.style.left = left + 'px';
            activeTooltip.style.top = top + 'px';
        }
    }, { passive: true });
    
    // Add click handlers to tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            const tagName = this.textContent.trim();
            
            if (this.classList.contains('active')) {
                removeTooltip();
                tooltipTrigger = null;
            } else {
                tooltipTrigger = this;
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
                tooltipTrigger = null;
            } else {
                tooltipTrigger = this;
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
            tooltipTrigger = null;
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
    
    // ===================================
    // 10. 3D GALLERY CAROUSEL
    // ===================================
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (carouselTrack && prevBtn && nextBtn && dotsContainer) {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;
        let isDragging = false;
        let startX = 0;
        let dragThreshold = 50;
        
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        function updateCarousel() {
            slides.forEach((slide, index) => {
                // Remove all position classes
                slide.classList.remove('active', 'prev', 'prev-2', 'next', 'next-2', 'hidden');
                
                // Calculate position relative to current
                let diff = index - currentIndex;
                
                // Handle circular wrapping
                if (diff > totalSlides / 2) diff -= totalSlides;
                if (diff < -totalSlides / 2) diff += totalSlides;
                
                // Apply appropriate class
                if (diff === 0) {
                    slide.classList.add('active');
                } else if (diff === -1) {
                    slide.classList.add('prev');
                } else if (diff === -2) {
                    slide.classList.add('prev-2');
                } else if (diff === 1) {
                    slide.classList.add('next');
                } else if (diff === 2) {
                    slide.classList.add('next-2');
                } else {
                    slide.classList.add('hidden');
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Button controls
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
        
        // Touch/drag support
        carouselTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            carouselTrack.style.cursor = 'grabbing';
        });
        
        carouselTrack.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            carouselTrack.style.cursor = 'grab';
            const diff = e.clientX - startX;
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) prevSlide();
                else nextSlide();
            }
        });
        
        document.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) prevSlide();
                else nextSlide();
            }
        });
        
        // Auto-play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        
        // Pause on hover
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Click on side slides to navigate
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (!slide.classList.contains('active')) {
                    goToSlide(index);
                }
            });
        });
        
        // Initialize
        carouselTrack.style.cursor = 'grab';
        updateCarousel();
        startAutoPlay();
    }
    
    // ===================================
    // SKILLS HORIZONTAL FUTURISTIC SCROLL
    // ===================================
    const skillsSection = document.getElementById('skills');
    const skillsGrid = document.querySelector('.skills-grid');
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillsPrevBtn = document.querySelector('.skills-prev');
    const skillsNextBtn = document.querySelector('.skills-next');
    const skillsScrollTrack = document.querySelector('.skills-scroll-track');
    
    if (skillsSection && skillsGrid && skillCategories.length > 0) {
        const scrollAmount = 305; // card width + gap
        let autoScrollInterval = null;
        let isHovering = false;
        
        // Update scroll progress indicator
        function updateScrollProgress() {
            const maxScroll = skillsGrid.scrollWidth - skillsGrid.clientWidth;
            const progress = maxScroll > 0 ? (skillsGrid.scrollLeft / maxScroll) * 100 : 0;
            if (skillsScrollTrack) {
                skillsScrollTrack.style.setProperty('--scroll-progress', `${progress}%`);
            }
        }
        
        function scrollLeft() {
            skillsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
        
        function scrollRight() {
            const maxScroll = skillsGrid.scrollWidth - skillsGrid.clientWidth;
            if (skillsGrid.scrollLeft >= maxScroll - 10) {
                // Loop back to start
                skillsGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                skillsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
        
        function startAutoScroll() {
            if (!autoScrollInterval && !isHovering) {
                autoScrollInterval = setInterval(scrollRight, 3000);
            }
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }
        
        // Event listeners
        if (skillsNextBtn) {
            skillsNextBtn.addEventListener('click', () => {
                scrollRight();
                stopAutoScroll();
                startAutoScroll();
            });
        }
        
        if (skillsPrevBtn) {
            skillsPrevBtn.addEventListener('click', () => {
                scrollLeft();
                stopAutoScroll();
                startAutoScroll();
            });
        }
        
        // Update progress on scroll
        skillsGrid.addEventListener('scroll', updateScrollProgress);
        
        // Pause on hover
        skillsGrid.addEventListener('mouseenter', () => {
            isHovering = true;
            stopAutoScroll();
        });
        
        skillsGrid.addEventListener('mouseleave', () => {
            isHovering = false;
            startAutoScroll();
        });
        
        // Mouse wheel horizontal scroll
        skillsGrid.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                skillsGrid.scrollLeft += e.deltaY;
                updateScrollProgress();
            }
        }, { passive: false });
        
        // Drag to scroll
        let isDragging = false;
        let startX, scrollStart;
        
        skillsGrid.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - skillsGrid.offsetLeft;
            scrollStart = skillsGrid.scrollLeft;
            skillsGrid.style.cursor = 'grabbing';
        });
        
        skillsGrid.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - skillsGrid.offsetLeft;
            const walk = (x - startX) * 2;
            skillsGrid.scrollLeft = scrollStart - walk;
        });
        
        skillsGrid.addEventListener('mouseup', () => {
            isDragging = false;
            skillsGrid.style.cursor = 'grab';
        });
        
        skillsGrid.addEventListener('mouseleave', () => {
            isDragging = false;
            skillsGrid.style.cursor = 'grab';
        });
        
        // Initialize
        skillsGrid.style.cursor = 'grab';
        updateScrollProgress();
        
        // Start auto-scroll when section is in view
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    console.log('✨ Enhanced portfolio v3.0 loaded successfully!');
});

// ===================================
// MINI GAMES FUNCTIONALITY
// ===================================

function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (gameType === 'whack-a-mole') {
        initWhackAMole(container);
    } else if (gameType === 'tic-tac-toe') {
        initTicTacToe(container);
    } else if (gameType === 'memory-game') {
        initMemoryGame(container);
    } else if (gameType === 'snake-game') {
        initSnakeGame(container);
    }
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    container.innerHTML = '';
    
    // Clear any game intervals
    if (window.whackInterval) {
        clearInterval(window.whackInterval);
        window.whackInterval = null;
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGame();
    }
});

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('gameModal');
    if (e.target === modal) {
        closeGame();
    }
});

// ===================================
// WHACK-A-MOLE GAME
// ===================================
function initWhackAMole(container) {
    let score = 0;
    let timeLeft = 30;
    let isPlaying = false;
    
    container.innerHTML = `
        <div class="whack-game">
            <h3>🔨 Whack-a-Mole!</h3>
            <div class="game-stats">
                <span>Score: <strong id="whackScore">0</strong></span>
                <span>Time: <strong id="whackTime">30</strong>s</span>
            </div>
            <div class="mole-grid">
                ${Array(9).fill().map((_, i) => `
                    <div class="mole-hole" data-hole="${i}">
                        <span class="mole">🐹</span>
                    </div>
                `).join('')}
            </div>
            <button class="game-start-btn" id="whackStartBtn">Start Game</button>
        </div>
    `;
    
    const holes = container.querySelectorAll('.mole-hole');
    const scoreDisplay = container.querySelector('#whackScore');
    const timeDisplay = container.querySelector('#whackTime');
    const startBtn = container.querySelector('#whackStartBtn');
    
    function showMole() {
        // Hide all moles first
        holes.forEach(h => h.classList.remove('active'));
        
        // Show random mole
        const randomHole = Math.floor(Math.random() * 9);
        holes[randomHole].classList.add('active');
        
        // Auto-hide after random time
        setTimeout(() => {
            holes[randomHole].classList.remove('active');
        }, 600 + Math.random() * 400);
    }
    
    function whackMole(e) {
        const hole = e.currentTarget;
        if (hole.classList.contains('active') && isPlaying) {
            hole.classList.remove('active');
            hole.classList.add('hit');
            score += 10;
            scoreDisplay.textContent = score;
            
            setTimeout(() => {
                hole.classList.remove('hit');
            }, 300);
        }
    }
    
    function startGame() {
        if (isPlaying) return;
        
        isPlaying = true;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        startBtn.textContent = 'Playing...';
        startBtn.disabled = true;
        
        // Show moles at random intervals
        window.whackInterval = setInterval(() => {
            if (isPlaying) showMole();
        }, 800);
        
        // Countdown timer
        const timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                clearInterval(window.whackInterval);
                isPlaying = false;
                startBtn.textContent = `Game Over! Score: ${score} - Play Again`;
                startBtn.disabled = false;
                holes.forEach(h => h.classList.remove('active'));
            }
        }, 1000);
    }
    
    holes.forEach(hole => hole.addEventListener('click', whackMole));
    startBtn.addEventListener('click', startGame);
}

// ===================================
// TIC-TAC-TOE GAME
// ===================================
function initTicTacToe(container) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    container.innerHTML = `
        <div class="ttt-game">
            <h3>⭕ Tic-Tac-Toe ❌</h3>
            <div class="ttt-status" id="tttStatus">Player X's turn</div>
            <div class="ttt-board">
                ${Array(9).fill().map((_, i) => `
                    <button class="ttt-cell" data-cell="${i}"></button>
                `).join('')}
            </div>
            <button class="ttt-restart-btn" id="tttRestart">Restart Game</button>
        </div>
    `;
    
    const cells = container.querySelectorAll('.ttt-cell');
    const statusDisplay = container.querySelector('#tttStatus');
    const restartBtn = container.querySelector('#tttRestart');
    
    function checkWin() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], pattern };
            }
        }
        return null;
    }
    
    function checkDraw() {
        return board.every(cell => cell !== '');
    }
    
    function makeMove(cellIndex) {
        if (board[cellIndex] || !gameActive) return;
        
        board[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer.toLowerCase(), 'taken');
        
        const result = checkWin();
        
        if (result) {
            gameActive = false;
            statusDisplay.textContent = `🎉 Player ${result.winner} wins!`;
            result.pattern.forEach(i => cells[i].classList.add('winner'));
            return;
        }
        
        if (checkDraw()) {
            gameActive = false;
            statusDisplay.textContent = `🤝 It's a draw!`;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.textContent = `Player X's turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'ttt-cell';
        });
    }
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
    
    restartBtn.addEventListener('click', restartGame);
}

// ===================================
// MEMORY MATCH GAME
// ===================================
function initMemoryGame(container) {
    const emojis = ['🎮', '🎯', '🎪', '🎭', '🎨', '🎬', '🎸', '🎺'];
    let cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let canFlip = true;
    
    // Shuffle cards
    cards = cards.sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div class="memory-game">
            <h3>🧠 Memory Match</h3>
            <div class="game-stats">
                <span>Moves: <strong id="memoryMoves">0</strong></span>
                <span>Pairs: <strong id="memoryPairs">0</strong>/8</span>
            </div>
            <div class="memory-grid">
                ${cards.map((emoji, i) => `
                    <div class="memory-card" data-index="${i}" data-emoji="${emoji}">
                        <div class="memory-card-inner">
                            <div class="memory-card-front">❓</div>
                            <div class="memory-card-back">${emoji}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="game-start-btn" id="memoryRestart">Restart Game</button>
        </div>
    `;
    
    const cardElements = container.querySelectorAll('.memory-card');
    const movesDisplay = container.querySelector('#memoryMoves');
    const pairsDisplay = container.querySelector('#memoryPairs');
    const restartBtn = container.querySelector('#memoryRestart');
    
    function flipCard(card) {
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;
        
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            canFlip = false;
            
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                // Match found
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                pairsDisplay.textContent = matchedPairs;
                flippedCards = [];
                canFlip = true;
                
                if (matchedPairs === 8) {
                    setTimeout(() => {
                        alert(`🎉 Congratulations! You won in ${moves} moves!`);
                    }, 500);
                }
            } else {
                // No match - flip back
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    function restartGame() {
        cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        canFlip = true;
        movesDisplay.textContent = '0';
        pairsDisplay.textContent = '0';
        
        cardElements.forEach((card, i) => {
            card.classList.remove('flipped', 'matched');
            card.dataset.emoji = cards[i];
            card.querySelector('.memory-card-back').textContent = cards[i];
        });
    }
    
    cardElements.forEach(card => card.addEventListener('click', () => flipCard(card)));
    restartBtn.addEventListener('click', restartGame);
}

// ===================================
// SNAKE GAME
// ===================================
function initSnakeGame(container) {
    const gridSize = 15;
    const cellSize = 20;
    let snake = [{x: 7, y: 7}];
    let food = {x: 10, y: 10};
    let direction = {x: 1, y: 0};
    let nextDirection = {x: 1, y: 0};
    let score = 0;
    let gameLoop = null;
    let isPlaying = false;
    
    container.innerHTML = `
        <div class="snake-game">
            <h3>🐍 Snake Game</h3>
            <div class="game-stats">
                <span>Score: <strong id="snakeScore">0</strong></span>
            </div>
            <canvas id="snakeCanvas" width="${gridSize * cellSize}" height="${gridSize * cellSize}"></canvas>
            <div class="snake-controls">
                <p>Use Arrow Keys or WASD to move</p>
                <button class="game-start-btn" id="snakeStartBtn">Start Game</button>
            </div>
            <div class="mobile-controls">
                <button class="control-btn" data-dir="up">⬆️</button>
                <div class="control-row">
                    <button class="control-btn" data-dir="left">⬅️</button>
                    <button class="control-btn" data-dir="down">⬇️</button>
                    <button class="control-btn" data-dir="right">➡️</button>
                </div>
            </div>
        </div>
    `;
    
    const canvas = container.querySelector('#snakeCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = container.querySelector('#snakeScore');
    const startBtn = container.querySelector('#snakeStartBtn');
    const controlBtns = container.querySelectorAll('.control-btn');
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = '#2a2a4e';
        for (let i = 0; i <= gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }
        
        // Draw food
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(food.x * cellSize + cellSize/2, food.y * cellSize + cellSize/2, cellSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? '#00ffff' : '#00cc99';
            ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
        });
    }
    
    function placeFood() {
        do {
            food = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
        } while (snake.some(s => s.x === food.x && s.y === food.y));
    }
    
    function update() {
        direction = {...nextDirection};
        
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };
        
        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            gameOver();
            return;
        }
        
        // Check self collision
        if (snake.some(s => s.x === head.x && s.y === head.y)) {
            gameOver();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }
        
        draw();
    }
    
    function gameOver() {
        clearInterval(gameLoop);
        isPlaying = false;
        startBtn.textContent = `Game Over! Score: ${score} - Play Again`;
        startBtn.disabled = false;
    }
    
    function startGame() {
        if (isPlaying) return;
        
        snake = [{x: 7, y: 7}];
        direction = {x: 1, y: 0};
        nextDirection = {x: 1, y: 0};
        score = 0;
        scoreDisplay.textContent = '0';
        isPlaying = true;
        startBtn.textContent = 'Playing...';
        startBtn.disabled = true;
        
        placeFood();
        draw();
        
        gameLoop = setInterval(update, 150);
    }
    
    function setDirection(newDir) {
        const dirs = {
            up: {x: 0, y: -1},
            down: {x: 0, y: 1},
            left: {x: -1, y: 0},
            right: {x: 1, y: 0}
        };
        
        if (!dirs[newDir]) return;
        
        const newDirection = dirs[newDir];
        // Prevent reversing direction
        if (newDirection.x !== -direction.x || newDirection.y !== -direction.y) {
            nextDirection = newDirection;
        }
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!isPlaying) return;
        
        const keyMap = {
            'ArrowUp': 'up', 'w': 'up', 'W': 'up',
            'ArrowDown': 'down', 's': 'down', 'S': 'down',
            'ArrowLeft': 'left', 'a': 'left', 'A': 'left',
            'ArrowRight': 'right', 'd': 'right', 'D': 'right'
        };
        
        if (keyMap[e.key]) {
            e.preventDefault();
            setDirection(keyMap[e.key]);
        }
    });
    
    // Mobile controls
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isPlaying) {
                setDirection(btn.dataset.dir);
            }
        });
    });
    
    startBtn.addEventListener('click', startGame);
    draw(); // Initial draw
}

