'use strict';

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
  navigationLinks.forEach((link, index) => {
    link.addEventListener("click", function () {
      // Check for data-page-target attribute first, then fall back to innerHTML
      const targetPage = this.getAttribute('data-page-target') || this.innerHTML.toLowerCase();
      pages.forEach((page, pageIndex) => {
        if (targetPage === page.dataset.page) {
          page.classList.add("active");
          navigationLinks[pageIndex].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[pageIndex].classList.remove("active");
        }
      });
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
