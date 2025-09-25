// Kaartide seaded (6 tk). Muuda kaante pilte ja tekste vastavalt.
const CARDS = [
  { id: 1, cover: '../assets/img/poiss.png', title: 'Laps', descr: 'Küsimuse mall' },
  { id: 2, cover: '../assets/img/siil.png', title: 'Siil', descr: 'Küsimuse mall' },
  { id: 3, cover: '../assets/img/leht.png', title: 'Sügis', descr: 'Küsimuse mall' },
  { id: 4, cover: '../assets/img/orav.png', title: 'Orav', descr: 'Küsimuse mall' },
  { id: 5, cover: '../assets/img/kuud.png', title: 'Kuud', descr: 'Küsimuse mall' },
  { id: 6, cover: '../assets/img/vanemad.png', title: 'Kaart 6', descr: 'Küsimuse mall' },
];

// Kaartide renderdamine
function renderCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = CARDS.map(card => `
  <button
    class="card"
    type="button"
    aria-label="${card.title}: pööra"
    aria-expanded="false"
    data-card-id="${card.id}"
  >
    <span class="card__inner">
    <span class="card__face" aria-hidden="true" style="--cover: url('${card.cover}')"></span>
    <span class="card__back" role="group" aria-label="${card.title}">
      <span>
      <div class="card__title">${card.title}</div>
      <div class="card__descr">${card.descr}</div>
      </span>
    </span>
    </span>
  </button>
  `).join('');
}
// Helper to insert placeholder in grid
function insertPlaceholder(cardBtn) {
  // Remove any existing placeholder
  const grid = document.getElementById('cardsGrid');
  const old = grid.querySelector('.card-placeholder');
  if (old) old.remove();
  // Insert placeholder at the same index as the card
  const cards = Array.from(grid.children);
  const idx = cards.indexOf(cardBtn);
  if (idx !== -1) {
    const placeholder = document.createElement('div');
    placeholder.className = 'card-placeholder';
    grid.insertBefore(placeholder, cards[idx]);
  }
}

// Pööramise loogika (hiir + klaviatuur)
function setupInteractions() {
  const grid = document.getElementById('cardsGrid');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;
    // Remove flip from any other card
    document.querySelectorAll('.card.is-flipped').forEach(el => {
      if (el !== btn) {
        el.classList.remove('is-flipped');
        el.setAttribute('aria-expanded', 'false');
      }
    });
    toggleFlip(btn);
  });

  grid.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      // Remove flip from any other card
      document.querySelectorAll('.card.is-flipped').forEach(el => {
        if (el !== btn) {
          el.classList.remove('is-flipped');
          el.setAttribute('aria-expanded', 'false');
        }
      });
      toggleFlip(btn);
    }
  });

  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.card.is-flipped').forEach(el => {
        el.classList.remove('is-flipped');
        el.setAttribute('aria-expanded', 'false');
      });
    });
  }
}



function toggleFlip(btn) {
  // If already open, close and reset
  if (btn.classList.contains('flipping')) {
    btn.classList.remove('flipping', 'expand');
    btn.setAttribute('aria-expanded', 'false');
    // Remove placeholder
    insertPlaceholder(null);
    return;
  }

  // Remove flip from any other card
  document.querySelectorAll('.card.flipping').forEach(el => {
    el.classList.remove('flipping', 'expand');
    el.setAttribute('aria-expanded', 'false');
  });
  insertPlaceholder(null);

  btn.classList.add('flipping');
  btn.setAttribute('aria-expanded', 'true');

  // Phase 1: rotate to 90deg in place
  setTimeout(() => {
    // Phase 2: expand and finish flip
    if (btn.classList.contains('flipping')) {
      btn.classList.add('expand');
      insertPlaceholder(btn);
    }
  }, 150); // faster: match the new CSS transition duration for 90deg
}

// Käivitamine
renderCards();
setupInteractions();
