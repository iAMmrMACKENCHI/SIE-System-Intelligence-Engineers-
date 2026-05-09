// DOM Elements
const nav = document.querySelector('.nav');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');
const formSteps = document.querySelectorAll('.form-step');
const progressDots = document.querySelectorAll('.progress-dot');
const problemCards = document.querySelectorAll('.problem-card');
const counterElement = document.querySelector('.counter-number');
const processLineFill = document.querySelector('.process-line-fill');
const caseMetrics = document.querySelectorAll('.case-metric');

// State
let currentStep = 0;
let counter = 0;
let maxCounter = 8;

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Initialize animations
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Sticky Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// Problem Cards Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && counter < maxCounter) {
      const increment = setInterval(() => {
        counter++;
        counterElement.textContent = counter;
        if (counter >= maxCounter) {
          clearInterval(increment);
        }
      }, 200);
    }
  });
}, { threshold: 0.5 });

if (counterElement) {
  counterObserver.observe(counterElement);
}

// Process Timeline Animation
const processObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const steps = document.querySelectorAll('.step');
      let completedSteps = 0;

      const stepObserver = new IntersectionObserver((stepEntries) => {
        stepEntries.forEach(stepEntry => {
          if (stepEntry.isIntersecting) {
            completedSteps++;
            const progress = (completedSteps / steps.length) * 100;
            processLineFill.style.width = `${progress}%`;
          }
        });
      }, { threshold: 0.5 });

      steps.forEach(step => stepObserver.observe(step));
    }
  });
}, { threshold: 0.1 });

const processSection = document.querySelector('.process');
if (processSection) {
  processObserver.observe(processSection);
}

// Case Study Counter Animation
const caseObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        entry.target.textContent = Math.floor(current) + (entry.target.dataset.suffix || '');
      }, 50);
    }
  });
}, { threshold: 0.5 });

caseMetrics.forEach(metric => {
  caseObserver.observe(metric);
});

// Form Step Navigation
function showStep(step) {
  formSteps.forEach((formStep, index) => {
    if (index === step) {
      formStep.classList.add('active');
    } else {
      formStep.classList.remove('active');
    }
  });

  progressDots.forEach((dot, index) => {
    if (index <= step) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextStep() {
  if (currentStep < formSteps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Form Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Continue buttons
  document.querySelectorAll('.btn-continue').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  // Form submission
  document.querySelector('.consultation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission (frontend only)
    alert('Thank you for your interest! We will contact you within 24 hours.');
  });

  // Initialize first step
  showStep(0);
});

// Dashboard Animation
function animateDashboard() {
  const cards = document.querySelectorAll('.dashboard-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 200);
  });
}

// Call dashboard animation on load
document.addEventListener('DOMContentLoaded', animateDashboard);

// Smooth scrolling for anchor links
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

// Performance optimization: Lazy load images if any
// const images = document.querySelectorAll('img[data-src]');
// const imageObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const img = entry.target;
//       img.src = img.dataset.src;
//       img.classList.remove('lazy');
//       imageObserver.unobserve(img);
//     }
//   });
// });
// images.forEach(img => imageObserver.observe(img));