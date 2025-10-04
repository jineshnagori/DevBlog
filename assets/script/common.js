/**
 * DevBlog Common JavaScript Module
 * Centralized common functionality to follow DRY principles
 */

// Main DevBlog namespace
const DevBlog = {
  // Configuration
  config: {
    templates: {
      navbar: "templates/navbar.html",
      footer: "templates/footer.html",
      head: "templates/head.html",
      scripts: "templates/scripts.html",
    },
  },

  // Initialize the application
  init: function (pageName) {
    this.setActivePage(pageName);
    this.initTheme();
    this.initCopyrightYear();
    this.initScrollNavbar();
    this.initMouseFollower();
  },

  // Load templates
  loadTemplate: async function (templatePath, targetSelector) {
    try {
      const response = await fetch(templatePath);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const html = await response.text();
      document.querySelector(targetSelector).innerHTML = html;
    } catch (error) {
      console.error(`Error loading template ${templatePath}:`, error);
    }
  },

  // Load all common templates
  loadCommonTemplates: async function () {
    const promises = [
      this.loadTemplate(this.config.templates.navbar, "#navbar-container"),
      this.loadTemplate(this.config.templates.footer, "#footer-container"),
    ];

    await Promise.all(promises);

    // Re-initialize functionality after templates are loaded
    this.initTheme();
    this.initCopyrightYear();
    this.initScrollNavbar();
  },

  // Set active page in navigation
  setActivePage: function (pageName) {
    document.addEventListener("DOMContentLoaded", () => {
      const navItems = document.querySelectorAll(".nav-item[data-page]");
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("data-page") === pageName) {
          item.classList.add("active");
        }
      });
    });
  },

  // Theme functionality
  initTheme: function () {
    this.themeSheet = document.querySelector("#theme-sheet");
    this.isDarkModeEnabled = localStorage.getItem("isDarkmodeEnabled");
    this.applyTheme();
  },

  applyTheme: function () {
    if (this.isDarkModeEnabled === "true") {
      this.themeSheet.href = "assets/css/darktheme.css";
    } else {
      this.themeSheet.href = "assets/css/style-modular.css";
    }
  },

  toggleTheme: function () {
    if (
      this.themeSheet.getAttribute("href") == "assets/css/style-modular.css"
    ) {
      this.themeSheet.href = "assets/css/darktheme.css";
      localStorage.setItem("isDarkmodeEnabled", true);
    } else {
      this.themeSheet.href = "assets/css/style-modular.css";
      localStorage.setItem("isDarkmodeEnabled", false);
    }
  },

  // Copyright year
  initCopyrightYear: function () {
    document.addEventListener("DOMContentLoaded", () => {
      const yearSpan = document.getElementById("copyright-year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
  },

  // Navbar scroll effect
  initScrollNavbar: function () {
    window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".navbar-frosted");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    });
  },

  // Mouse follower effect
  initMouseFollower: function () {
    document.addEventListener("DOMContentLoaded", () => {
      let follower = document.getElementById("circle");
      if (follower) {
        window.addEventListener("mousemove", function (details) {
          let y = details.clientY;
          let x = details.clientX;
          setTimeout(function () {
            follower.style.top = `${y}px`;
            follower.style.left = `${x}px`;
          }, 50);
        });
      }
    });
  },

  // Login/Signup form functionality
  initLoginForm: function () {
    document.addEventListener("DOMContentLoaded", () => {
      const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");

      if (signupBtn && loginForm && loginText) {
        signupBtn.onclick = () => {
          loginForm.style.marginLeft = "-50%";
          loginText.style.marginLeft = "-50%";
        };
      }

      if (loginBtn && loginForm && loginText) {
        loginBtn.onclick = () => {
          loginForm.style.marginLeft = "0%";
          loginText.style.marginLeft = "0%";
        };
      }

      if (signupLink && signupBtn) {
        signupLink.onclick = () => {
          signupBtn.click();
          return false;
        };
      }
    });
  },

  // Pagination functionality
  initPagination: function () {
    document.addEventListener("DOMContentLoaded", () => {
      const items = Array.from(document.querySelectorAll(".article-item"));
      if (!items || items.length === 0) return;

      const urlParams = new URLSearchParams(window.location.search);
      let currentPage = parseInt(urlParams.get("page") || "1", 10);
      if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

      const itemsPerPage = 8;
      const totalPages = Math.ceil(items.length / itemsPerPage);

      // Ensure current page is within bounds
      if (currentPage > totalPages) currentPage = totalPages;

      this.showPage(items, currentPage, itemsPerPage);
      this.createPaginationControls(
        currentPage,
        totalPages,
        items,
        itemsPerPage
      );
    });
  },

  showPage: function (items, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  },

  createPaginationControls: function (
    currentPage,
    totalPages,
    items,
    itemsPerPage
  ) {
    let paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.id = "pagination-container";
      paginationContainer.className = "text-center mt-4";

      const articlesContainer = document.getElementById("articles-row");
      if (articlesContainer && articlesContainer.parentNode) {
        articlesContainer.parentNode.appendChild(paginationContainer);
      }
    }

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let paginationHTML =
      '<nav aria-label="Page navigation"><ul class="pagination justify-content-center">';

    // Previous button
    if (currentPage > 1) {
      paginationHTML += `<li class="page-item">
                <a class="page-link" href="?page=${
                  currentPage - 1
                }" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;
    }

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const activeClass = i === currentPage ? "active" : "";
      paginationHTML += `<li class="page-item ${activeClass}">
                <a class="page-link" href="?page=${i}">${i}</a>
            </li>`;
    }

    // Next button
    if (currentPage < totalPages) {
      paginationHTML += `<li class="page-item">
                <a class="page-link" href="?page=${
                  currentPage + 1
                }" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
    }

    paginationHTML += "</ul></nav>";
    paginationContainer.innerHTML = paginationHTML;
  },

  // Utility functions
  utils: {
    // Debounce function for performance optimization
    debounce: function (func, wait, immediate) {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    // Smooth scroll to element
    scrollToElement: function (selector, offset = 0) {
      const element = document.querySelector(selector);
      if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    },
  },
};

// Auto-initialize common functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize based on page
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";
  DevBlog.init(currentPage);
});

// Make DevBlog available globally
window.DevBlog = DevBlog;

// Backward compatibility - make theme function globally available
window.theme = function () {
  if (typeof DevBlog !== "undefined" && DevBlog.toggleTheme) {
    DevBlog.toggleTheme();
  }
};
