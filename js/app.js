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

// Pööramise loogika (hiir + klaviatuur)
function setupInteractions() {
  const grid = document.getElementById('cardsGrid');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;
    toggleFlip(btn);
  });

  grid.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.card');
    if (!btn) return;
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault();
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
  const isFlipped = btn.classList.toggle('is-flipped');
  btn.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
}

// Käivitamine
renderCards();
setupInteractions();
