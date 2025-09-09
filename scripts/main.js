// Main JavaScript - Common functionality across all pages

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize navigation
  // Simple stats animation without complex counting
  function animateStatsCounters() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      stat.style.opacity = "1";
    });
  }
  initializeNavigation();

  // Initialize animations
  initializeAnimations();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize mobile menu (if needed)
  initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    // Remove any existing active classes
    link.classList.remove("active");

    // Add active class to current page
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Add hover effects for navigation
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(-1px)";
      }
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

// Animation functionality
function initializeAnimations() {
  // Simple fade in elements on scroll (reduced effect)
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -20px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate with minimal effect
  const animateElements = document.querySelectorAll(
    ".feature-card, .news-item, .value-card, .company-card, .team-member, .strategy-item"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0.7";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    observer.observe(el);
  });

  // Simple stats counters without animation
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    // Just show the numbers immediately without counting animation
    stat.style.opacity = "1";
  });
}

// Smooth scrolling functionality (simplified)
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  const navigation = document.querySelector(".navigation");

  // Check if we need mobile menu (on smaller screens)
  function checkMobileMenu() {
    if (window.innerWidth <= 768) {
      if (!navigation.querySelector(".mobile-menu-toggle")) {
        createMobileMenuToggle();
      }
    } else {
      removeMobileMenuToggle();
    }
  }

  function createMobileMenuToggle() {
    const toggle = document.createElement("button");
    toggle.className = "mobile-menu-toggle";
    toggle.innerHTML = "☰";
    toggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 10px;
            display: block;
        `;

    toggle.addEventListener("click", function () {
      const navMenu = document.querySelector(".nav-menu");
      navMenu.style.display =
        navMenu.style.display === "none" ? "flex" : "none";
    });

    navigation.insertBefore(toggle, navigation.firstChild);

    // Hide menu by default on mobile
    const navMenu = document.querySelector(".nav-menu");
    navMenu.style.display = "none";
    navMenu.style.flexDirection = "column";
    navMenu.style.position = "absolute";
    navMenu.style.top = "100%";
    navMenu.style.left = "0";
    navMenu.style.right = "0";
    navMenu.style.backgroundColor = "rgba(187, 23, 23, 0.95)";
    navMenu.style.padding = "20px";
    navMenu.style.borderRadius = "0 0 8px 8px";
  }

  function removeMobileMenuToggle() {
    const toggle = navigation.querySelector(".mobile-menu-toggle");
    if (toggle) {
      toggle.remove();
    }

    const navMenu = document.querySelector(".nav-menu");
    navMenu.style.display = "";
    navMenu.style.flexDirection = "";
    navMenu.style.position = "";
    navMenu.style.top = "";
    navMenu.style.left = "";
    navMenu.style.right = "";
    navMenu.style.backgroundColor = "";
    navMenu.style.padding = "";
    navMenu.style.borderRadius = "";
  }

  // Check on load and resize
  checkMobileMenu();
  window.addEventListener("resize", checkMobileMenu);
}

// Animate number counters
function animateStatsCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const text = stat.textContent;
    const number = parseFloat(text.replace(/[^0-9.]/g, ""));

    if (!isNaN(number) && number > 0) {
      animateCounter(stat, number, text);
    }
  });
}

function animateCounter(element, targetNumber, originalText) {
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60 FPS
  const totalFrames = Math.round(duration / frameDuration);
  const easing = (t) => t * (2 - t); // ease out

  let frame = 0;
  const counter = setInterval(() => {
    frame++;
    const progress = easing(frame / totalFrames);
    const currentNumber = Math.round(targetNumber * progress);

    // Reconstruct the text with the current number
    element.textContent = originalText.replace(
      /[\d.]+/,
      currentNumber.toLocaleString()
    );

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = originalText; // Ensure we end with the exact original text
    }
  }, frameDuration);
}

// Button interaction effects
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px)";
    });
  });
});

// Card hover effects
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(
    ".card, .feature-card, .news-item, .value-card, .company-card, .team-member"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease";
    });
  });
});

// Scroll to top functionality
function createScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #BB1717 0%, #8B0000 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(187, 23, 23, 0.3);
    `;

  scrollButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  scrollButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });

  document.body.appendChild(scrollButton);

  // Show/hide scroll button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = "1";
      scrollButton.style.visibility = "visible";
    } else {
      scrollButton.style.opacity = "0";
      scrollButton.style.visibility = "hidden";
    }
  });
}

// Initialize scroll to top
document.addEventListener("DOMContentLoaded", createScrollToTop);

// Page loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Add CSS for loading state
  const style = document.createElement("style");
  style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        body.loaded {
            opacity: 1;
        }
    `;
  document.head.appendChild(style);
});

// Error handling for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.warn("Image failed to load:", this.src);
      // Optionally show a placeholder or hide the image
      this.style.opacity = "0.5";
    });
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
});

// Console welcome message (corporate touch)
console.log(
  "%cOrbit Capital",
  "color: #BB1717; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cPremier Technology Investment Firm",
  "color: #666; font-size: 14px;"
);
console.log("Visit us at: https://orbitcapital.com");
