/**
 * app.js - Orquestrador de Interface, API e Manipulação do DOM
 * Compatível 100% com carregamento direto (file://), servidores locais (http://)
 * e servidores em nuvem (https://).
 */

// Catálogo Fallback Integrado: garante funcionamento imediato sob protocolo file:// e offline
const FALLBACK_BOOKS_CATALOG = [
  {
    "id": 1,
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "author": "Robert C. Martin",
    "category": "Engenharia de Software",
    "price": 89.90,
    "rating": 4.8,
    "year": 2008,
    "pages": 464,
    "publisher": "Prentice Hall",
    "isbn": "978-0132350884",
    "cover": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode levar uma organização de desenvolvimento a perder produtividade. Robert C. Martin apresenta princípios essenciais para escrever códigos legíveis, manuteníveis e elegantes através de exemplos práticos.",
    "featured": true
  },
  {
    "id": 2,
    "title": "Designing Data-Intensive Applications",
    "author": "Martin Kleppmann",
    "category": "Sistemas Distribuídos",
    "price": 145.50,
    "rating": 4.9,
    "year": 2017,
    "pages": 616,
    "publisher": "O'Reilly Media",
    "isbn": "978-1449373320",
    "cover": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Os dados estão no centro dos maiores desafios no design de software moderno. Este guia definitivo investiga profundamente os princípios arquiteturais fundamentais por trás de bancos de dados relacionais e NoSQL, mensageria e processamento de fluxos.",
    "featured": true
  },
  {
    "id": 3,
    "title": "Estruturas de Dados e Algoritmos com JavaScript",
    "author": "Loiane Groner",
    "category": "Ciência da Computação",
    "price": 74.00,
    "rating": 4.7,
    "year": 2019,
    "pages": 408,
    "publisher": "Novatec",
    "isbn": "978-8575226933",
    "cover": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Aprenda a implementar estruturas de dados clássicas como pilhas, filas, listas encadeadas, árvores e grafos usando JavaScript moderno (ES6+), além de algoritmos fundamentais de ordenação e busca essenciais para entrevistas técnicas.",
    "featured": false
  },
  {
    "id": 4,
    "title": "Refactoring: Improving the Design of Existing Code",
    "author": "Martin Fowler",
    "category": "Engenharia de Software",
    "price": 120.00,
    "rating": 4.8,
    "year": 2018,
    "pages": 448,
    "publisher": "Addison-Wesley",
    "isbn": "978-0134757599",
    "cover": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Completamente atualizado para JavaScript, o clássico de Martin Fowler detalha o catálogo de refatorações, explicando quando aplicar cada transformação de código para torná-lo mais modular e compreensível sem alterar seu comportamento externo.",
    "featured": true
  },
  {
    "id": 5,
    "title": "Arquitetura Limpa: O Guia do Artesão para Estrutura de Software",
    "author": "Robert C. Martin",
    "category": "Arquitetura",
    "price": 95.00,
    "rating": 4.6,
    "year": 2019,
    "pages": 432,
    "publisher": "Alta Books",
    "isbn": "978-8550804606",
    "cover": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Aplicando regras universais de arquitetura de software, Robert Martin demonstra como alcançar uma separação de interesses robusta, tornando a lógica de negócios independente de frameworks, bancos de dados, interfaces e bibliotecas externas.",
    "featured": false
  },
  {
    "id": 6,
    "title": "O Programador Pragmático: De Aprendiz a Mestre",
    "author": "David Thomas, Andrew Hunt",
    "category": "Engenharia de Software",
    "price": 112.90,
    "rating": 4.9,
    "year": 2020,
    "pages": 352,
    "publisher": "Bookman",
    "isbn": "978-8582605331",
    "cover": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Ilustra as melhores práticas e as principais armadilhas do desenvolvimento de software. Da responsabilidade pessoal e desenvolvimento de carreira a técnicas de arquitetura para manter o código flexível e fácil de reutilizar.",
    "featured": true
  },
  {
    "id": 7,
    "title": "Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability",
    "author": "Steve Krug",
    "category": "Design & UX",
    "price": 68.50,
    "rating": 4.7,
    "year": 2014,
    "pages": 216,
    "publisher": "New Riders",
    "isbn": "978-0321965516",
    "cover": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    "synopsis": "O manual definitivo sobre usabilidade na web e design de interfaces. Compreenda os princípios cognitivos da navegação humana, redução da carga mental e construção de fluxos intuitivos para usuários de desktop e mobile.",
    "featured": false
  },
  {
    "id": 8,
    "title": "Redes de Computadores",
    "author": "Andrew S. Tanenbaum, David J. Wetherall",
    "category": "Redes e Infraestrutura",
    "price": 169.00,
    "rating": 4.8,
    "year": 2013,
    "pages": 600,
    "publisher": "Pearson",
    "isbn": "978-8576059240",
    "cover": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "synopsis": "A bíblia das redes de computadores, cobrindo o modelo de camadas OSI e TCP/IP, protocolos HTTP, DNS, roteamento IP, segurança com TLS e transmissão física de dados de forma rigorosa e didática.",
    "featured": false
  },
  {
    "id": 9,
    "title": "You Don't Know JS Yet: Get Started",
    "author": "Kyle Simpson",
    "category": "Linguagens e Web",
    "price": 55.00,
    "rating": 4.6,
    "year": 2020,
    "pages": 142,
    "publisher": "Independently published",
    "isbn": "979-8602477429",
    "cover": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Mergulhe nas entranhas do JavaScript: escopo léxico, closures, prototypes, coerção de tipos e mecanismos de execução assíncrona do runtime V8. Essencial para quem quer dominar o motor da linguagem web.",
    "featured": false
  },
  {
    "id": 10,
    "title": "Sistemas Operacionais Modernos",
    "author": "Andrew S. Tanenbaum, Herbert Bos",
    "category": "Ciência da Computação",
    "price": 178.00,
    "rating": 4.9,
    "year": 2016,
    "pages": 864,
    "publisher": "Pearson",
    "isbn": "978-8543005676",
    "cover": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    "synopsis": "Referência obrigatória em Engenharia da Computação sobre o funcionamento interno dos sistemas operacionais: gerenciamento de processos, threads, escalonamento, memória virtual, sistemas de arquivos e segurança de baixo nível.",
    "featured": false
  },
  {
    "id": 11,
    "title": "Padrões de Projetos: Soluções Reutilizáveis de Software Orientado a Objetos",
    "author": "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (GoF)",
    "category": "Arquitetura",
    "price": 139.90,
    "rating": 4.7,
    "year": 2000,
    "pages": 384,
    "publisher": "Bookman",
    "isbn": "978-8573076103",
    "cover": "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    "synopsis": "A obra-prima dos Design Patterns (Gang of Four). Catálogo clássico com 23 padrões criacionais, estruturais e comportamentais fundamentais para a criação de sistemas modulares, testáveis e extensíveis.",
    "featured": true
  },
  {
    "id": 12,
    "title": "Inteligência Artificial: Uma Abordagem Moderna",
    "author": "Stuart Russell, Peter Norvig",
    "category": "Ciência da Computação",
    "price": 210.00,
    "rating": 4.9,
    "year": 2022,
    "pages": 1040,
    "publisher": "GEN LTC",
    "isbn": "978-8595158658",
    "cover": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    "synopsis": "O texto de referência global para estudantes e pesquisadores de IA. Cobre agentes inteligentes, aprendizado de máquina, redes neurais profundas, representação de conhecimento, planejamento e raciocínio probabilístico.",
    "featured": true
  }
];

// Camada de API Assíncrona
async function fetchBooksCatalog() {
  // Protocolo file:// bloqueia chamadas fetch por política de segurança do navegador (CORS local).
  // Neste caso, recorremos ao catálogo estruturado integrado sem falhar a interface.
  if (window.location.protocol === 'file:') {
    console.info('[API Service] Executando sob protocolo file://. Utilizando catálogo integrado com sucesso.');
    return FALLBACK_BOOKS_CATALOG;
  }

  try {
    const response = await fetch('./data/books.json', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    try {
      localStorage.setItem('alexandria_catalog_cache_v1', JSON.stringify(books));
    } catch (e) {
      // Ignora erro de cota de armazenamento
    }
    return books;
  } catch (error) {
    console.warn('[API Service] Falha na requisição fetch remota. Carregando dados de contingência.', error);
    const cached = localStorage.getItem('alexandria_catalog_cache_v1');
    if (cached) {
      return JSON.parse(cached);
    }
    return FALLBACK_BOOKS_CATALOG;
  }
}

// Estado Global da Aplicação
const appState = {
  allBooks: [],
  filteredBooks: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  favorites: new Set(),
  isLoading: true
};

// Formatação Monetária BRL
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

// Cache de Elementos do DOM
let DOM = {};

function queryDOMElements() {
  DOM = {
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
    totalBooksStat: document.getElementById('totalBooksStat'),
    apiStatusText: document.getElementById('apiStatusText')
  };
}

/**
 * Ponto de Entrada Principal
 */
function initializeApp() {
  queryDOMElements();

  // Carrega favoritos do LocalStorage
  try {
    const savedFavs = JSON.parse(localStorage.getItem('alexandria_favs') || '[]');
    appState.favorites = new Set(savedFavs);
  } catch (e) {
    appState.favorites = new Set();
  }

  initTheme();
  setupEventListeners();
  loadCatalog();
}

// Dispara inicialização independente de quando o script carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/**
 * Carrega catálogo a partir da API ou dados resilientes
 */
async function loadCatalog() {
  renderSkeletons(8);
  try {
    const books = await fetchBooksCatalog();
    appState.allBooks = books;
    appState.isLoading = false;

    if (DOM.totalBooksStat) {
      DOM.totalBooksStat.textContent = books.length;
    }

    if (DOM.apiStatusText) {
      DOM.apiStatusText.textContent = window.location.protocol === 'file:' 
        ? 'Dados carregados (Modo Local/Offline)' 
        : 'API RESTful JSON Conectada';
    }

    renderCategoryChips();
    applyFiltersAndSort();
  } catch (error) {
    console.error('Falha crítica ao inicializar catálogo:', error);
    appState.allBooks = FALLBACK_BOOKS_CATALOG;
    appState.isLoading = false;
    renderCategoryChips();
    applyFiltersAndSort();
  }
}

/**
 * Renderiza esqueletos de carregamento
 */
function renderSkeletons(count = 6) {
  if (!DOM.catalogGrid) return;
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
  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = 'Carregando catálogo de obras...';
  }
}

/**
 * Aplica busca, filtro de categoria e ordenação
 */
function applyFiltersAndSort() {
  let result = [...appState.allBooks];

  // 1. Filtro por Categoria
  if (appState.selectedCategory !== 'all') {
    result = result.filter(book => book.category === appState.selectedCategory);
  }

  // 2. Filtro por Busca Textual
  if (appState.searchQuery.trim() !== '') {
    const query = appState.searchQuery.toLowerCase().trim();
    result = result.filter(book =>
      (book.title && book.title.toLowerCase().includes(query)) ||
      (book.author && book.author.toLowerCase().includes(query)) ||
      (book.category && book.category.toLowerCase().includes(query)) ||
      (book.synopsis && book.synopsis.toLowerCase().includes(query))
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
 * Gera capa em SVG dinâmico caso a imagem externa falhe ou esteja offline
 */
function getSvgFallbackCover(title, category) {
  const safeTitle = (title || 'Obra').replace(/['"<>&]/g, '').substring(0, 36);
  const safeCat = (category || 'Geral').toUpperCase().replace(/['"<>&]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
    <defs>
      <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bookGrad)"/>
    <rect x="15" y="15" width="270" height="370" fill="none" stroke="#d97706" stroke-width="2" opacity="0.5"/>
    <text x="50%" y="65" fill="#38bdf8" font-size="10" font-family="sans-serif" font-weight="700" letter-spacing="2" text-anchor="middle">${safeCat}</text>
    <text x="50%" y="175" fill="#f8fafc" font-size="15" font-family="serif" font-weight="700" text-anchor="middle">${safeTitle}</text>
    <circle cx="150" cy="265" r="28" fill="#d97706" opacity="0.2"/>
    <text x="150" y="274" fill="#d97706" font-size="22" font-family="sans-serif" text-anchor="middle">📖</text>
    <text x="50%" y="340" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">LIVRARIA ALEXANDRIA</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

window.handleImageError = function(imgElement, title, category) {
  imgElement.onerror = null;
  imgElement.src = getSvgFallbackCover(title, category);
};

function escapeForHtmlAttr(str) {
  if (!str) return '';
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

/**
 * Renderiza os cartões de livros no DOM
 */
function renderCatalog() {
  if (!DOM.catalogGrid) return;
  const books = appState.filteredBooks;

  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = `Exibindo ${books.length} de ${appState.allBooks.length} títulos`;
  }

  if (books.length === 0) {
    DOM.catalogGrid.innerHTML = `
      <div class="empty-state" role="status">
        <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="empty-title">Nenhum livro encontrado</h3>
        <p class="empty-text">Não encontramos resultados para os termos ou categoria selecionados.</p>
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
          <img 
            src="${book.cover}" 
            alt="Capa de ${book.title}" 
            class="book-cover-img" 
            loading="lazy" 
            onerror="handleImageError(this, '${escapeForHtmlAttr(book.title)}', '${escapeForHtmlAttr(book.category)}')" />
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
 * Renderiza pílulas de categorias
 */
function renderCategoryChips() {
  if (!DOM.categoryNav) return;
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
 * Abre o Modal Nativo (<dialog>)
 */
function openBookDetails(bookId) {
  const book = appState.allBooks.find(b => b.id === Number(bookId));
  if (!book || !DOM.detailsModal) return;

  if (DOM.modalCover) {
    DOM.modalCover.src = book.cover;
    DOM.modalCover.alt = `Capa ampliada de ${book.title}`;
    DOM.modalCover.onerror = function() {
      this.onerror = null;
      this.src = getSvgFallbackCover(book.title, book.category);
    };
  }
  if (DOM.modalCategory) DOM.modalCategory.textContent = book.category;
  if (DOM.modalRating) DOM.modalRating.textContent = `★ ${book.rating.toFixed(1)} / 5.0`;
  if (DOM.modalTitle) DOM.modalTitle.textContent = book.title;
  if (DOM.modalAuthor) DOM.modalAuthor.textContent = `Por ${book.author}`;
  if (DOM.modalPublisher) DOM.modalPublisher.textContent = book.publisher;
  if (DOM.modalYear) DOM.modalYear.textContent = book.year;
  if (DOM.modalPages) DOM.modalPages.textContent = `${book.pages} páginas`;
  if (DOM.modalIsbn) DOM.modalIsbn.textContent = book.isbn;
  if (DOM.modalSynopsis) DOM.modalSynopsis.textContent = book.synopsis;
  if (DOM.modalPrice) DOM.modalPrice.textContent = currencyFormatter.format(book.price);

  if (DOM.modalBuyBtn) {
    DOM.modalBuyBtn.onclick = () => {
      showToast(`Adicionado ao carrinho: ${book.title}`);
      closeModal();
    };
  }

  if (typeof DOM.detailsModal.showModal === 'function') {
    DOM.detailsModal.showModal();
  } else {
    DOM.detailsModal.setAttribute('open', '');
  }
}

function closeModal() {
  if (!DOM.detailsModal) return;
  if (typeof DOM.detailsModal.close === 'function') {
    DOM.detailsModal.close();
  } else {
    DOM.detailsModal.removeAttribute('open');
  }
}

/**
 * Favoritar / Desfavoritar
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

  try {
    localStorage.setItem('alexandria_favs', JSON.stringify([...appState.favorites]));
  } catch (e) {}

  renderCatalog();
}

/**
 * Reseta filtros
 */
function resetFilters() {
  appState.selectedCategory = 'all';
  appState.searchQuery = '';
  appState.sortBy = 'featured';

  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.sortSelect) DOM.sortSelect.value = 'featured';

  renderCategoryChips();
  applyFiltersAndSort();
  showToast('Filtros redefinidos');
}

/**
 * Exibe notificação Toast
 */
function showToast(message) {
  if (!DOM.toastContainer) return;

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
 * Debounce
 */
function debounce(fn, delayMs = 250) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

/**
 * Configuração de Ouvintes de Eventos
 */
function setupEventListeners() {
  // Busca em tempo real
  if (DOM.searchInput) {
    const debouncedSearch = debounce((e) => {
      appState.searchQuery = e.target.value;
      applyFiltersAndSort();
    }, 200);
    DOM.searchInput.addEventListener('input', debouncedSearch);
  }

  // Ordenação
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      appState.sortBy = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Filtros por Categorias (Event Delegation)
  if (DOM.categoryNav) {
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
  }

  // Ações nos Cartões (Event Delegation)
  if (DOM.catalogGrid) {
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
  }

  // Fechamento do Modal
  if (DOM.modalCloseBtn) {
    DOM.modalCloseBtn.addEventListener('click', closeModal);
  }

  if (DOM.detailsModal) {
    DOM.detailsModal.addEventListener('click', (e) => {
      const rect = DOM.detailsModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });
  }

  // Alternância de Tema
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);
  }
}

/**
 * Tema Claro (Padrão) / Escuro
 */
function initTheme() {
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('alexandria_theme_v2') || 'light';
  } catch (e) {
    savedTheme = 'light';
  }

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('alexandria_theme_v2', next);
  } catch (e) {}
  updateThemeIcon(next);
  showToast(next === 'light' ? 'Tema claro ativado' : 'Tema escuro ativado');
}

function updateThemeIcon(theme) {
  if (!DOM.themeIcon) return;
  if (theme === 'light') {
    // No tema claro, exibe o ícone de Lua para alternar para escuro
    DOM.themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    `;
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.setAttribute('title', 'Mudar para tema escuro');
      DOM.themeToggleBtn.setAttribute('aria-label', 'Ativar tema escuro');
    }
  } else {
    // No tema escuro, exibe o ícone de Sol para alternar para claro
    DOM.themeIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    `;
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.setAttribute('title', 'Mudar para tema claro');
      DOM.themeToggleBtn.setAttribute('aria-label', 'Ativar tema claro');
    }
  }
}
