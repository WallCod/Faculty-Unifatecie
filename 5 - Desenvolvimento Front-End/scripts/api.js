/**
 * api.js - Módulo de Serviço RESTful para Livraria
 * Responsável por obter dados assíncronos em formato JSON,
 * tratar exceções de rede e simular latência de requisição real.
 */

const API_CONFIG = {
  // Endpoints: tenta carregar data/books.json relativo ao app
  endpoint: './data/books.json',
  cacheKey: 'alexandria_catalog_cache_v1',
  simulatedDelayMs: 300 // Simula RTT típico de rede
};

/**
 * Busca o catálogo de livros da API externa/serviço JSON
 * @returns {Promise<Array>} Lista de objetos de livros
 */
export async function fetchBooksCatalog() {
  try {
    // 1. Simulação do tempo de viagem de pacotes (RTT)
    if (API_CONFIG.simulatedDelayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.simulatedDelayMs));
    }

    // 2. Requisição HTTP via fetch API nativa
    const response = await fetch(API_CONFIG.endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    // 3. Verificação de status HTTP (200-299)
    if (!response.ok) {
      throw new Error(`Erro na requisição HTTP: ${response.status} ${response.statusText}`);
    }

    // 4. Desserialização do payload JSON
    const books = await response.json();

    // 5. Atualiza cache local para resiliência offline
    try {
      localStorage.setItem(API_CONFIG.cacheKey, JSON.stringify(books));
    } catch (storageErr) {
      console.warn('Não foi possível persistir no cache local:', storageErr);
    }

    return books;
  } catch (error) {
    console.error('Falha ao obter dados da API REST:', error);

    // Fallback: Tenta recuperar do cache local em caso de falha de rede
    const cached = localStorage.getItem(API_CONFIG.cacheKey);
    if (cached) {
      console.info('Recuperando catálogo do cache local offline...');
      return JSON.parse(cached);
    }

    throw error;
  }
}

/**
 * Busca os detalhes de um livro específico por ID
 * @param {number} bookId 
 * @returns {Promise<Object|null>}
 */
export async function fetchBookById(bookId) {
  const books = await fetchBooksCatalog();
  return books.find(b => b.id === Number(bookId)) || null;
}
