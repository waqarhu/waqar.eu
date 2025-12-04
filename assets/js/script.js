'use strict';

// Avatar rotation
const avatarImages = [
  './assets/images/my-avatar.webp',
  './assets/images/my-avatar-1.webp'
  // Add more image paths here
];

let currentAvatarIndex = 0;
const avatarElement = document.getElementById('profile-avatar');

function rotateAvatar() {
  if (avatarImages.length > 1 && avatarElement) {
    currentAvatarIndex = (currentAvatarIndex + 1) % avatarImages.length;
    avatarElement.style.opacity = '0';
    
    setTimeout(() => {
      avatarElement.src = avatarImages[currentAvatarIndex];
      avatarElement.style.opacity = '1';
    }, 2000);
  }
}

// Start rotation if multiple images exist
if (avatarImages.length > 1) {
  setInterval(rotateAvatar, 10000); // Change image every 10 seconds
}

// Testimonials shuffle function
function shuffleTestimonials() {
  const testimonialsList = document.querySelector('.testimonials-list');
  if (!testimonialsList) return;
  
  const items = Array.from(testimonialsList.children);
  if (items.length <= 1) return;
  
  // Fisher-Yates shuffle algorithm
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  
  // Fade out effect
  testimonialsList.style.opacity = '0';
  
  setTimeout(() => {
    // Reorder the DOM elements
    items.forEach(item => testimonialsList.appendChild(item));
    // Fade in effect
    testimonialsList.style.opacity = '1';
  }, 500);
}

// Start testimonials shuffle (every 30 seconds)
setInterval(shuffleTestimonials, 30000);

// Inspirational Quotes from API
async function fetchQuote() {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');
  
  if (!quoteText || !quoteAuthor) return;
  
  try {
    // Fetch from ZenQuotes API (free, no auth required)
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    
    if (data && data[0]) {
      quoteText.textContent = `"${data[0].q}"`;
      quoteAuthor.textContent = `— ${data[0].a}`;
    }
  } catch (error) {
    // Fallback to local quotes if API fails
    const fallbackQuotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
      { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
      { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
      { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" }
    ];
    
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteText.textContent = `"${randomQuote.text}"`;
    quoteAuthor.textContent = `— ${randomQuote.author}`;
  }
}

// Display quote on page load
fetchQuote();

// Change quote every 2 minutes (120 seconds)
setInterval(fetchQuote, 120000);

// Utility functions
const elementToggleFunc = function (elem) { 
  if (elem) elem.classList.toggle("active"); 
};

const sanitizeInput = function (input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-container] time");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      try {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");
        
        if (avatar && title && text) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
          modalTitle.textContent = title.textContent;
          modalText.textContent = text.textContent;
          
          // Update date from testimonial data attribute
          const dateValue = this.getAttribute("data-testimonial-date");
          const dateText = this.getAttribute("data-testimonial-date-text");
          if (dateValue && dateText && modalDate) {
            modalDate.setAttribute("datetime", dateValue);
            modalDate.textContent = dateText;
          }

          testimonialsModalFunc();
        }
      } catch (error) {
        console.error('Error opening testimonial modal:', error);
      }
    });
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems.length > 0 && selectValue) {
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length > 0 && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // Form submission handler with loading state and feedback
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('form-status');
    const formData = new FormData(form);
    
    if (formBtn) {
      formBtn.disabled = true;
      formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.style.backgroundColor = '#d4edda';
          formStatus.style.color = '#155724';
          formStatus.style.border = '1px solid #c3e6cb';
          formStatus.innerHTML = '✓ Message sent successfully! I\'ll get back to you soon.';
        }
        form.reset();
        formBtn.setAttribute("disabled", "");
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error
      if (formStatus) {
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = '#f8d7da';
        formStatus.style.color = '#721c24';
        formStatus.style.border = '1px solid #f5c6cb';
        formStatus.innerHTML = '✗ Oops! Something went wrong. Please try again or email me directly.';
      }
    } finally {
      // Reset button
      if (formBtn) {
        formBtn.disabled = false;
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      }
      
      // Hide status message after 5 seconds
      setTimeout(() => {
        if (formStatus) {
          formStatus.style.display = 'none';
        }
      }, 5000);
    }
  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Check for data-page-target attribute first, then fall back to innerHTML
      const targetPage = this.getAttribute('data-page-target') || this.innerHTML.toLowerCase();
      
      // Remove active from all pages and links first
      pages.forEach(page => page.classList.remove("active"));
      navigationLinks.forEach(navLink => navLink.classList.remove("active"));
      
      // Add active to matching page and clicked link
      pages.forEach(page => {
        if (targetPage === page.dataset.page) {
          page.classList.add("active");
        }
      });
      
      this.classList.add("active");
      window.scrollTo(0, 0);
    });
  });
}

// Global error handler
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// Theme toggle functionality
const themeToggle = document.querySelector("[data-theme-toggle]");
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", function() {
    const theme = html.getAttribute("data-theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  html.classList.add('reduce-motion');
}

// Calculate years of experience from 2015
const calculateYearsOfExperience = function() {
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

// Update years of experience dynamically
document.addEventListener('DOMContentLoaded', function() {
  const yearsOfExperience = calculateYearsOfExperience();
  const experienceElements = document.querySelectorAll('[data-years-experience]');
  
  experienceElements.forEach(element => {
    const text = element.textContent || element.innerText;
    const updatedText = text.replace(/\d+\+?/, yearsOfExperience + '+');
    element.textContent = updatedText;
  });
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Service Worker registered:', reg);
        }
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Service Worker registration failed:', err);
        }
      });
  });
}
