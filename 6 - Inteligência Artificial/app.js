/**
 * ALEX CHATBOT — MOTOR DE PROCESSAMENTO DE LINGUAGEM NATURAL (PLN) E LÓGICA DE APLICAÇÃO
 * Bacharelado em Engenharia da Computação — Centro Universitário UniFatecie
 * Disciplina: Inteligência Artificial Aplicada
 * Acadêmico: Wallax Figueiredo
 */

// =============================================================================
// 1. BASE DE CONHECIMENTO ESTRUTURADA (FAQ CORPUS)
// =============================================================================
const FAQ_CORPUS = [
  {
    id: "institucional_sobre",
    categoria: "Institucional",
    pergunta_canonico: "O que é a Livraria e Editora Alexandria?",
    exemplos: [
      "o que e a livraria alexandria",
      "quem sao voces",
      "sobre a empresa alexandria",
      "qual a historia da livraria",
      "onde fica a livraria alexandria"
    ],
    resposta: "A **Livraria & Editora Alexandria** é uma empresa fundada em 2018 focada em literatura acadêmica, técnica (Engenharia e Computação) e clássicos universais. Contamos com acervo de mais de 85.000 títulos e centros de distribuição em Salvador (BA) e São Paulo (SP)."
  },
  {
    id: "institucional_loja_fisica",
    categoria: "Institucional",
    pergunta_canonico: "A Livraria Alexandria possui lojas físicas?",
    exemplos: [
      "tem loja fisica",
      "onde posso comprar presencialmente",
      "posso retirar na loja",
      "existe loja fisica da alexandria"
    ],
    resposta: "Nosso modelo operacional é prioritariamente digital (*e-commerce* direto ao consumidor — D2C), além de estandes em bienais e semanas acadêmicas. Isso nos permite praticar preços até 25% mais baixos e envios expressos para todo o Brasil!"
  },
  {
    id: "institucional_horario",
    categoria: "Institucional",
    pergunta_canonico: "Qual o horário de atendimento e funcionamento?",
    exemplos: [
      "qual o horario de atendimento",
      "que horas voces atendem",
      "horario de suporte humano",
      "dias de funcionamento da livraria"
    ],
    resposta: "Nosso assistente virtual Alex atende 24h por dia, 7 dias por semana! Já a equipe de suporte humano de Nível 2 funciona de segunda a sexta, das 08h às 19h, e aos sábados das 09h às 13h (horário de Brasília)."
  },
  {
    id: "catalogo_formatos",
    categoria: "Catálogo",
    pergunta_canonico: "Quais formatos de livros estão disponíveis?",
    exemplos: [
      "quais formatos de livros voces vendem",
      "tem livro digital e ebook",
      "vende audiobook ou livro fisico",
      "qual formato do livro epub pdf"
    ],
    resposta: "Trabalhamos com 3 formatos principais: **1. Livros Físicos** (Capa Dura e Brochura em papel pólen de luxo); **2. E-books** (.EPUB responsivo e .PDF diagramado); e **3. Audiobooks** narrados em estúdio com áudio de alta fidelidade."
  },
  {
    id: "catalogo_acesso_digital",
    categoria: "Catálogo",
    pergunta_canonico: "Como recebo o acesso aos livros digitais (E-books)?",
    exemplos: [
      "como baixar meu ebook",
      "onde fica o livro digital que comprei",
      "como acessar o audiobook",
      "recebi o link do ebook por email"
    ],
    resposta: "Assim que o pagamento for compensado, o link para download é enviado para o seu e-mail e fica disponível permanentemente no seu painel em *'Minha Biblioteca Digital'*, sem limite de downloads pessoais."
  },
  {
    id: "pagamento_formas",
    categoria: "Pagamentos",
    pergunta_canonico: "Quais são as formas de pagamento aceitas?",
    exemplos: [
      "quais as formas de pagamento",
      "aceita cartao e pix",
      "posso pagar com boleto bancario",
      "divide em quantas vezes no cartao",
      "formas de pagar minha compra"
    ],
    resposta: "Aceitamos **Pix Instantâneo** (com 5% de desconto automático e aprovação imediata), **Cartão de Crédito** em até 6x sem juros (ou até 12x), **Boleto Bancário** e faturamento por Nota de Empenho para órgãos públicos e universidades."
  },
  {
    id: "pagamento_seguranca",
    categoria: "Pagamentos",
    pergunta_canonico: "O pagamento no site da Livraria Alexandria é seguro?",
    exemplos: [
      "o site e seguro para pagar",
      "meus dados de cartao estao protegidos",
      "tem certificado de seguranca ssl",
      "e confiavel comprar na alexandria"
    ],
    resposta: "Sim, 100% seguro! Nossa plataforma utiliza criptografia TLS 1.3 (AES-256 bits). Não armazenamos números de cartões em nossos servidores — todo o processamento é feito em gateways certificados com conformidade internacional PCI-DSS Nível 1."
  },
  {
    id: "pagamento_cupons",
    categoria: "Pagamentos",
    pergunta_canonico: "Como utilizar um cupom de desconto?",
    exemplos: [
      "como aplicar cupom de desconto",
      "onde coloco o codigo promocional",
      "tem cupom de primeira compra",
      "onde digito o cupom"
    ],
    resposta: "Na tela de finalização de compra (Checkout), localize o campo *'Possui cupom de desconto?'*, digite o código (ex: `UNIFATECIE15` para 15% off) e clique em Aplicar. O desconto será calculado na hora sobre o subtotal dos produtos!"
  },
  {
    id: "frete_prazos",
    categoria: "Entregas",
    pergunta_canonico: "Qual é o prazo de entrega e envio dos pedidos?",
    exemplos: [
      "qual o prazo de entrega dos livros",
      "quanto tempo demora para chegar",
      "prazo de envio do pedido",
      "quando meu livro vai ser postado"
    ],
    resposta: "Itens com estoque imediato são postados em até 24 horas úteis. Prazos médios: **Entrega Expressa (Sedex/Aéreo):** 1 a 3 dias úteis; **Entrega Econômica (PAC/Rodoviário):** 4 a 10 dias úteis; **Alexandria Flash:** no mesmo dia para Salvador e Grande SP."
  },
  {
    id: "frete_gratis",
    categoria: "Entregas",
    pergunta_canonico: "Como funciona a política de Frete Grátis?",
    exemplos: [
      "qual o valor para frete gratis",
      "como ter frete gratis",
      "a partir de quanto o frete e gratuito",
      "tem entrega gratuita para minha regiao"
    ],
    resposta: "Oferecemos Frete Grátis para as regiões **Sul, Sudeste e Nordeste** em pedidos a partir de R$ 149,00. Para o **Centro-Oeste e Norte**, o frete é gratuito em compras a partir de R$ 229,00!"
  },
  {
    id: "frete_rastreio",
    categoria: "Entregas",
    pergunta_canonico: "Como rastrear o meu pedido?",
    exemplos: [
      "como rastrear meu pedido",
      "onde vejo o codigo de rastreamento",
      "quero rastrear minha encomenda",
      "onde esta meu pacote correios"
    ],
    resposta: "Você pode rastrear digitando o código do pedido diretamente aqui no chat (ex: `PED-84920` ou clicando no atalho **'Rastrear Pedido'** acima) ou consultar no menu *'Meus Pedidos'* em nosso site."
  },
  {
    id: "posvenda_trocas",
    categoria: "Pós-Venda",
    pergunta_canonico: "Qual é a política de trocas e devoluções?",
    exemplos: [
      "como solicitar troca ou devolucao",
      "posso devolver se me arrepender da compra",
      "qual o prazo para devolver o livro",
      "direito de arrependimento cdc"
    ],
    resposta: "Em respeito ao Art. 49 do CDC, você tem até **7 dias corridos** após o recebimento para desistir da compra e solicitar devolução gratuita. A logística reversa pelos Correios é 100% paga pela Livraria Alexandria."
  },
  {
    id: "posvenda_defeito",
    categoria: "Pós-Venda",
    pergunta_canonico: "O que fazer se o livro chegar com defeito ou avaria?",
    exemplos: [
      "meu livro chegou rasgado com defeito",
      "veio com paginas em branco e amassado",
      "o pacote veio danificado",
      "como trocar livro avariado"
    ],
    resposta: "Você tem até **30 dias corridos** para solicitar a troca de produtos com defeito gráfico ou avaria de transporte. Basta enviar fotos do problema e o número do pedido pelo chat ou para `suporte@livrariaalexandria.com.br` para envio imediato de um novo exemplar sem custo!"
  },
  {
    id: "privacidade_lgpd",
    categoria: "Privacidade",
    pergunta_canonico: "Como a Livraria Alexandria trata meus dados pessoais (LGPD)?",
    exemplos: [
      "politica de privacidade e dados lgpd",
      "voces compartilham meus dados com terceiros",
      "como excluir minha conta e dados",
      "meus dados estao protegidos na livraria"
    ],
    resposta: "Atuamos em estrita conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018). Coletamos apenas dados essenciais para faturamento e entrega, sem repassar a terceiros para fins de marketing. Para falar com nosso DPO: `dpo@livrariaalexandria.com.br`."
  },
  {
    id: "suporte_humano",
    categoria: "Atendimento",
    pergunta_canonico: "Como falar com um atendente humano?",
    exemplos: [
      "quero falar com atendente humano",
      "preciso falar com uma pessoa",
      "me transfira para um ser humano",
      "atendente suporte humano whatsapp"
    ],
    resposta: "Com certeza! Você pode falar diretamente com nossa equipe de especialistas humanos pelo **WhatsApp Oficial: (73) 99842-1020** ou por e-mail em `contato@livrariaalexandria.com.br`. Estamos disponíveis de seg a sex das 08h às 19h e aos sábados das 09h às 13h."
  }
];

// =============================================================================
// 2. STOP WORDS DA LÍNGUA PORTUGUESA (PT-BR)
// =============================================================================
const PORTUGUESE_STOP_WORDS = new Set([
  "a", "ao", "aos", "aquela", "aquelas", "aquele", "aqueles", "aquilo", "as",
  "ate", "com", "como", "da", "das", "de", "dela", "delas", "dele", "deles",
  "depois", "do", "dos", "e", "ela", "elas", "ele", "eles", "em", "entre",
  "era", "eram", "eramos", "essa", "essas", "esse", "esses", "esta", "estas",
  "este", "estes", "eu", "foi", "fomos", "foram", "ha", "isso", "isto", "ja",
  "lhe", "lhes", "mais", "mas", "me", "mesmo", "meu", "meus", "minha",
  "minhas", "muito", "na", "nas", "nao", "no", "nos", "nossa", "nossas",
  "nosso", "nossos", "num", "numa", "o", "os", "ou", "para", "pela", "pelas",
  "pelo", "pelos", "por", "qual", "quais", "quando", "que", "quem", "se",
  "seja", "sejam", "sem", "sera", "serao", "seu", "seus", "so", "sua",
  "suas", "tambem", "te", "tem", "temos", "tenho", "ter", "teu", "teus",
  "tu", "tua", "tuas", "um", "uma", "voces", "vos", "voce"
]);

// =============================================================================
// 3. MOTOR DE PROCESSAMENTO DE LINGUAGEM NATURAL (PLN)
// =============================================================================
class NLPEngine {
  constructor(corpus) {
    this.corpus = corpus;
    this.vocabulary = new Set();
    this.indexedDocs = [];
    this.idfTable = {};
    this.train();
  }

  /**
   * Normalização: lowercase, remoção de acentos e caracteres especiais
   */
  normalize(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove acentuação
      .replace(/[^a-z0-9\s]/g, " ")     // remove pontuação e símbolos
      .replace(/\s+/g, " ")             // normaliza múltiplos espaços
      .trim();
  }

  /**
   * Tokenização simples por espaço em branco
   */
  tokenize(text) {
    const normalized = this.normalize(text);
    if (!normalized) return [];
    return normalized.split(" ").filter(t => t.length > 0);
  }

  /**
   * Filtragem de Stop Words
   */
  removeStopWords(tokens) {
    return tokens.filter(t => !PORTUGUESE_STOP_WORDS.has(t) && t.length > 1);
  }

  /**
   * Stemming Heurístico para Português (Remoção de Sufixos e Plurais)
   */
  stem(word) {
    if (word.length <= 3) return word;
    let s = word;

    // Regras de redução de plurais e gêneros
    if (s.endsWith("oes")) s = s.slice(0, -3) + "ao";
    else if (s.endsWith("ns")) s = s.slice(0, -2) + "m";
    else if (s.endsWith("ais") || s.endsWith("eis") || s.endsWith("ois")) s = s.slice(0, -2) + "l";
    else if (s.endsWith("res") || s.endsWith("zes")) s = s.slice(0, -2);
    else if (s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("is")) s = s.slice(0, -1);

    // Regras verbais e sufixais comuns
    const suffixes = [
      "amente", "mente", "izacao", "amento", "imento",
      "ando", "endo", "indo", "aram", "eram", "iram",
      "asse", "esse", "isse", "aria", "eria", "iria",
      "ara", "era", "ira", "ava", "eva", "iva",
      "ado", "ido", "vel", "dor", "cao"
    ];

    for (const suf of suffixes) {
      if (s.endsWith(suf) && s.length - suf.length >= 3) {
        s = s.slice(0, -suf.length);
        break;
      }
    }

    return s;
  }

  /**
   * Pipeline completo de pré-processamento de uma frase
   */
  preprocess(text) {
    const tokens = this.tokenize(text);
    const filtered = this.removeStopWords(tokens);
    const stemmed = filtered.map(t => this.stem(t));
    return { tokens, filtered, stemmed };
  }

  /**
   * Treinamento e Indexação da Base FAQ com TF-IDF
   */
  train() {
    this.indexedDocs = [];
    this.vocabulary.clear();

    const docFreq = {};
    const totalDocs = this.corpus.length;

    // Processa cada documento agregando exemplos e pergunta canônica
    this.corpus.forEach((item, docIdx) => {
      const fullText = [item.pergunta_canonico, ...item.exemplos].join(" ");
      const { stemmed } = this.preprocess(fullText);

      const termCounts = {};
      const uniqueTerms = new Set(stemmed);

      stemmed.forEach(term => {
        termCounts[term] = (termCounts[term] || 0) + 1;
        this.vocabulary.add(term);
      });

      uniqueTerms.forEach(term => {
        docFreq[term] = (docFreq[term] || 0) + 1;
      });

      this.indexedDocs.push({
        id: item.id,
        rawItem: item,
        termCounts,
        docLength: stemmed.length,
        stemmed
      });
    });

    // Calcula IDF para cada termo no vocabulário
    this.idfTable = {};
    this.vocabulary.forEach(term => {
      const df = docFreq[term] || 0;
      this.idfTable[term] = Math.log((1 + totalDocs) / (1 + df)) + 1.0;
    });

    // Calcula vetor unitário TF-IDF para cada documento
    this.indexedDocs.forEach(doc => {
      doc.vector = this.computeVector(doc.termCounts, doc.docLength);
    });
  }

  /**
   * Vetorização com cálculo de TF-IDF e normalização euclidiana (Norma L2)
   */
  computeVector(termCounts, totalTerms) {
    const vector = {};
    let sumSquares = 0;

    for (const term in termCounts) {
      if (this.idfTable[term]) {
        const tf = termCounts[term] / Math.max(1, totalTerms);
        const tfidf = tf * this.idfTable[term];
        vector[term] = tfidf;
        sumSquares += tfidf * tfidf;
      }
    }

    // Normaliza para vetor unitário
    const magnitude = Math.sqrt(sumSquares);
    if (magnitude > 0) {
      for (const term in vector) {
        vector[term] /= magnitude;
      }
    }

    return vector;
  }

  /**
   * Similaridade por Cosseno entre dois vetores unitários
   */
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    for (const term in vecA) {
      if (vecB[term]) {
        dotProduct += vecA[term] * vecB[term];
      }
    }
    return dotProduct; // como ambos são unitários, o produto interno é o cosseno
  }

  /**
   * Inferência: busca os documentos mais similares a uma consulta do usuário
   */
  match(queryText) {
    const pipeline = this.preprocess(queryText);
    const queryCounts = {};

    pipeline.stemmed.forEach(term => {
      queryCounts[term] = (queryCounts[term] || 0) + 1;
    });

    const queryVector = this.computeVector(queryCounts, pipeline.stemmed.length);
    const scores = [];

    this.indexedDocs.forEach(doc => {
      const sim = this.cosineSimilarity(queryVector, doc.vector);
      scores.push({
        doc: doc.rawItem,
        similarity: sim
      });
    });

    // Ordena do mais similar para o menos similar
    scores.sort((a, b) => b.similarity - a.similarity);

    return {
      pipeline,
      queryVector,
      topMatch: scores[0],
      runnerUp: scores[1],
      allScores: scores
    };
  }
}

// =============================================================================
// 4. MÓDULOS INTERATIVOS ADICIONAIS (RASTREIO & QUIZ LITERÁRIO)
// =============================================================================

// Mock de banco de dados logístico da Livraria
const MOCK_ORDERS = {
  "PED-84920": {
    codigo: "PED-84920",
    destinatario: "Wallax Figueiredo",
    itens: "1x Estruturas de Dados em C, 1x Clean Code",
    transportadora: "Sedex Express (Correios)",
    codigoRastreio: "BR849201920JR",
    previsao: "10/11/2026",
    status: "Em Rota de Entrega",
    etapas: [
      { nome: "Pagamento Aprovado", status: "completed", data: "06/11 09:15" },
      { nome: "Em Separação no CD Salvador", status: "completed", data: "06/11 14:30" },
      { nome: "Despachado para Transportadora", status: "completed", data: "07/11 10:00" },
      { nome: "Em Rota para o Destinatário", status: "active", data: "08/11 08:30" },
      { nome: "Pedido Entregue", status: "pending", data: "Previsão hoje" }
    ]
  },
  "PED-10423": {
    codigo: "PED-10423",
    destinatario: "Mariana Silva",
    itens: "1x Duna (Edição Especial Capa Dura)",
    transportadora: "Jadlog Logística",
    codigoRastreio: "JAD771920401",
    previsao: "14/11/2026",
    status: "Em Separação no Estoque",
    etapas: [
      { nome: "Pagamento Aprovado", status: "completed", data: "07/11 18:22" },
      { nome: "Em Separação no Estoque", status: "active", data: "08/11 09:00" },
      { nome: "Despachado", status: "pending", data: "Aguardando" },
      { nome: "Em Rota", status: "pending", data: "Aguardando" },
      { nome: "Entregue", status: "pending", data: "Aguardando" }
    ]
  }
};

// Catálogo de livros para recomendação
const BOOK_CATALOG = [
  {
    genero: "computacao",
    nivel: "iniciante",
    titulo: "Entendendo Algoritmos",
    autor: "Aditya Bhargava",
    preco: "R$ 68,90",
    sinopse: "Um guia ilustrado e didático para programadores e curiosos aprenderem algoritmos essenciais sem sofrimento.",
    formato: "Livro Físico / E-book"
  },
  {
    genero: "computacao",
    nivel: "avancado",
    titulo: "Designing Data-Intensive Applications",
    autor: "Martin Kleppmann",
    preco: "R$ 142,50",
    sinopse: "A obra definitiva sobre arquitetura de sistemas distribuídos, confiabilidade, escalabilidade e consistência de dados.",
    formato: "Capa Dura / E-book"
  },
  {
    genero: "ficcao",
    nivel: "todos",
    titulo: "Neuromancer (Trilogia do Sprawl)",
    autor: "William Gibson",
    preco: "R$ 59,90",
    sinopse: "O clássico fundador do gênero cyberpunk, vencedor dos prêmios Hugo, Nebula e Philip K. Dick.",
    formato: "Brochura Especial / Audiobook"
  },
  {
    genero: "filosofia",
    nivel: "todos",
    titulo: "Meditações",
    autor: "Marco Aurélio",
    preco: "R$ 44,90",
    sinopse: "Os pensamentos privados do imperador romano e filósofo estóico sobre disciplina, serenidade e propósito de vida.",
    formato: "Capa Dura Bilíngue"
  }
];

// =============================================================================
// 5. CONTROLADOR DA INTERFACE E TELEMETRIA DE IA
// =============================================================================
class ChatbotApp {
  constructor() {
    this.nlp = new NLPEngine(FAQ_CORPUS);
    this.messagesViewport = document.getElementById("messagesViewport");
    this.chatForm = document.getElementById("chatForm");
    this.userInput = document.getElementById("userInput");
    this.btnResetChat = document.getElementById("btnResetChat");
    this.metricsModal = document.getElementById("metricsModal");
    this.btnOpenMetrics = document.getElementById("btnOpenMetrics");
    this.btnCloseModal = document.getElementById("btnCloseModal");

    // Telemetria da sessão
    this.telemetry = {
      totalQueries: 0,
      directMatches: 0,
      fallbacks: 0,
      similaritySum: 0,
      lastPipeline: null,
      unresolvedQueries: []
    };

    // Estado do Quiz Interativo
    this.quizState = null;

    this.initEvents();
    this.renderWelcome();
  }

  initEvents() {
    // Envio de formulário
    this.chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = this.userInput.value.trim();
      if (!text) return;
      this.handleUserMessage(text);
      this.userInput.value = "";
    });

    // Reiniciar chat
    this.btnResetChat.addEventListener("click", () => {
      this.messagesViewport.innerHTML = "";
      this.quizState = null;
      this.renderWelcome();
    });

    // Modal de Métricas
    this.btnOpenMetrics.addEventListener("click", () => this.openMetrics());
    this.btnCloseModal.addEventListener("click", () => this.closeMetrics());
    this.metricsModal.addEventListener("click", (e) => {
      if (e.target === this.metricsModal) this.closeMetrics();
    });

    // Cliques em Chips Rápidos
    document.querySelectorAll(".chip-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const query = btn.getAttribute("data-query");
        const action = btn.getAttribute("data-action");

        if (action === "track-order") {
          this.startOrderTrackingFlow();
        } else if (action === "book-quiz") {
          this.startBookQuizFlow();
        } else if (query) {
          this.handleUserMessage(query);
        }
      });
    });
  }

  renderWelcome() {
    const welcomeHtml = `
      Olá! Eu sou o <strong>Alex</strong>, bibliotecário digital e assistente virtual da <em>Livraria & Editora Alexandria</em>. 🦉📚<br><br>
      Estou aqui 24 horas para tirar dúvidas sobre nosso catálogo, formas de pagamento, prazos de envio, frete grátis e trocas.<br><br>
      Você pode digitar sua pergunta livremente ou escolher uma das ações rápidas nos botões acima!
    `;
    this.appendBotMessage(welcomeHtml, null);
  }

  handleUserMessage(text) {
    this.appendUserMessage(text);

    // Se estiver no meio do Quiz de Recomendação
    if (this.quizState) {
      this.handleQuizStep(text);
      return;
    }

    // Detecção de Código de Rastreio (ex: PED-84920 ou 84920)
    const orderMatch = text.match(/ped[-\s]?(\d{5})/i) || text.match(/\b(\d{5})\b/);
    if (orderMatch) {
      const orderKey = `PED-${orderMatch[1]}`;
      this.renderOrderTracking(orderKey);
      return;
    }

    // Inferência pelo motor de PLN
    const result = this.nlp.match(text);
    this.updateTelemetry(text, result);

    const topMatch = result.topMatch;
    const score = topMatch ? topMatch.similarity : 0;

    // Regra de Decisão por Limiar (Thresholds)
    if (score >= 0.35) {
      // Confiança Alta: Match Direto
      const badge = `<span class="nlp-badge" title="Similaridade por Cosseno">Score: ${(score).toFixed(2)} | ${topMatch.doc.categoria}</span>`;
      const feedback = `
        <div class="msg-feedback">
          <span>Esta resposta foi útil?</span>
          <button class="feedback-btn" onclick="this.parentElement.innerHTML='<span style=\\'color:#10b981\\'>✓ Obrigado pelo feedback!</span>'">👍 Sim</button>
          <button class="feedback-btn" onclick="this.parentElement.innerHTML='<span style=\\'color:#f59e0b\\'>Anotado para curadoria.</span>'">👎 Não</button>
        </div>
      `;
      this.appendBotMessage(topMatch.doc.resposta + feedback, badge);
    } 
    else if (score >= 0.20 && score < 0.35) {
      // Confiança Média: Sugestão ("Você quis dizer...?")
      const badge = `<span class="nlp-badge medium">Score Parcial: ${(score).toFixed(2)}</span>`;
      let suggestionHtml = `Entendi parcialmente sua dúvida. Você se refere a algum destes tópicos?<br><br>`;
      suggestionHtml += `🔹 <button class="quiz-btn" style="margin-bottom:6px" onclick="window.chatApp.handleUserMessage('${topMatch.doc.pergunta_canonico}')">${topMatch.doc.pergunta_canonico}</button><br>`;
      
      if (result.runnerUp && result.runnerUp.similarity > 0.15) {
        suggestionHtml += `🔹 <button class="quiz-btn" onclick="window.chatApp.handleUserMessage('${result.runnerUp.doc.pergunta_canonico}')">${result.runnerUp.doc.pergunta_canonico}</button>`;
      }
      this.appendBotMessage(suggestionHtml, badge);
    } 
    else {
      // Confiança Baixa: Fallback Gracioso + Transbordo Humano
      this.telemetry.fallbacks++;
      this.telemetry.unresolvedQueries.push({
        query: text,
        topScore: score.toFixed(2),
        timestamp: new Date().toLocaleTimeString("pt-BR")
      });

      const badge = `<span class="nlp-badge fallback">Fallback (Score: ${(score).toFixed(2)})</span>`;
      const fallbackHtml = `
        Ainda não encontrei uma resposta exata para a sua pergunta em nossa base de conhecimento frequente. 🧭<br><br>
        Como prezo pela precisão das informações, posso te encaminhar imediatamente para nossa equipe de atendimento humano ou sugerir os temas mais consultados:<br><br>
        <div class="quiz-options-group">
          <button class="quiz-btn" onclick="window.chatApp.handleUserMessage('quero falar com um atendente humano')">👤 Falar com Atendente Humano no WhatsApp</button>
          <button class="quiz-btn" onclick="window.chatApp.handleUserMessage('quais as formas de pagamento aceitas?')">💳 Dúvidas sobre Pagamentos & Pix</button>
          <button class="quiz-btn" onclick="window.chatApp.handleUserMessage('como funciona a politica de frete gratis?')">🚚 Prazos de Envio e Frete Grátis</button>
        </div>
      `;
      this.appendBotMessage(fallbackHtml, badge);
    }
  }

  // ===========================================================================
  // FLUXO INTERATIVO 1: RASTREAMENTO DE PEDIDOS
  // ===========================================================================
  startOrderTrackingFlow() {
    this.appendBotMessage(`
      📦 <strong>Rastreamento de Encomendas em Tempo Real</strong><br><br>
      Por favor, informe o número do seu pedido (Exemplo: <code>PED-84920</code> ou <code>PED-10423</code>):
    `, null);
  }

  renderOrderTracking(orderCode) {
    const order = MOCK_ORDERS[orderCode.toUpperCase()] || MOCK_ORDERS["PED-84920"];
    
    let timelineHtml = "";
    order.etapas.forEach(st => {
      timelineHtml += `
        <div class="timeline-step ${st.status}">
          <div class="step-dot"></div>
          <div>
            <strong>${st.nome}</strong> 
            <small style="color:var(--text-dim); margin-left:4px;">(${st.data})</small>
          </div>
        </div>
      `;
    });

    const cardHtml = `
      Localizei as informações da sua encomenda! 🚚📦<br>
      <div class="order-card">
        <div class="order-card-header">
          <div>
            Pedido: <span class="order-code">${order.codigo}</span>
          </div>
          <span style="font-size:0.75rem; color:#10b981; font-weight:700;">● ${order.status}</span>
        </div>
        <div class="order-timeline">
          ${timelineHtml}
        </div>
        <div class="order-details-grid">
          <div><span>Destinatário:</span> <strong>${order.destinatario}</strong></div>
          <div><span>Previsão de Entrega:</span> <strong>${order.previsao}</strong></div>
          <div><span>Transportadora:</span> <strong>${order.transportadora}</strong></div>
          <div><span>Código de Rastreio:</span> <strong>${order.codigoRastreio}</strong></div>
        </div>
      </div>
    `;

    this.appendBotMessage(cardHtml, `<span class="nlp-badge">Transacional • ERP</span>`);
  }

  // ===========================================================================
  // FLUXO INTERATIVO 2: QUIZ DE RECOMENDAÇÃO DE LIVROS
  // ===========================================================================
  startBookQuizFlow() {
    this.quizState = { step: 1, genero: null, nivel: null };
    const html = `
      📚 <strong>Curadoria Literária Personalizada</strong><br><br>
      Vou te ajudar a escolher a sua próxima grande leitura! Para começar, qual área ou gênero você tem mais interesse agora?<br>
      <div class="quiz-options-group">
        <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('computacao')">💻 Computação & Algoritmos</button>
        <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('ficcao')">🚀 Ficção Científica & Cyberpunk</button>
        <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('filosofia')">🏛️ Filosofia & Estoicismo</button>
      </div>
    `;
    this.appendBotMessage(html, `<span class="nlp-badge">Interativo • Curadoria</span>`);
  }

  handleQuizSelection(value) {
    if (!this.quizState) return;

    if (this.quizState.step === 1) {
      this.quizState.genero = value;
      this.quizState.step = 2;
      this.appendUserMessage(value.toUpperCase());

      const html = `
        Excelente escolha! E qual é o seu nível de aprofundamento desejado para esta leitura?<br>
        <div class="quiz-options-group">
          <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('iniciante')">🌱 Introdução / Didático & Ilustrado</button>
          <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('avancado')">🔬 Avançado / Profissional & Aprofundado</button>
          <button class="quiz-btn" onclick="window.chatApp.handleQuizSelection('todos')">📖 Clássico Universal Imperdível</button>
        </div>
      `;
      this.appendBotMessage(html, null);
    } 
    else if (this.quizState.step === 2) {
      this.quizState.nivel = value;
      this.appendUserMessage(value.toUpperCase());

      // Busca no catálogo
      const recommendations = BOOK_CATALOG.filter(b => 
        b.genero === this.quizState.genero || b.nivel === this.quizState.nivel || b.nivel === "todos"
      );

      const book = recommendations[0] || BOOK_CATALOG[0];

      const html = `
        Com base no seu perfil, selecionei esta recomendação com nota máxima dos nossos leitores: ⭐⭐⭐⭐⭐<br>
        <div class="book-recommendation-card">
          <div class="book-cover">📖</div>
          <div class="book-info">
            <h4>${book.titulo}</h4>
            <div class="book-author">Por ${book.autor} • ${book.formato}</div>
            <p class="book-synopsis">${book.sinopse}</p>
            <div class="book-footer">
              <span class="book-price">${book.preco}</span>
              <button class="book-buy-btn" onclick="alert('Item adicionado ao carrinho da Livraria Alexandria!')">Adicionar à Sacola</button>
            </div>
          </div>
        </div>
      `;

      this.appendBotMessage(html, `<span class="nlp-badge">Recomendação IA</span>`);
      this.quizState = null; // Encerra o quiz
    }
  }

  handleQuizStep(text) {
    // Caso o usuário digite texto durante o quiz
    const norm = this.nlp.normalize(text);
    if (norm.includes("computac") || norm.includes("algorit")) {
      this.handleQuizSelection("computacao");
    } else if (norm.includes("ficc") || norm.includes("cyber")) {
      this.handleQuizSelection("ficcao");
    } else if (norm.includes("filos")) {
      this.handleQuizSelection("filosofia");
    } else {
      this.handleQuizSelection("todos");
    }
  }

  // ===========================================================================
  // AUXILIARES DE RENDERIZAÇÃO
  // ===========================================================================
  appendUserMessage(text) {
    const row = document.createElement("div");
    row.className = "message-row user";
    row.innerHTML = `
      <div class="msg-avatar">👤</div>
      <div class="msg-body">
        <div class="msg-bubble">${this.escapeHtml(text)}</div>
        <div class="msg-meta">
          <span>${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `;
    this.messagesViewport.appendChild(row);
    this.scrollToBottom();
  }

  appendBotMessage(htmlContent, badgeHtml) {
    const row = document.createElement("div");
    row.className = "message-row bot";
    row.innerHTML = `
      <div class="msg-avatar">🦉</div>
      <div class="msg-body">
        <div class="msg-bubble">${htmlContent}</div>
        <div class="msg-meta">
          <span>Alex • ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
          ${badgeHtml || ""}
        </div>
      </div>
    `;
    this.messagesViewport.appendChild(row);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesViewport.scrollTop = this.messagesViewport.scrollHeight;
  }

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ===========================================================================
  // TELEMETRIA E DEBUGGER DE PLN
  // ===========================================================================
  updateTelemetry(query, result) {
    this.telemetry.totalQueries++;
    const sim = result.topMatch ? result.topMatch.similarity : 0;
    this.telemetry.similaritySum += sim;

    if (sim >= 0.35) {
      this.telemetry.directMatches++;
    }

    this.telemetry.lastPipeline = {
      query,
      tokens: result.pipeline.tokens,
      filtered: result.pipeline.filtered,
      stemmed: result.pipeline.stemmed,
      topIntent: result.topMatch ? result.topMatch.doc.id : "nenhuma",
      similarity: sim.toFixed(4)
    };
  }

  openMetrics() {
    const total = this.telemetry.totalQueries;
    const matchRate = total > 0 ? ((this.telemetry.directMatches / total) * 100).toFixed(1) + "%" : "100%";
    const avgSim = total > 0 ? (this.telemetry.similaritySum / total).toFixed(2) : "0.00";

    document.getElementById("metricTotal").innerText = total;
    document.getElementById("metricMatchRate").innerText = matchRate;
    document.getElementById("metricFallbacks").innerText = this.telemetry.fallbacks;
    document.getElementById("metricAvgSim").innerText = avgSim;

    // Inspeciona pipeline
    const pipelineBox = document.getElementById("pipelineDebugger");
    if (this.telemetry.lastPipeline) {
      const p = this.telemetry.lastPipeline;
      pipelineBox.innerHTML = `
        <strong>Consulta Bruta:</strong> "${p.query}"<br>
        <strong>1. Tokens Léxicos:</strong> [${p.tokens.join(", ")}]<br>
        <strong>2. Sem Stop Words:</strong> [${p.filtered.join(", ")}]<br>
        <strong>3. Radicais (Stems):</strong> [${p.stemmed.join(", ")}]<br>
        <strong>4. Top Intenção Casada:</strong> <code>${p.topIntent}</code><br>
        <strong>5. Cosseno Simulado:</strong> <code>${p.similarity}</code>
      `;
    } else {
      pipelineBox.innerHTML = `<p class="empty-state">Nenhuma consulta realizada ainda.</p>`;
    }

    // Inspeciona fallbacks
    const logBox = document.getElementById("unresolvedLog");
    if (this.telemetry.unresolvedQueries.length > 0) {
      let logHtml = "";
      this.telemetry.unresolvedQueries.forEach((item, idx) => {
        logHtml += `[${item.timestamp}] #${idx+1}: "${item.query}" (Score: ${item.topScore})<br>`;
      });
      logBox.innerHTML = logHtml;
    } else {
      logBox.innerHTML = `<p class="empty-state">Nenhum fallback registrado até o momento.</p>`;
    }

    this.metricsModal.classList.remove("hidden");
  }

  closeMetrics() {
    this.metricsModal.classList.add("hidden");
  }
}

// Inicialização Global
window.addEventListener("DOMContentLoaded", () => {
  window.chatApp = new ChatbotApp();
});
