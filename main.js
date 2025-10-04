// Main JavaScript file for Dr. Yang Liu's academic website
// Handles animations, interactions, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnimations();
    initPublicationFilters();
    initContactForm();
    initMobileMenu();
    initCharts();
    initNetworkCanvas();
    initSliders();
});

// Animation initialization using Anime.js
function initAnimations() {
    // Fade in animations for main elements
    anime({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });

    // Stagger animations for cards and items
    anime({
        targets: '.stagger-item',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(150, {start: 400}),
        easing: 'easeOutQuart'
    });

    // Animate metric counters on homepage
    animateCounters();

    // Scroll-triggered animations
    initScrollAnimations();
}

// Animate counter numbers
function animateCounters() {
    const counters = [
        { id: 'publications-count', target: 40 },
        { id: 'citations-count', target: 1700 },
        { id: 'awards-count', target: 16 },
        { id: 'grants-count', target: 4 }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            anime({
                targets: { count: 0 },
                count: counter.target,
                duration: 2000,
                delay: 1000,
                easing: 'easeOutQuart',
                update: function(anim) {
                    const value = Math.floor(anim.animatables[0].target.count);
                    element.textContent = counter.id === 'citations-count' ? value + '+' : value;
                }
            });
        }
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('research-card')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('publication-card')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuart'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.research-card, .publication-card, .award-card').forEach(el => {
        observer.observe(el);
    });
}

// Publication filtering system
function initPublicationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');

    if (filterButtons.length === 0 || publicationCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter publications
            publicationCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || (categories && categories.includes(filter));

                if (shouldShow) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        scale: [1, 0.9],
                        duration: 300,
                        easing: 'easeInQuart',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.getElementById('mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = createMobileMenu();
                nav.appendChild(mobileMenu);
            }
            
            // Toggle menu
            const isVisible = mobileMenu.style.display === 'block';
            mobileMenu.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                anime({
                    targets: mobileMenu,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
    }
}

// Create mobile menu
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-lg';
    mobileMenu.style.display = 'none';
    
    mobileMenu.innerHTML = `
        <div class="px-6 py-4 space-y-2">
            <a href="index.html" class="block py-2 text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="about.html" class="block py-2 text-gray-700 hover:text-gray-900 font-medium">About</a>
            <a href="research.html" class="block py-2 text-gray-700 hover:text-gray-900 font-medium">Research</a>
            <a href="publications.html" class="block py-2 text-gray-700 hover:text-gray-900 font-medium">Publications</a>
        </div>
    `;
    
    return mobileMenu;
}

// Initialize charts using ECharts
function initCharts() {
    // Citations chart
    const citationsChart = document.getElementById('citations-chart');
    if (citationsChart) {
        const chart = echarts.init(citationsChart);
        
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['2020', '2021', '2022', '2023', '2024', '2025'],
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                }
            },
            series: [{
                data: [50, 150, 350, 600, 1000, 1700],
                type: 'bar',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4a90e2' },
                        { offset: 1, color: '#1a2332' }
                    ])
                },
                animationDelay: function (idx) {
                    return idx * 100;
                }
            }]
        };
        
        chart.setOption(option);
        
        // Animate chart on load
        setTimeout(() => {
            chart.resize();
        }, 100);
    }

    // Venues chart
    const venuesChart = document.getElementById('venues-chart');
    if (venuesChart) {
        const chart = echarts.init(venuesChart);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: 'Publication Venues',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '50%'],
                data: [
                    { value: 20, name: 'Journals', itemStyle: { color: '#4a90e2' } },
                    { value: 20, name: 'Conferences', itemStyle: { color: '#d4af37' } },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return idx * 200;
                }
            }]
        };
        
        chart.setOption(option);
        
        // Animate chart on load
        setTimeout(() => {
            chart.resize();
        }, 100);
    }
}

// Network canvas animation using p5.js
function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    let nodes = [];
    let connections = [];
    const numNodes = 50;

    new p5((p) => {
        p.setup = function() {
            const canvasContainer = canvas.parentElement;
            const width = canvasContainer.offsetWidth;
            const height = canvasContainer.offsetHeight;
            
            p.createCanvas(width, height, canvas);
            
            // Create nodes
            for (let i = 0; i < numNodes; i++) {
                nodes.push({
                    x: p.random(width),
                    y: p.random(height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 4)
                });
            }
        };

        p.draw = function() {
            p.clear();
            
            // Update and draw nodes
            nodes.forEach(node => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > p.width) node.vx *= -1;
                if (node.y < 0 || node.y > p.height) node.vy *= -1;
                
                // Draw node
                p.fill(255, 255, 255, 100);
                p.noStroke();
                p.ellipse(node.x, node.y, node.size);
            });
            
            // Draw connections
            p.stroke(255, 255, 255, 30);
            p.strokeWeight(1);
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    if (dist < 100) {
                        const alpha = p.map(dist, 0, 100, 50, 0);
                        p.stroke(255, 255, 255, alpha);
                        p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                    }
                }
            }
        };

        p.windowResized = function() {
            const canvasContainer = canvas.parentElement;
            const width = canvasContainer.offsetWidth;
            const height = canvasContainer.offsetHeight;
            p.resizeCanvas(width, height);
        };
    }, canvas);
}

// Initialize sliders using Splide
function initSliders() {
    const publicationsSlider = document.getElementById('publications-slider');
    
    if (publicationsSlider) {
        new Splide(publicationsSlider, {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: '1rem'
                }
            }
        }).mount();
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle window resize for responsive elements
window.addEventListener('resize', function() {
    // Reinitialize charts on resize
    const charts = document.querySelectorAll('[id$="-chart"]');
    charts.forEach(chartElement => {
        const chart = echarts.getInstanceByDom(chartElement);
        if (chart) {
            chart.resize();
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
});

// Preload critical images
function preloadImages() {
    const images = [
        'resources/hero-bg.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();