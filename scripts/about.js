// About Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  // Initialize basic animations
  initializeBasicAnimations();

  // Initialize simple interactions
  initializeBasicInteractions();
});

// Simple fade in animations
function initializeBasicAnimations() {
  const valueCards = document.querySelectorAll(".value-card");
  const philosophyItems = document.querySelectorAll(".philosophy-item");

  // Simple fade in for value cards
  valueCards.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });

  // Simple fade in for philosophy items
  philosophyItems.forEach((item) => {
    item.style.opacity = "1";
    item.style.transform = "translateX(0)";
  });

  // Simple display for track record
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((number) => {
    number.style.opacity = "1";
  });
}

// Basic interactions
function initializeBasicInteractions() {
  const valueCards = document.querySelectorAll(".value-card");

  valueCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(187, 23, 23, 0.05)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    });
  });
}
