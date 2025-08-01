// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('example-modal');
const promptResult = document.getElementById('prompt-result');

// Example data
const examples = {
    'code-review': {
        title: 'Code Review Assistant',
        description: 'This MCP server helps AI models analyze code for security vulnerabilities, performance issues, and best practices. It connects to your code repositories and applies industry-standard review criteria.',
        code: `{
  "mcpServers": {
    "code-review": {
      "command": "node",
      "args": ["./servers/code-review-server.js"],
      "resources": [
        {
          "name": "security_patterns",
          "description": "Common security vulnerabilities database"
        },
        {
          "name": "best_practices",
          "description": "Coding standards and best practices"
        }
      ],
      "tools": [
        {
          "name": "analyze_code",
          "description": "Analyze code for issues and suggestions"
        },
        {
          "name": "check_security",
          "description": "Perform security vulnerability scan"
        }
      ]
    }
  }
}`,
        benefits: [
            'Automated security vulnerability detection',
            'Consistent code quality enforcement',
            'Integration with popular code repositories',
            'Customizable review criteria',
            'Real-time feedback during development'
        ]
    },
    'data-analysis': {
        title: 'Data Analysis Tool',
        description: 'Connect AI models to databases, spreadsheets, and data APIs for intelligent analysis. This server provides structured access to your data sources with built-in analytics capabilities.',
        code: `{
  "mcpServers": {
    "data-analyzer": {
      "command": "python",
      "args": ["./servers/data_analyzer.py"],
      "resources": [
        {
          "name": "database_connection",
          "description": "Connect to SQL databases"
        },
        {
          "name": "csv_files",
          "description": "Access to CSV data files"
        }
      ],
      "tools": [
        {
          "name": "query_database",
          "description": "Execute SQL queries and return results"
        },
        {
          "name": "generate_chart",
          "description": "Create visualizations from data"
        },
        {
          "name": "statistical_analysis",
          "description": "Perform statistical calculations"
        }
      ]
    }
  }
}`,
        benefits: [
            'Direct database connectivity',
            'Automatic data visualization generation',
            'Statistical analysis capabilities',
            'Support for multiple data formats',
            'Real-time data processing'
        ]
    },
    'documentation': {
        title: 'Smart Documentation',
        description: 'Automatically generate and maintain documentation from your codebase. This MCP server analyzes code structure, comments, and usage patterns to create comprehensive documentation.',
        code: `{
  "mcpServers": {
    "doc-generator": {
      "command": "node",
      "args": ["./servers/documentation-server.js"],
      "resources": [
        {
          "name": "codebase_scanner",
          "description": "Scan and analyze codebase structure"
        },
        {
          "name": "api_endpoints",
          "description": "Extract API endpoint information"
        }
      ],
      "tools": [
        {
          "name": "generate_api_docs",
          "description": "Create API documentation from code"
        },
        {
          "name": "update_readme",
          "description": "Automatically update README files"
        },
        {
          "name": "create_tutorials",
          "description": "Generate step-by-step tutorials"
        }
      ],
      "prompts": [
        {
          "name": "documentation_template",
          "description": "Standardized documentation format"
        }
      ]
    }
  }
}`,
        benefits: [
            'Automatic documentation generation',
            'API documentation from code annotations',
            'Tutorial and guide creation',
            'Version control integration',
            'Consistent documentation formatting'
        ]
    }
};

// Scroll-based navbar styling
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.section-title, .example-card, .benefit-card, .step-card, .detail-card, .intro-text, .intro-visual, .architecture-diagram, .architecture-details');
    
    animatedElements.forEach((el, index) => {
        // Add different animation classes based on element type and position
        if (el.classList.contains('section-title')) {
            el.classList.add('fade-in');
        } else if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        
        observer.observe(el);
    });

    // Special handling for benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.classList.add('scale-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Show example modal
function showExample(exampleType) {
    const example = examples[exampleType];
    if (!example) return;
    
    document.getElementById('modal-title').textContent = example.title;
    document.getElementById('modal-description').innerHTML = `<p>${example.description}</p>`;
    document.getElementById('modal-code').textContent = example.code;
    
    const benefitsList = document.getElementById('modal-benefits');
    benefitsList.innerHTML = '';
    example.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Copy code to clipboard
function copyCode() {
    const code = document.getElementById('modal-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Switch prompt category
function switchCategory(category) {
    // Update category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Update prompt groups
    document.querySelectorAll('.prompt-group').forEach(group => {
        group.classList.remove('active');
    });
    document.getElementById(`${category}-prompts`).classList.add('active');
    
    // Hide result
    promptResult.classList.remove('active');
}

// Try prompt functionality
function tryPrompt(promptCard) {
    // Remove active state from other cards
    document.querySelectorAll('.prompt-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active state to clicked card
    promptCard.classList.add('active');
    
    // Show result with animation
    promptResult.classList.add('active');
    
    // Scroll to result
    setTimeout(() => {
        promptResult.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 300);
}

// Detail card interaction
function handleDetailCardClick() {
    document.querySelectorAll('.detail-card').forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all cards
            document.querySelectorAll('.detail-card').forEach(c => c.classList.remove('active'));
            // Add active to clicked card
            card.classList.add('active');
        });
    });
}

// Floating animation for hero nodes
function animateHeroNodes() {
    const nodes = document.querySelectorAll('.node');
    
    nodes.forEach((node, index) => {
        let startTime = Date.now() + (index * 1000);
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % 3000) / 3000;
            const y = Math.sin(progress * Math.PI * 2) * 20;
            
            node.style.transform = `translateX(-50%) translateY(${y}px)`;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Connection line animation
function animateConnectionLines() {
    const lines = document.querySelectorAll('.connection-line');
    
    lines.forEach((line, index) => {
        let opacity = 0.3;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                opacity += 0.02;
                if (opacity >= 1) increasing = false;
            } else {
                opacity -= 0.02;
                if (opacity <= 0.3) increasing = true;
            }
            
            line.style.background = `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${opacity}), transparent)`;
        }, 50);
    });
}

// Typing animation for code blocks
function addTypingAnimation() {
    const codeBlocks = document.querySelectorAll('.code-block code');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                typeText(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    codeBlocks.forEach(block => {
        observer.observe(block);
    });
}

function typeText(element) {
    element.classList.add('typed');
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #6366f1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 30);
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateStatNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatNumber(element) {
    element.classList.add('animated');
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = number / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPercent) {
            displayValue += '%';
        } else if (hasX) {
            displayValue += 'x';
        }
        
        element.textContent = displayValue;
    }, 40);
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Parallax effect for floating stickers
function handleStickerParallax() {
    const stickers = document.querySelectorAll('.sticker');
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    stickers.forEach((sticker, index) => {
        const speed = 0.3 + (index % 3) * 0.1; // Varying speeds
        const yPos = scrolled * speed;
        sticker.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        
        // Fade out stickers as they approach the tools section
        const stickerRect = sticker.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const fadeStart = windowHeight * 0.7;
        
        if (stickerRect.top < fadeStart) {
            const fadeAmount = Math.max(0, 1 - (fadeStart - stickerRect.top) / fadeStart);
            sticker.style.opacity = fadeAmount;
        }
    });
}

// Animate connection cards on scroll
function animateConnectionCards() {
    const connectionCards = document.querySelectorAll('.connection-card');
    const windowHeight = window.innerHeight;
    
    connectionCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        
        if (cardTop < windowHeight * 0.8) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}

// Initialize connection cards for animation
function initializeConnectionCards() {
    const connectionCards = document.querySelectorAll('.connection-card');
    connectionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
}

// Animate notifications on scroll
function animateNotifications() {
    const notifications = document.querySelectorAll('.notification');
    const windowHeight = window.innerHeight;
    
    notifications.forEach((notification, index) => {
        const notificationRect = notification.getBoundingClientRect();
        const notificationTop = notificationRect.top;
        
        if (notificationTop < windowHeight * 0.8) {
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}

// Initialize notifications for animation
function initializeNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach((notification, index) => {
        notification.style.opacity = '0';
        notification.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        notification.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
}

// Sticker click interactions
function initializeStickerInteractions() {
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach(sticker => {
        sticker.addEventListener('click', () => {
            const toolName = sticker.getAttribute('data-tool');
            const toolsSection = document.getElementById('mcp-tools');
            
            // Add pulse animation
            sticker.style.animation = 'pulse 0.5s ease-in-out';
            
            // Scroll to tools section
            setTimeout(() => {
                toolsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight corresponding tool card
                const toolCards = document.querySelectorAll('.tool-card h3');
                toolCards.forEach(card => {
                    if (card.textContent.includes(toolName.split(' ')[0])) {
                        const parentCard = card.closest('.tool-card');
                        parentCard.style.borderColor = '#ff6b6b';
                        parentCard.style.transform = 'translateY(-8px) scale(1.02)';
                        
                        setTimeout(() => {
                            parentCard.style.borderColor = '';
                            parentCard.style.transform = '';
                        }, 2000);
                    }
                });
            }, 500);
            
            // Reset animation
            setTimeout(() => {
                sticker.style.animation = 'float 6s ease-in-out infinite';
            }, 500);
        });
    });
}

// Enhanced floating animation with mouse tracking
function enhancedFloatingAnimation() {
    const stickers = document.querySelectorAll('.sticker');
    const objects = document.querySelectorAll('.object');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        [...stickers, ...objects].forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.015;
            const x = (mouseX - 0.5) * 15 * speed;
            const y = (mouseY - 0.5) * 15 * speed;
            
            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Add interactive CTA button effects
function initializeCTAEffects() {
    const ctaButtons = document.querySelectorAll('.btn-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.2) saturate(1.3)';
            button.style.transform = 'translateY(-6px) scale(1.08)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.filter = '';
            button.style.transform = '';
        });
        
        button.addEventListener('click', () => {
            // Create ripple effect
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-cta 0.8s linear;
                left: ${event.clientX - rect.left}px;
                top: ${event.clientY - rect.top}px;
                width: 40px;
                height: 40px;
                margin-left: -20px;
                margin-top: -20px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
}

// Add CSS for CTA ripple animation
const ctaStyle = document.createElement('style');
ctaStyle.textContent = `
    @keyframes ripple-cta {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(ctaStyle);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleParallax();
        handleStickerParallax();
        animateConnectionCards();
        animateNotifications();
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Modal event listeners
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Initialize animations
    observeElements();
    handleDetailCardClick();
    addTypingAnimation();
    animateStats();
    initializeConnectionCards();
    initializeNotifications();
    initializeStickerInteractions();
    enhancedFloatingAnimation();
    initializeCTAEffects();
    
    // Initial navbar state
    handleNavbarScroll();
    updateActiveNavLink();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to example cards
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-example');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary, .btn-example {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #ec4899);
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});

// MCP Prompt interaction
function tryMCPPrompt(promptId) {
    const prompts = {
        1: {
            title: "Code Security Review",
            explanation: "This prompt demonstrates how MCP connects your AI to security databases, vulnerability scanners, and coding standards to provide comprehensive code reviews that go beyond simple pattern matching.",
            benefits: [
                "Real-time access to CVE databases",
                "Integration with security scanning tools", 
                "Contextual understanding of your codebase",
                "Automated compliance checking"
            ]
        },
        2: {
            title: "Sales Data Analysis", 
            explanation: "With MCP, your AI can directly query your database, access historical trends, and cross-reference market data to provide intelligent insights rather than generic responses.",
            benefits: [
                "Live database connectivity",
                "Historical trend analysis",
                "Market context integration",
                "Automated report generation"
            ]
        },
        3: {
            title: "API Documentation Generation",
            explanation: "MCP enables AI to scan your actual codebase, extract endpoint information, and generate documentation that stays synchronized with your code changes.",
            benefits: [
                "Automatic code scanning",
                "Real-time synchronization",
                "Comprehensive endpoint mapping",
                "Template-based consistency"
            ]
        },
        4: {
            title: "Bug Detection & Analysis",
            explanation: "Through MCP, AI can access your application logs, performance metrics, and error patterns to identify bugs and suggest fixes based on actual runtime data.",
            benefits: [
                "Real-time log analysis",
                "Performance monitoring integration",
                "Pattern recognition across errors",
                "Contextual debugging assistance"
            ]
        }
    };
    
    const prompt = prompts[promptId];
    if (!prompt) return;
    
    // Remove active state from all cards
    document.querySelectorAll('.mcp-prompt-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active state to clicked card
    event.target.closest('.mcp-prompt-card').classList.add('active');
    
    // Create or update result display
    let resultDiv = document.querySelector('.mcp-prompt-result');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.className = 'mcp-prompt-result';
        document.querySelector('.mcp-prompt-examples').appendChild(resultDiv);
    }
    
    resultDiv.innerHTML = `
        <div class="result-content">
            <h4>${prompt.title}</h4>
            <p>${prompt.explanation}</p>
            <div class="result-benefits">
                <h5>MCP Advantages:</h5>
                <ul>
                    ${prompt.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    resultDiv.classList.add('active');
    
    // Scroll to result
    setTimeout(() => {
        resultDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 300);
}

// Make functions available globally for onclick handlers
window.scrollToSection = scrollToSection;
window.showExample = showExample;
window.closeModal = closeModal;
window.copyCode = copyCode;
window.switchCategory = switchCategory;
window.tryPrompt = tryPrompt;
window.tryMCPPrompt = tryMCPPrompt;