/**
 * WEBORA Studioz - Main JavaScript
 * Shared across all pages (Home, Services, Contact)
 */

// ============================================================
// Mobile Menu Functions
// ============================================================
function openMob() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMob() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html') ||
        (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html') ||
        (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================================
// Stats Counter (Only on Home Page)
// ============================================================
function animateCounter(element, target, suffix) {
  if (!element) return;
  let count = 0;
  const increment = Math.ceil(target / 70);
  
  const timer = setInterval(() => {
    count = Math.min(count + increment, target);
    element.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 22);
}

function initStatsObserver() {
  const statsSection = document.querySelector('.stats-section');
  const countriesEl = document.getElementById('stat-countries');
  const projectsEl = document.getElementById('stat-projects');
  
  if (!statsSection || !countriesEl || !projectsEl) return;
  
  let statsAnimated = false;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounter(countriesEl, 25, '+');
      animateCounter(projectsEl, 500, '+');
    }
  }, { threshold: 0.4 });
  
  observer.observe(statsSection);
}

// ============================================================
// Hero Carousel (Only on Home Page)
// ============================================================
function initHeroCarousel() {
  const heroImages = [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=85',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000&q=85',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&q=85'
  ];
  
  const heroBg = document.querySelector('.hero-bg');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  
  if (!heroBg || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  
  const updateImage = (index) => {
    currentIndex = (index + heroImages.length) % heroImages.length;
    heroBg.style.opacity = '0.6';
    setTimeout(() => {
      heroBg.src = heroImages[currentIndex];
      setTimeout(() => {
        heroBg.style.opacity = '1';
      }, 50);
    }, 150);
  };
  
  prevBtn.addEventListener('click', () => updateImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateImage(currentIndex + 1));
}

// ============================================================
// Contact Form (Only on Contact Page)
// ============================================================
function initContactForm() {
  const submitBtn = document.querySelector('.msg-submit');
  if (!submitBtn) return;
  
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const phone = document.getElementById('cf-phone');
    const message = document.getElementById('cf-msg');
    const formOk = document.getElementById('form-ok');
    
    if (!name.value.trim()) {
      alert('Please enter your name.');
      name.focus();
      return;
    }
    
    if (!email.value.trim() || !email.value.includes('@')) {
      alert('Please enter a valid email address.');
      email.focus();
      return;
    }
    
    if (formOk) {
      formOk.style.display = 'block';
    }
    
    // Clear form
    name.value = '';
    email.value = '';
    if (phone) phone.value = '';
    if (message) message.value = '';
    
    setTimeout(() => {
      if (formOk) formOk.style.display = 'none';
    }, 5000);
    
    console.log('Form submitted');
  });
}

// ============================================================
// Chat Widget
// ============================================================
function initChatWidget() {
  const chatBtn = document.getElementById('chat-btn');
  const chatPopup = document.getElementById('chat-popup');
  
  if (!chatBtn || !chatPopup) return;
  
  chatBtn.addEventListener('click', () => {
    const isVisible = chatPopup.style.display === 'none';
    chatPopup.style.display = isVisible ? 'flex' : 'none';
  });
}

// ============================================================
// Service Cards Animation (Services Page)
// ============================================================
function initServiceCards() {
  const cards = document.querySelectorAll('.svc-big-card');
  if (!cards.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });
}

// ============================================================
// Initialize Everything
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const hamBtn = document.getElementById('ham-btn');
  const mobClose = document.getElementById('mob-close');
  
  if (hamBtn) hamBtn.addEventListener('click', openMob);
  if (mobClose) mobClose.addEventListener('click', closeMob);
  
  // Set active nav link
  setActiveNavLink();
  
  // Page-specific initializations
  initChatWidget();
  initStatsObserver();    // Only runs if elements exist on page
  initHeroCarousel();     // Only runs if elements exist on page
  initContactForm();      // Only runs if elements exist on page
  initServiceCards();     // Only runs if elements exist on page
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 680) {
    closeMob();
  }
});
