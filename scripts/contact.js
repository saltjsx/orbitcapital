// Contact Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  // Initialize basic form functionality
  initializeContactForm();

  // Initialize simple FAQ accordion
  initializeFAQAccordion();

  // Initialize basic validation
  initializeFormValidation();
});

// Basic contact form functionality
function initializeContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitForm(this);
    }
  });
}

// Simple form validation
function initializeFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });
}

// Basic field validation
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  // Required field check
  if (field.hasAttribute("required") && !value) {
    field.style.borderColor = "#e74c3c";
    isValid = false;
  } else {
    field.style.borderColor = "";
  }

  // Email validation
  if (field.name === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.style.borderColor = "#e74c3c";
      isValid = false;
    }
  }

  return isValid;
}

// Simple form validation
function validateForm() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

// Basic form submission
function submitForm(form) {
  const submitButton = form.querySelector(".form-submit");
  const originalText = submitButton.textContent;

  submitButton.textContent = "SUBMITTING...";
  submitButton.disabled = true;

  // Simulate submission
  setTimeout(() => {
    alert("Thank you! Your proposal has been submitted successfully.");
    form.reset();

    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

// Simple FAQ accordion
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        otherAnswer.style.maxHeight = "0";
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}
