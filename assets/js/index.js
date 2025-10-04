// dynamically setting year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('copyright-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
  // initialize pagination after DOM content loaded
  initPagination();
});

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});

let follower = document.getElementById("circle");

window.addEventListener("mousemove", function (details) {
  let y = details.clientY;
  let x = details.clientX;
  setTimeout(function () {
    follower.style.top = `${y}px`;
    follower.style.left = `${x}px`;
  }, 50);
});


// ---------------- Pagination ----------------
function initPagination() {
  const items = Array.from(document.querySelectorAll('.article-item'));
  if (!items || items.length === 0) return;


  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('page') || '1', 10);
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

  function getPerPage(page) {
    return page === 1 ? 4 : 8; // 4 on first page, 8 on other pages
  }

  // compute total pages considering the first page has 4 items and the rest have 8
  function computeTotalPages(totalItems) {
    if (totalItems <= 4) return 1;
    const remaining = totalItems - 4;
    return 1 + Math.ceil(remaining / 8);
  }

  const totalPages = computeTotalPages(items.length);

  function renderPage(page) {
    const perPage = getPerPage(page);
    let startIndex = 0;

    if (page === 1) startIndex = 0;
    else startIndex = 4 + (page - 2) * 8; // first 4 are on page 1, rest spread by 8

    const endIndex = startIndex + perPage;

    items.forEach((el, idx) => {
      if (idx >= startIndex && idx < endIndex) el.style.display = '';
      else el.style.display = 'none';
    });

    // hide hero if not first page
    const hero = document.querySelector('.hero-section');
    if (hero) hero.style.display = page === 1 ? '' : 'none';
  }

  function renderPaginationControls(page) {
    const container = document.getElementById('pagination');
    if (!container) return;
    // hide pagination if only one page
    if (totalPages <= 1) {
      container.style.display = 'none';
      return;
    } else {
      container.style.display = '';
    }
    container.innerHTML = '';

    function createPageItem(label, targetPage, disabled = false, active = false) {
      const li = document.createElement('li');
      li.className = 'page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '');
      const a = document.createElement('a');
      a.className = 'page-link';
      a.href = '#';
      a.textContent = label;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        if (disabled || targetPage === page) return;
        goToPage(targetPage);
      });
      li.appendChild(a);
      return li;
    }

    // Prev
    container.appendChild(createPageItem('«', Math.max(1, page - 1), page === 1));

    // Smart window for page numbers
    const maxWindow = 5;
    let startPage = Math.max(1, page - Math.floor(maxWindow / 2));
    let endPage = Math.min(totalPages, startPage + maxWindow - 1);
    if (endPage - startPage + 1 < maxWindow) {
      startPage = Math.max(1, endPage - maxWindow + 1);
    }

    if (startPage > 1) {
      container.appendChild(createPageItem(1, 1, false, 1 === page));
      if (startPage > 2) {
        const dots = document.createElement('li');
        dots.className = 'page-item disabled';
        const span = document.createElement('span');
        span.className = 'page-link';
        span.textContent = '...';
        dots.appendChild(span);
        container.appendChild(dots);
      }
    }

    for (let p = startPage; p <= endPage; p++) {
      container.appendChild(createPageItem(p, p, false, p === page));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement('li');
        dots.className = 'page-item disabled';
        const span = document.createElement('span');
        span.className = 'page-link';
        span.textContent = '...';
        dots.appendChild(span);
        container.appendChild(dots);
      }
      container.appendChild(createPageItem(totalPages, totalPages, false, totalPages === page));
    }

    // Next
    container.appendChild(createPageItem('»', Math.min(totalPages, page + 1), page === totalPages));
  }

  function goToPage(page) {
    currentPage = page;
    renderPage(page);
    renderPaginationControls(page);

    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newUrl);

    const articlesRow = document.getElementById('articles-row');
    if (articlesRow) articlesRow.scrollIntoView({ behavior: 'smooth' });
  }

  // initial render
  renderPage(currentPage);
  renderPaginationControls(currentPage);
}

// When coming back via browser history (bfcache), pageshow fires without DOMContentLoaded.
// Re-run pagination to ensure the correct page and layout are applied.
window.addEventListener('pageshow', (event) => {
  try {
    // initPagination is idempotent enough to be called again; it will recalc and render.
    initPagination();
  } catch (err) {
    // ignore — safe fallback
    console.warn('Pagination reinit failed on pageshow:', err);
  }
});



