// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
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

    // Intersection Observer for fade-in animations
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

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Dynamic header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.8)';
                header.style.boxShadow = 'none';
            }
        }
    });

    // Enhanced app card hover effects
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add some interactive button animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Console welcome message for developers
    console.log('🚀 Welcome to SpinnahApp! Built with love by ShastLeLow.');
    console.log('💡 Interested in how this was built? Check out our open source tools!');
});

// Mobile Menu Toggle Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn && mainNav) {
    // Toggle mobile menu when hamburger is clicked
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnButton && mainNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// --- SpinnahApp Theme Switcher (Footer Version) ---
(function() {
  const themeBtns = document.querySelectorAll('.footer-theme-btn');
  const html = document.documentElement;
  const logo = document.querySelector('.site-logo');
  const LIGHT_LOGO = 'assets/spinnahapp-logo.png';
  const DARK_LOGO = 'assets/spinnahapp-logo-dark.png';

  function setTheme(theme) {
    if (theme === 'auto') {
      html.removeAttribute('data-theme');
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      logo && (logo.src = isDark ? DARK_LOGO : LIGHT_LOGO);
    } else {
      html.setAttribute('data-theme', theme);
      logo && (logo.src = theme === 'dark' ? DARK_LOGO : LIGHT_LOGO);
    }
    localStorage.setItem('spinnah-theme', theme);
    themeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === theme));
  }

  function getStoredTheme() {
    return localStorage.getItem('spinnah-theme') || 'auto';
  }

  // Listen for theme button clicks
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.mode));
  });

  // Listen for system theme changes if auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (getStoredTheme() === 'auto') setTheme('auto');
  });

  // On load, apply theme
  setTheme(getStoredTheme());
})();

// Utility function for future features
function showNotification(message, type = 'info') {
    // This can be expanded later for user notifications
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Export for potential future module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showNotification };
}