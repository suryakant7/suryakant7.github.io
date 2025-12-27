/* ===================================
   PORTFOLIO ENHANCEMENTS
   Interactive expandable sections
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. EXPANDABLE HIGHLIGHT ITEMS (About Section)
    // ===================================
    const highlightItems = document.querySelectorAll('.highlight-item');
    
    highlightItems.forEach((item, index) => {
        // Add click handler
        item.addEventListener('click', function() {
            // Close other items
            highlightItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            // Toggle current item
            this.classList.toggle('expanded');
            
            // Create content if doesn't exist
            if (!this.querySelector('.highlight-details')) {
                const details = document.createElement('div');
                details.className = 'highlight-details';
                
                let content = '';
                if (index === 0) { // Years Experience
                    content = `
                        <div class="highlight-scroll">
                            <div class="highlight-card">
                                <h4>Goldman Sachs</h4>
                                <p>Jan 2024 - Present</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Capgemini</h4>
                                <p>2023 - 2024</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Reliance Jio</h4>
                                <p>July 2021 - 2023</p>
                            </div>
                        </div>
                    `;
                } else if (index === 1) { // Major Organizations
                    content = `
                        <div class="highlight-scroll">
                            <div class="highlight-card">
                                <h4>🏦 Goldman Sachs</h4>
                                <p>Financial Services</p>
                            </div>
                            <div class="highlight-card">
                                <h4>💼 Capgemini</h4>
                                <p>IT Consulting</p>
                            </div>
                            <div class="highlight-card">
                                <h4>�� Reliance Jio</h4>
                                <p>Telecommunications</p>
                            </div>
                        </div>
                    `;
                } else if (index === 2) { // Technologies
                    content = `
                        <div class="highlight-scroll">
                            <div class="highlight-card">
                                <h4>Java</h4>
                                <p>Core Language</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Spring Boot</h4>
                                <p>Framework</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Microservices</h4>
                                <p>Architecture</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Azure</h4>
                                <p>Cloud Platform</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Docker</h4>
                                <p>Containerization</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Kubernetes</h4>
                                <p>Orchestration</p>
                            </div>
                            <div class="highlight-card">
                                <h4>PostgreSQL</h4>
                                <p>Database</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Camunda</h4>
                                <p>BPM Engine</p>
                            </div>
                            <div class="highlight-card">
                                <h4>REST APIs</h4>
                                <p>Integration</p>
                            </div>
                            <div class="highlight-card">
                                <h4>Git</h4>
                                <p>Version Control</p>
                            </div>
                        </div>
                    `;
                }
                
                details.innerHTML = content;
                this.appendChild(details);
            }
        });
    });
    
    // ===================================
    // 2. EXPANDABLE TIMELINE ITEMS
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        const content = item.querySelector('.timeline-content');
        
        // Wrap expandable content
        const expandableDiv = document.createElement('div');
        expandableDiv.className = 'timeline-expandable';
        
        const description = content.querySelector('.role-description');
        const responsibilities = content.querySelector('.role-responsibilities');
        
        if (description) expandableDiv.appendChild(description);
        if (responsibilities) expandableDiv.appendChild(responsibilities);
        
        // Add toggle icon
        const toggle = document.createElement('span');
        toggle.className = 'timeline-toggle';
        toggle.textContent = '▼';
        header.querySelector('.company-name').appendChild(toggle);
        
        // Add click handler
        header.addEventListener('click', function() {
            item.classList.toggle('expanded');
        });
    });
    
    // ===================================
    // 3. EXPANDABLE PROJECT CARDS
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title');
        
        // Wrap expandable content
        const expandableDiv = document.createElement('div');
        expandableDiv.className = 'project-expandable';
        
        const description = card.querySelector('.project-description');
        const highlights = card.querySelector('.project-highlights');
        const tech = card.querySelector('.project-tech');
        
        if (description) expandableDiv.appendChild(description);
        if (highlights) expandableDiv.appendChild(highlights);
        if (tech) expandableDiv.appendChild(tech);
        
        // Add toggle icon
        const toggle = document.createElement('span');
        toggle.className = 'project-toggle';
        toggle.textContent = '▼';
        title.appendChild(toggle);
        
        // Create header div
        const headerDiv = document.createElement('div');
        headerDiv.className = 'project-header';
        card.insertBefore(headerDiv, card.firstChild);
        headerDiv.appendChild(title);
        
        // Add click handler
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            card.classList.toggle('expanded');
        });
    });
    
    // ===================================
    // 4. EXPANDABLE EDUCATION ITEMS
    // ===================================
    const educationItems = document.querySelectorAll('.education-item');
    
    educationItems.forEach(item => {
        const details = item.querySelector('.education-details');
        const description = details.querySelector('.education-description');
        
        if (description) {
            // Wrap description
            const expandableDiv = document.createElement('div');
            expandableDiv.className = 'education-expandable';
            expandableDiv.appendChild(description);
            details.appendChild(expandableDiv);
        }
        
        // Add toggle icon
        const toggle = document.createElement('span');
        toggle.className = 'education-toggle';
        toggle.textContent = '▼';
        item.appendChild(toggle);
        
        // Add click handler
        item.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link
            if (e.target.tagName !== 'A') {
                this.classList.toggle('expanded');
            }
        });
    });
    
    console.log('✨ All enhancements loaded successfully!');
});
