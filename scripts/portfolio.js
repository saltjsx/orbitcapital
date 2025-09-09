// Portfolio Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  // Load companies from JSON then init interactions
  loadPortfolioCompanies();
});

// Fetch and render portfolio companies from JSON
function loadPortfolioCompanies() {
  fetch("portfolio_companies.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load portfolio data");
      return res.json();
    })
    .then((companies) => {
      renderCompanies(companies);
      updateStats(companies);
      initializePortfolioFilter();
      initializeBasicInteractions();
    })
    .catch((err) => {
      console.error(err);
      const grid = document.getElementById("companiesGrid");
      if (grid) {
        grid.innerHTML =
          '<p style="padding:1rem;color:#bb1717;">Unable to load portfolio companies right now.</p>';
      }
    });
}

function renderCompanies(companies) {
  const grid = document.getElementById("companiesGrid");
  if (!grid) return;

  grid.innerHTML = companies
    .map((c) => {
      const statusClass =
        c.status && c.status.toLowerCase() === "exited"
          ? "company-status exited"
          : "company-status";
      const tags = (c.tags || [])
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("");
      return `
        <div class="company-card" data-category="${escapeHtml(
          c.category
        )}" data-id="${escapeHtml(c.id)}">
          <div class="company-header">
            <div class="company-logo">${escapeHtml(
              c.code || c.name?.substring(0, 2) || "?"
            )}</div>
            <div class="${statusClass}">${escapeHtml(
        c.status || "Active"
      )}</div>
          </div>
          <h3>${escapeHtml(c.name)}</h3>
          <p class="company-description">${escapeHtml(c.description)}</p>
          <div class="company-meta">
            <span class="investment-year">${escapeHtml(String(c.year))}</span>
            <span class="investment-amount">${escapeHtml(
              c.investmentAmount
            )}</span>
          </div>
          <div class="company-tags">${tags}</div>
        </div>`;
    })
    .join("");
}

function updateStats(companies) {
  const statNumbers = document.querySelectorAll(
    ".portfolio-stats .stat-number"
  );
  if (statNumbers.length >= 1) {
    statNumbers[0].textContent = companies.length.toString();
  }
  // Exits is third stat (index 2) in current markup
  const exits = companies.filter(
    (c) => (c.status || "").toLowerCase() === "exited"
  ).length;
  if (statNumbers.length >= 3) {
    statNumbers[2].textContent = exits.toString();
  }
}

// Basic HTML escaping to avoid breaking markup
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
