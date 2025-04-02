// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileNavToggle.setAttribute('aria-expanded',
        mobileNavToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  const scrollWatcher = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', scrollWatcher);

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current FAQ item
      item.classList.toggle('active');
    });
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-fade-in');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile nav if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Gallery image overlay effect
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.opacity = '1';
    });

    item.addEventListener('mouseleave', () => {
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.opacity = '0';
    });
  });

  // Contact form validation
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Reset error classes
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('error');
      });

      // Simple validation
      if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        isValid = false;
      }

      if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
      }

      if (messageInput.value.trim() === '') {
        messageInput.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        // In a real application, you would submit the form here
        // For this demo, we'll just show a success message
        const formContainer = document.querySelector('.contact-form');
        formContainer.innerHTML = '<div class="success-message"><h3>Thank you for your message!</h3><p>We will get back to you as soon as possible.</p></div>';
      }
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Add animation classes to elements
  const addAnimationClasses = () => {
    // Services section
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.classList.add('animate-on-scroll');
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // About section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      aboutContent.classList.add('animate-on-scroll');
    }

    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
      card.classList.add('animate-on-scroll');
    });

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.classList.add('animate-on-scroll');
      item.style.animationDelay = `${index * 0.05}s`;
    });

    // Team members
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
      card.classList.add('animate-on-scroll');
      card.style.animationDelay = `${index * 0.1}s`;
    });
  };

  addAnimationClasses();

  // Testimonial slider (simple version)
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = 'none';
      }
    });

    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';

    testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'slider-dot';
      if (index === 0) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {
        showTestimonial(index);
      });

      dotsContainer.appendChild(dot);
    });

    testimonialSlider.appendChild(dotsContainer);

    // Function to show a specific testimonial
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
      });

      // Update dots
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentTestimonial = index;
    }

    // Auto-rotate testimonials
    setInterval(() => {
      let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextTestimonial);
    }, 5000);
  }

  // Service tab filtering functionality
  const serviceFilterContainer = document.querySelector('.service-filters');
  if (serviceFilterContainer) {
    const filters = serviceFilterContainer.querySelectorAll('.service-filter');
    const serviceItems = document.querySelectorAll('.service-card');

    filters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Remove active class from all filters
        filters.forEach(f => f.classList.remove('active'));

        // Add active class to current filter
        this.classList.add('active');

        const category = this.getAttribute('data-filter');

        // Show/hide service items based on category
        serviceItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';

            // Add animation
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
});
