// Navigation Component
class Navigation {
    constructor() {
        this.navData = [
            { href: 'index.html', text: 'Overview', id: 'overview' },
            { href: 'index.html#apps', text: 'Apps', id: 'apps' },
            { href: 'about.html', text: 'About', id: 'about' },
            { href: 'whats-new.html', text: "What's New", id: 'whats-new' },
            { href: 'blog.html', text: 'Blog', id: 'blog' }
        ];
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }

    isActiveLink(item) {
        const currentPage = this.getCurrentPage();
        
        // Handle index.html with anchor links
        if (currentPage === 'index.html' || currentPage === '') {
            if (item.href === 'index.html') {
                // Check if we're on the home section (no hash or #home hash)
                const hash = window.location.hash;
                return !hash || hash === '#home';
            }
            if (item.href === 'index.html#apps') {
                return window.location.hash === '#apps';
            }
        }
        
        // Handle other pages
        return currentPage === item.href || 
               (item.href.includes('#') && currentPage === item.href.split('#')[0]);
    }

    generateHTML() {
        const navLinks = this.navData.map(item => {
            const isActive = this.isActiveLink(item);
            const activeClass = isActive ? 'active' : '';
            
            return `<li><a href="${item.href}" class="${activeClass}">${item.text}</a></li>`;
        }).join('');

        return `
            <nav>
                <div class="nav-container">
                    <img src="assets/spinnahapp-logo.png" alt="Spinnah" class="logo" />
                    <span class="site-title">Spinnah</span>
                    <ul class="nav-links">
                        ${navLinks}
                    </ul>
                    <button class="mobile-menu-button" aria-label="Toggle mobile menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                </div>
            </nav>
        `;
    }

    render(container = 'body') {
        const target = document.querySelector(container);
        if (target) {
            // Insert at the beginning of the body
            target.insertAdjacentHTML('afterbegin', this.generateHTML());
        }
    }

    init() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-links a');
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            const navLinksContainer = document.querySelector('.nav-links');
            
            // Mobile menu toggle
            if (mobileMenuButton && navLinksContainer) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenuButton.classList.toggle('active');
                    navLinksContainer.classList.toggle('active');
                });
                
                // Close mobile menu when clicking on a link
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenuButton.classList.remove('active');
                        navLinksContainer.classList.remove('active');
                    });
                });
            }
            
            // Active link management
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    link.classList.add('active');
                });
            });

            // Handle hash changes for anchor navigation
            window.addEventListener('hashchange', () => {
                this.updateActiveStates();
            });
        });
    }

    updateActiveStates() {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = this.isActiveLink({ href });
            
            if (isActive) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Auto-initialize navigation when script is loaded
const navigation = new Navigation();
navigation.init(); 