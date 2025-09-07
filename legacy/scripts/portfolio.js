// Portfolio Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  // Initialize basic portfolio filtering
  initializePortfolioFilter();

  // Initialize simple interactions
  initializeBasicInteractions();
});

// Basic portfolio filtering functionality
function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const companyCards = document.querySelectorAll(".company-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Simple filter companies
      companyCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filterValue === "all" || category === filterValue;

        if (shouldShow) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Basic interactions
function initializeBasicInteractions() {
  const companyCards = document.querySelectorAll(".company-card");

  companyCards.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

    // Simple hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.backgroundColor = "rgba(187, 23, 23, 0.05)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.backgroundColor = "";
    });
  });

  // Simple stats display
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    stat.style.opacity = "1";
  });
}
