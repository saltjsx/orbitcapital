// Home Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  // Initialize basic animations
  initializeBasicAnimations();

  // Initialize simple interactions
  initializeBasicInteractions();
});

// Basic hero section display
function initializeBasicAnimations() {
  const heroElements = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .hero-stats, .hero-buttons"
  );

  // Simple fade in without stagger
  heroElements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
}

// Basic interactions without complex animations
function initializeBasicInteractions() {
  const newsItems = document.querySelectorAll(".news-item");

  newsItems.forEach((item) => {
    // Simple hover effect
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Feature cards basic interaction
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // Stats basic display
  const stats = document.querySelectorAll(".stat");
  stats.forEach((stat) => {
    stat.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(187, 23, 23, 0.1)";
    });

    stat.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    });
  });
}
