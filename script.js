document.addEventListener('DOMContentLoaded', function () {
  fetch("manhwa_cards.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("manhwa-card-container").innerHTML = data;

      document.querySelectorAll('.manhwa-row').forEach(row => {
  row.style.setProperty('display', 'flex', 'important');
  row.style.setProperty('flex-wrap', 'wrap');
  row.style.setProperty('gap', '20px');
  row.style.setProperty('justify-content', 'center');
});


      // Initialize features after content is loaded
      initPopups();
      initFilterBar();
      filterManhwaCards('all');
      const allButton = document.querySelector('.filter-bar button[data-filter="all"]');
      if (allButton) allButton.classList.add('active');
    })
    .catch((error) => {
      console.error("Error loading manhwa cards:", error);
    });
});

// --- Popup Menu Handling ---
function initPopups() {
  const plusButtons = document.querySelectorAll('.icon-button.plus');
  plusButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      const icon = this.querySelector('i');
      const card = this.closest('.card-buttons');
      const popup = card.querySelector('.popup-menu');
      if (!popup) return;
      const isOpen = !popup.classList.contains('hidden');
      closeAllPopups();
      if (!isOpen) {
        popup.classList.remove('hidden');
        icon.classList.replace('bi-plus-circle', 'bi-plus-circle-fill');
      }
    });
  });

  document.querySelectorAll('.popup-menu').forEach(popup => {
    popup.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  document.addEventListener('click', function () {
    closeAllPopups();
  });

  function closeAllPopups() {
    document.querySelectorAll('.popup-menu').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.icon-button.plus i').forEach(icon => {
      icon.classList.replace('bi-plus-circle-fill', 'bi-plus-circle');
    });
  }
}

// --- Filter Handling ---
function initFilterBar() {
  const filterButtons = document.querySelectorAll('.filter-bar button');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter').toLowerCase();
      filterManhwaCards(filter);
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// --- Filter Logic ---
function filterManhwaCards(filter) {
  document.querySelectorAll('.manhwa-card').forEach(card => {
    const tags = (card.getAttribute('data-tags') || "").toLowerCase().split(/\s+/);
    card.style.display = (filter === "all" || tags.includes(filter)) ? "" : "none";
  });

  document.querySelectorAll('.manhwa-row').forEach(row => {
    const someVisible = [...row.querySelectorAll('.manhwa-card')]
      .some(card => card.style.display !== "none");
    row.style.display = someVisible ? "" : "none";
  });

  
}
