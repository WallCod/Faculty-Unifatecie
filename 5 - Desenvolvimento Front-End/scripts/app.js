/**
 * app.js - Orquestrador de Interface e Manipulação do DOM
 * Implementa reatividade baseada em estado, busca com debounce,
 * filtros por categoria, ordenação dinâmica, modal acessível e favoritos.
 */

import { fetchBooksCatalog } from './api.js';

// Estado Global da Aplicação
const appState = {
  allBooks: [],
  filteredBooks: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  favorites: new Set(JSON.parse(localStorage.getItem('alexandria_favs') || '[]')),
  isLoading: true
};

// Formatação Monetária BRL
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

// Elementos do DOM
const DOM = {
  catalogGrid: document.getElementById('catalogGrid'),
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  categoryNav: document.getElementById('categoryNav'),
  resultsCount: document.getElementById('resultsCount'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  detailsModal: document.getElementById('detailsModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalCover: document.getElementById('modalCover'),
  modalCategory: document.getElementById('modalCategory'),
  modalRating: document.getElementById('modalRating'),
  modalTitle: document.getElementById('modalTitle'),
  modalAuthor: document.getElementById('modalAuthor'),
  modalPublisher: document.getElementById('modalPublisher'),
  modalYear: document.getElementById('modalYear'),
  modalPages: document.getElementById('modalPages'),
  modalIsbn: document.getElementById('modalIsbn'),
  modalSynopsis: document.getElementById('modalSynopsis'),
  modalPrice: document.getElementById('modalPrice'),
  modalBuyBtn: document.getElementById('modalBuyBtn'),
  toastContainer: document.getElementById('toastContainer'),
  totalBooksStat: document.getElementById('totalBooksStat')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  loadCatalog();
});

/**
 * Carrega catálogo a partir da API assíncrona
 */
async function loadCatalog() {
  renderSkeletons(8);
  try {
    const books = await fetchBooksCatalog();
    appState.allBooks = books;
    appState.isLoading = false;

    // Atualiza estatísticas do Hero
    if (DOM.totalBooksStat) {
      DOM.totalBooksStat.textContent = books.length;
    }

    renderCategoryChips();
    applyFiltersAndSort();
  } catch (error) {
    appState.isLoading = false;
    renderErrorState(error.message);
  }
}

/**
 * Renderiza esqueletos de carregamento para feedback visual imediato
 */
function renderSkeletons(count = 6) {
  let skeletonsHtml = '';
  for (let i = 0; i < count; i++) {
    skeletonsHtml += `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton-cover"></div>
        <div style="padding: 1rem;">
          <div class="skeleton-text" style="width: 40%;"></div>
          <div class="skeleton-text" style="width: 85%; height: 18px;"></div>
          <div class="skeleton-text" style="width: 60%;"></div>
          <div class="skeleton-text" style="width: 50%; margin-top: 1.5rem;"></div>
        </div>
      </div>
    `;
  }
  DOM.catalogGrid.innerHTML = skeletonsHtml;
  DOM.resultsCount.textContent = 'Carregando catálogo da API...';
}

/**
 * Aplica busca textual, filtro de categoria e critério de ordenação
 */
function applyFiltersAndSort() {
  let result = [...appState.allBooks];

  // 1. Filtro por Categoria
  if (appState.selectedCategory !== 'all') {
    result = result.filter(book => book.category === appState.selectedCategory);
  }

  // 2. Filtro por Busca Textual (Título ou Autor)
  if (appState.searchQuery.trim() !== '') {
    const query = appState.searchQuery.toLowerCase().trim();
    result = result.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query)
    );
  }

  // 3. Ordenação
  switch (appState.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'year-desc':
      result.sort((a, b) => b.year - a.year);
      break;
    case 'title-asc':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
    default:
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  appState.filteredBooks = result;
  renderCatalog();
}

/**
 * Renderiza os cartões de livros no DOM
 */
function renderCatalog() {
  const books = appState.filteredBooks;
  DOM.resultsCount.textContent = `Exibindo ${books.length} de ${appState.allBooks.length} títulos`;

  if (books.length === 0) {
    DOM.catalogGrid.innerHTML = `
      <div class="empty-state" role="status">
        <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="empty-title">Nenhum livro encontrado</h3>
        <p class="empty-text">Não encontramos resultados para os filtros selecionados. Tente ajustar os termos de busca ou categoria.</p>
        <button id="resetFiltersBtn" class="empty-reset-btn" type="button">Limpar todos os filtros</button>
      </div>
    `;

    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
    return;
  }

  DOM.catalogGrid.innerHTML = books.map(book => {
    const isFav = appState.favorites.has(book.id);
    return `
      <article class="book-card" data-book-id="${book.id}">
        <div class="book-cover-container">
          <img src="${book.cover}" alt="Capa do livro ${book.title}" class="book-cover-img" loading="lazy" />
          ${book.featured ? '<span class="book-featured-tag">Destaque</span>' : ''}
          <button 
            type="button" 
            class="book-favorite-btn ${isFav ? 'favorited' : ''}" 
            aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
            title="${isFav ? 'Favoritado' : 'Favoritar'}"
            data-action="toggle-favorite"
            data-id="${book.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div class="book-content">
          <div class="book-meta">
            <span class="book-category">${book.category}</span>
            <span class="book-rating" title="Avaliação: ${book.rating} de 5">
              ★ ${book.rating.toFixed(1)}
            </span>
          </div>

          <h3 class="book-title" title="${book.title}">${book.title}</h3>
          <p class="book-author">por ${book.author}</p>

          <div class="book-footer">
            <span class="book-price">${currencyFormatter.format(book.price)}</span>
            <button 
              type="button" 
              class="book-details-btn" 
              data-action="view-details" 
              data-id="${book.id}"
              aria-haspopup="dialog">
              Ver Detalhes
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Renderiza dinamicamente as pílulas (chips) de categorias disponíveis
 */
function renderCategoryChips() {
  const categories = ['all', ...new Set(appState.allBooks.map(b => b.category))];
  
  DOM.categoryNav.innerHTML = categories.map(cat => {
    const label = cat === 'all' ? 'Todos os Títulos' : cat;
    const isActive = appState.selectedCategory === cat;
    return `
      <button 
        type="button" 
        class="category-chip ${isActive ? 'active' : ''}" 
        data-category="${cat}"
        aria-pressed="${isActive}">
        ${label}
      </button>
    `;
  }).join('');
}

/**
 * Renderiza tela de erro caso a chamada API falhe
 */
function renderErrorState(errorMessage) {
  DOM.catalogGrid.innerHTML = `
    <div class="empty-state" role="alert" style="border-color: #ef4444;">
      <h3 class="empty-title" style="color: #ef4444;">Falha ao carregar catálogo</h3>
      <p class="empty-text">Não foi possível obter os dados da API: ${errorMessage}</p>
      <button id="retryApiBtn" class="empty-reset-btn" type="button">Tentar novamente</button>
    </div>
  `;
  document.getElementById('retryApiBtn')?.addEventListener('click', loadCatalog);
}

/**
 * Abre o Modal Nativo (<dialog>) exibindo a ficha completa do livro
 */
function openBookDetails(bookId) {
  const book = appState.allBooks.find(b => b.id === Number(bookId));
  if (!book) return;

  DOM.modalCover.src = book.cover;
  DOM.modalCover.alt = `Capa ampliada de ${book.title}`;
  DOM.modalCategory.textContent = book.category;
  DOM.modalRating.textContent = `★ ${book.rating.toFixed(1)} / 5.0`;
  DOM.modalTitle.textContent = book.title;
  DOM.modalAuthor.textContent = `Por ${book.author}`;
  DOM.modalPublisher.textContent = book.publisher;
  DOM.modalYear.textContent = book.year;
  DOM.modalPages.textContent = `${book.pages} páginas`;
  DOM.modalIsbn.textContent = book.isbn;
  DOM.modalSynopsis.textContent = book.synopsis;
  DOM.modalPrice.textContent = currencyFormatter.format(book.price);

  DOM.modalBuyBtn.onclick = () => {
    showToast(`Adicionado ao carrinho de compras: ${book.title}`);
    DOM.detailsModal.close();
  };

  if (typeof DOM.detailsModal.showModal === 'function') {
    DOM.detailsModal.showModal();
  } else {
    DOM.detailsModal.setAttribute('open', '');
  }
}

/**
 * Alterna estado de favorito e persiste no LocalStorage
 */
function toggleFavorite(bookId) {
  const id = Number(bookId);
  const book = appState.allBooks.find(b => b.id === id);

  if (appState.favorites.has(id)) {
    appState.favorites.delete(id);
    showToast(`Removido dos favoritos: ${book?.title || ''}`);
  } else {
    appState.favorites.add(id);
    showToast(`Adicionado aos favoritos: ${book?.title || ''}`);
  }

  localStorage.setItem('alexandria_favs', JSON.stringify([...appState.favorites]));
  renderCatalog();
}

/**
 * Limpa todos os filtros ativos
 */
function resetFilters() {
  appState.selectedCategory = 'all';
  appState.searchQuery = '';
  appState.sortBy = 'featured';

  DOM.searchInput.value = '';
  DOM.sortSelect.value = 'featured';

  renderCategoryChips();
  applyFiltersAndSort();
  showToast('Filtros redefinidos');
}

/**
 * Exibe notificação temporária tipo Toast
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/**
 * Debounce utility para otimizar disparos de eventos de digitação
 */
function debounce(fn, delayMs = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

/**
 * Configuração de Event Listeners com Delegação de Eventos
 */
function setupEventListeners() {
  // 1. Busca textual com Debounce (300ms)
  const debouncedSearch = debounce((e) => {
    appState.searchQuery = e.target.value;
    applyFiltersAndSort();
  }, 250);
  DOM.searchInput.addEventListener('input', debouncedSearch);

  // 2. Ordenação
  DOM.sortSelect.addEventListener('change', (e) => {
    appState.sortBy = e.target.value;
    applyFiltersAndSort();
  });

  // 3. Delegação de Eventos na Barra de Categorias
  DOM.categoryNav.addEventListener('click', (e) => {
    const chip = e.target.closest('.category-chip');
    if (!chip) return;

    appState.selectedCategory = chip.dataset.category;
    document.querySelectorAll('.category-chip').forEach(c => {
      c.classList.toggle('active', c === chip);
      c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
    });

    applyFiltersAndSort();
  });

  // 4. Delegação de Eventos no Catálogo de Livros (Detalhes e Favoritos)
  DOM.catalogGrid.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('[data-action="view-details"]');
    if (detailBtn) {
      openBookDetails(detailBtn.dataset.id);
      return;
    }

    const favBtn = e.target.closest('[data-action="toggle-favorite"]');
    if (favBtn) {
      toggleFavorite(favBtn.dataset.id);
      return;
    }
  });

  // 5. Fechamento do Modal
  DOM.modalCloseBtn.addEventListener('click', () => {
    DOM.detailsModal.close();
  });

  DOM.detailsModal.addEventListener('click', (e) => {
    // Fecha ao clicar no backdrop (fora do container interno)
    const rect = DOM.detailsModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      DOM.detailsModal.close();
    }
  });

  // 6. Tema Dark / Light
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);
}

/**
 * Gerenciamento de Tema (Dark / Light)
 */
function initTheme() {
  const savedTheme = localStorage.getItem('alexandria_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('alexandria_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  if (theme === 'light') {
    DOM.themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    `;
  } else {
    DOM.themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    `;
  }
}
