// Theme Toggle (Light, Dark, Auto)
const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    document.documentElement.setAttribute('data-color-scheme', mode);

    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const siteNav = document.querySelector('.site-nav');

if (mobileMenuBtn && siteNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    siteNav.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      siteNav.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !siteNav.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      siteNav.classList.remove('active');
    }
  });
}

// Header scroll effect
const siteHeader = document.querySelector('.site-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    siteHeader.style.background = `rgba(var(--bg-rgb, 255, 255, 255), 0.95)`;
    siteHeader.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  } else {
    siteHeader.style.background = `rgba(var(--bg-rgb, 255, 255, 255), 0.8)`;
    siteHeader.style.boxShadow = 'none';
  }
  
  lastScrollY = currentScrollY;
});

// Scroll shrink effect
// const zoomImg = document.querySelector('.zoom-screenshot');
// const container = document.getElementById('scroll-container');

// window.addEventListener('scroll', () => {
//   const containerRect = container.getBoundingClientRect();
//   const scrollProgress = Math.min(Math.max((window.innerHeight - containerRect.top) / window.innerHeight, 0), 1);

//   const scale = 1 - 0.5 * scrollProgress;
//   const translateY = 0 + 50 * scrollProgress;

//   zoomImg.style.transform = `translateX(-50%) translateY(${translateY}%) scale(${scale})`;
// });