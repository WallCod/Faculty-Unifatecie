# 5 - Desenvolvimento Front-End: Catálogo Online da Livraria Alexandria 📚

> Atividade Prática Integrada de Desenvolvimento Front-End  
> **Curso:** Bacharelado em Engenharia da Computação — Centro Universitário UniFatecie  
> **Autor:** Wallax Figueiredo ([LinkedIn](https://www.linkedin.com/in/wallax-figueiredo-41116b285/))  

---

## 🎯 Objetivo da Atividade

Desenvolver e justificar a interface web completa para o catálogo online responsivo e interativo de uma livraria, concebida para uma *software house*. A aplicação obtém dados dinamicamente de uma API RESTful em formato JSON, adota semântica HTML5 acessível (WAI-ARIA), apresentação moderna via CSS Grid / Flexbox e planeja a transição para arquitetura SPA com frameworks modernos.

---

## 📑 Resposta Técnica e Conceitual Completa

Para a análise formal da banca examinadora e do professor da disciplina, a resposta detalhada e aprofundada aos itens **(a)**, **(b)**, **(c)**, **(d)** e à **Síntese Integradora** está documentada no arquivo técnico anexo:

👉 **[Consulte a Resposta Técnica Completa (RESPOSTA_TECNICA.md)](./RESPOSTA_TECNICA.md)**

Tópicos abordados com fundamentação de engenharia:
1. **Infraestrutura Web & HTML Semântico:** Modelo cliente-servidor, resolução DNS recursiva, handshake TLS 1.3 / HTTPS, árvore DOM, landmarks e WAI-ARIA.
2. **Apresentação & Responsividade:** Box Model (`box-sizing: border-box`), seletores de baixa especificidade, CSS Variables (Design Tokens), layout responsivo Mobile-First com Grid e Flexbox, e análise crítica de frameworks CSS (Tailwind / Bootstrap vs. CSS Nativo).
3. **Interatividade & Dados Dinâmicos:** Ciclo do Event Loop (V8), manipulação eficiente do DOM, delegação de eventos, busca com debounce (250ms), e consumo assíncrono de API RESTful JSON com `async/await` e resiliência offline.
4. **Modernização para SPA:** Componentização declarativa, fluxo unidirecional de dados (state e props), roteamento no cliente com History API, e o papel dos bundlers modernos (Vite/Rollup) com Tree-Shaking e HMR.
5. **Síntese Integradora:** Coerência holística da engenharia de software aplicada ao front-end.

---

## 💻 Funcionalidades da Aplicação Implementada

- [x] **Catálogo Dinâmico em Grid Responsivo:** Cartões com proporção de capa editorial, badges de categoria, nota por estrelas e preço formatado em BRL (`Intl.NumberFormat`).
- [x] **Busca em Tempo Real com Debounce:** Filtragem instantânea por título, autor e assuntos sem travar a interface.
- [x] **Filtros por Categoria Interativos:** Pílulas acessíveis (`aria-pressed`) geradas dinamicamente com base nos dados da API.
- [x] **Ordenação Multicritério:** Ordenação por relevância, menor preço, maior preço, avaliação, ano de publicação e ordem alfabética.
- [x] **Modal de Ficha Técnica Nativo (`<dialog>`):** Exibe sinopse completa, ISBN, editora, quantidade de páginas e ano, com fechamento via teclado (`ESC`) e clique externo.
- [x] **Gerenciamento de Favoritos Reativo:** Adicione e remova títulos aos favoritos com persistência local no `localStorage`.
- [x] **Alternância de Tema (Dark / Light):** Tema escuro editorial de alto contraste e tema claro suave, com persistência da preferência do usuário.
- [x] **Feedback Visual & Estados de Loading:** Skeleton screens durante o carregamento da API, empty state amigável com botão de reset de filtros e notificações Toast para ações.
- [x] **Painel de Transparência Arquitetural:** Resumo dos 4 pilares técnicos exibido na própria página para consulta do avaliador.

---

## 🛠️ Tecnologias Utilizadas

- **Estrutura:** HTML5 Semântico, WAI-ARIA 1.2
- **Estilização:** CSS3 Moderno, CSS Grid, Flexbox, Custom Properties (Design Tokens), Glassmorphism sutil
- **Lógica e Dados:** JavaScript ES6+ (Modules, Async/Await, Fetch API, LocalStorage, Event Delegation)
- **Dados:** RESTful JSON Mock (`data/books.json`) com 12 obras clássicas de Engenharia e Ciência da Computação
- **Tipografia:** Google Fonts (*Plus Jakarta Sans* e *Newsreader*)

---

## 🚀 Como Executar o Projeto Localmente

Como a aplicação utiliza módulos ES6 nativos (`import`/`export`), recomenda-se executá-la através de um servidor local simples:

### Opção 1: Com Python (já nativo na maioria dos sistemas)
```bash
# Na pasta deste projeto:
cd "5 - Desenvolvimento Front-End"
python -m http.server 3000
```
Em seguida, abra o navegador em `http://localhost:3000`.

### Opção 2: Com Node.js / npx (live-server ou serve)
```bash
npx serve .
```

### Opção 3: Extensão Live Server do VS Code / Antigravity IDE
Clique com o botão direito sobre o arquivo `index.html` e selecione **"Open with Live Server"**.

---

## 📂 Estrutura de Diretórios Deste Módulo

```text
5 - Desenvolvimento Front-End/
│
├── index.html              # Página web principal semântica e acessível
├── README.md               # Guia deste projeto e visão geral
├── RESPOSTA_TECNICA.md      # Resposta teórica detalhada (Itens a, b, c, d e síntese)
│
├── data/
│   └── books.json          # Serviço mock REST com catálogo de livros em JSON
│
├── styles/
│   ├── tokens.css          # Design tokens (paleta dark/light, tipografia, espaçamento)
│   └── styles.css          # Folha de estilo completa, responsiva e acessível
│
└── scripts/
    ├── api.js              # Camada assíncrona de consumo da API RESTful com cache
    └── app.js              # Controlador reativo da interface e manipulação do DOM
```
