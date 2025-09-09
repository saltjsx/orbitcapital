// Portfolio Page Specific JavaScript (Simplified)

document.addEventListener("DOMContentLoaded", function () {
  loadPortfolioCompanies();
});

// Fetch and render portfolio companies from JSON
let ALL_COMPANIES = [];
let activeCategory = "all";
let activeTag = null; // single tag filter for simplicity
let currentSort = "year-desc";

function loadPortfolioCompanies() {
  fetch("portfolio_companies.json", { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load portfolio data");
      return res.json();
    })
    .then((companies) => {
      ALL_COMPANIES = companies.slice();
      updateStats(ALL_COMPANIES);
      buildDynamicFilters(ALL_COMPANIES);
      updateDisplay();
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

function buildDynamicFilters(companies) {
  const categoryContainer = document.getElementById("categoryFilters");
  const tagContainer = document.getElementById("tagFilters");
  if (!categoryContainer || !tagContainer) return;

  const categories = Array.from(
    new Set(companies.map((c) => (c.category || "").trim()).filter(Boolean))
  ).sort();
  const tags = Array.from(
    new Set(
      companies.flatMap((c) =>
        (c.tags || []).map((t) => t.trim()).filter(Boolean)
      )
    )
  ).sort();

  categoryContainer.innerHTML = [
    `<button class="filter-btn active" data-category="all">ALL</button>`,
    ...categories.map(
      (cat) =>
        `<button class="filter-btn" data-category="${escapeHtml(
          cat.toLowerCase()
        )}">${escapeHtml(prettifyCategory(cat))}</button>`
    ),
  ].join("");

  tagContainer.innerHTML = [
    `<button class="filter-btn" data-tag="__clear">CLEAR TAG</button>`,
    ...tags.map(
      (tag) =>
        `<button class="filter-btn" data-tag="${escapeHtml(tag)}">${escapeHtml(
          tag
        )}</button>`
    ),
  ].join("");

  // Event listeners
  categoryContainer.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryContainer
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      updateDisplay();
    });
  });

  tagContainer.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.getAttribute("data-tag");
      if (tag === "__clear") {
        activeTag = null;
        tagContainer
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      } else {
        // toggle behavior
        const isActive = btn.classList.contains("active");
        tagContainer
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        if (isActive) {
          activeTag = null;
          tagContainer
            .querySelector('[data-tag="__clear"]')
            ?.classList.add("active");
        } else {
          activeTag = tag;
          btn.classList.add("active");
        }
      }
      updateDisplay();
    });
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value;
      updateDisplay();
    });
  }
}

function prettifyCategory(cat) {
  const map = {
    ai: "Artificial Intelligence",
    fintech: "Fintech",
    enterprise: "Enterprise Software",
    healthcare: "Healthcare Tech",
    security: "Cybersecurity",
  };
  return map[cat.toLowerCase()] || cat;
}

function applyFiltersAndSort() {
  let filtered = ALL_COMPANIES.slice();
  if (activeCategory && activeCategory !== "all") {
    filtered = filtered.filter(
      (c) => (c.category || "").toLowerCase() === activeCategory.toLowerCase()
    );
  }
  if (activeTag) {
    filtered = filtered.filter((c) => (c.tags || []).includes(activeTag));
  }

  switch (currentSort) {
    case "year-asc":
      filtered.sort((a, b) => (a.year || 0) - (b.year || 0));
      break;
    case "year-desc":
      filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "status-active":
      filtered.sort((a, b) => {
        const av = a.status?.toLowerCase() === "active" ? 0 : 1;
        const bv = b.status?.toLowerCase() === "active" ? 0 : 1;
        return av - bv || a.name.localeCompare(b.name);
      });
      break;
    case "status-exited":
      filtered.sort((a, b) => {
        const av = a.status?.toLowerCase() === "exited" ? 0 : 1;
        const bv = b.status?.toLowerCase() === "exited" ? 0 : 1;
        return av - bv || a.name.localeCompare(b.name);
      });
      break;
  }
  return filtered;
}

function updateDisplay() {
  const companies = applyFiltersAndSort();
  renderCompanies(companies);
  initializeBasicInteractions();
  renderActiveFiltersSummary();
}

function renderActiveFiltersSummary() {
  const container = document.getElementById("activeFilters");
  if (!container) return;
  const parts = [];
  if (activeCategory && activeCategory !== "all") {
    parts.push(
      `<span class="active-filter-chip">Sector: ${escapeHtml(
        prettifyCategory(activeCategory)
      )}</span>`
    );
  }
  if (activeTag) {
    parts.push(
      `<span class="active-filter-chip">Tag: ${escapeHtml(activeTag)}</span>`
    );
  }
  if (!parts.length) {
    container.innerHTML = "";
  } else {
    container.innerHTML = parts.join("");
  }
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
// initializePortfolioFilter retained for backward compatibility (no-op now)
function initializePortfolioFilter() {}

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
