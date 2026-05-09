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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  nav = document.querySelector('.nav');
  mobileMenu = document.querySelector('.mobile-menu');
  hamburger = document.querySelector('.hamburger');
  formSteps = document.querySelectorAll('.form-step');
  progressDots = document.querySelectorAll('.progress-dot');
  problemCards = document.querySelectorAll('.problem-card');
  counterElement = document.querySelector('.counter-number');
  processLineFill = document.querySelector('.process-line-fill');
  caseMetrics = document.querySelectorAll('.case-metric');

  // Initialize animations
  document.querySelectorAll('.fade-in').forEach(el => {
    if (el) observer.observe(el);
  });

  // Initialize form
  showStep(0);

  // Initialize dashboard animation
  animateDashboard();

  // Form event listeners
  document.querySelectorAll('.btn-continue').forEach(btn => {
    btn.addEventListener('click', nextStep);
  });

  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', prevStep);
  });

  const form = document.querySelector('.consultation-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest! We will contact you within 24 hours.');
    });
  }

  // Sticky Navigation
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target)) {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    }
  });

  // Problem Cards Counter Animation
  if (counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && counter < maxCounter) {
          const increment = setInterval(() => {
            counter++;
            if (counterElement) counterElement.textContent = counter;
            if (counter >= maxCounter) {
              clearInterval(increment);
            }
          }, 200);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(counterElement);
  }

  // Process Timeline Animation
  const processSection = document.querySelector('.process');
  if (processSection && processLineFill) {
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
    processObserver.observe(processSection);
  }

  // Case Study Counter Animation
  caseMetrics.forEach(metric => {
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
    caseObserver.observe(metric);
  });

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
});

// Form Step Navigation
function showStep(step) {
  if (formSteps) {
    formSteps.forEach((formStep, index) => {
      if (index === step) {
        formStep.classList.add('active');
      } else {
        formStep.classList.remove('active');
      }
    });
  }

  if (progressDots) {
    progressDots.forEach((dot, index) => {
      if (index <= step) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

function nextStep() {
  if (currentStep < (formSteps ? formSteps.length - 1 : 2)) {
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

// Dashboard Animation
function animateDashboard() {
  const cards = document.querySelectorAll('.dashboard-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 200);
  });
}