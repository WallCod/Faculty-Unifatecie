# 6 - Inteligência Artificial & Assistentes Virtuais (APA)

**Curso:** Bacharelado em Engenharia da Computação  
**Instituição:** Centro Universitário UniFatecie  
**Disciplina:** Inteligência Artificial Aplicada / Processamento de Linguagem Natural  
**Acadêmico:** Wallax Figueiredo  
**Projeto:** Assistente Virtual Inteligente "Alex" — Livraria & Editora Alexandria  

---

## 🎯 Sobre a Atividade Prática de Aprendizagem (APA)

Este diretório reúne a solução completa e aprofundada para a **Atividade Prática de Aprendizagem (APA)** de Inteligência Artificial, cujo objetivo é elaborar o plano inicial e funcional de um assistente virtual para atendimento ao cliente de uma pequena empresa, com técnicas fundamentais de **Processamento de Linguagem Natural (PLN)**.

A empresa modelo selecionada é a **Livraria & Editora Alexandria**, garantindo continuidade e coerência com o projeto de catálogo online desenvolvido no módulo anterior de Front-End.

---

## 📂 Estrutura de Arquivos e Entregáveis

| Arquivo | Descrição e Finalidade Acadêmica |
| :--- | :--- |
| **[`PLANO_ASSISTENTE_VIRTUAL.md`](./PLANO_ASSISTENTE_VIRTUAL.md)** | **Relatório Técnico Oficial da APA**: Resposta aprofundada aos 5 aspectos solicitados (Requisitos essenciais e interativos, Coleta e governança de dados, Pipeline de PLN e Fallback gracioso com exemplos, Persona e Arquitetura com diagramas Mermaid). |
| **[`FAQ_EMPRESA_MODELO.md`](./FAQ_EMPRESA_MODELO.md)** | **Documento FAQ Extenso (+3 Páginas)**: Base de conhecimento completa com mais de 2.300 palavras cobrindo dados institucionais, catálogo editorial, pagamentos, frete, logística reversa, trocas e LGPD. |
| **[`index.html`](./index.html)** | **Aplicação Web Interativa**: Interface de usuário moderna para demonstrar o ChatBOT Alex em funcionamento real no navegador. |
| **[`app.js`](./app.js)** | **Motor de PLN em JavaScript**: Implementação de normalização de texto, tokenização, remoção de stopwords em PT-BR, lematização/stemming heurístico, vetorização TF-IDF e cálculo de similaridade por cosseno. |
| **[`styles.css`](./styles.css)** | **Design System Responsivo**: Folha de estilos moderna com suporte a mobile, badges de similaridade em tempo real e timeline de pedidos. |

---

## 🧠 Destaques de Engenharia e Inteligência Artificial

1. **Pipeline Clássico de PLN sem Dependências Externas:**
   - Normalização léxica Unicode (`NFD`) com remoção de acentos e caracteres especiais.
   - Filtragem de *stop words* nativa da língua portuguesa.
   - Algoritmo de *stemming* heurístico para redução de radicais e desinências verbais/nominais.
   - Vetorização ponderada por **TF-IDF** (*Term Frequency - Inverse Document Frequency*).
   - Cálculo vetorial de proximidade via **Similaridade por Cosseno**.

2. **Funcionalidades Interativas Adicionais:**
   - 📦 **Rastreamento Transacional de Pedidos:** Digite um código de pedido (ex.: `PED-84920` ou `PED-10423`) e veja uma timeline de entrega em tempo real com status integrado ao ERP mock.
   - 📖 **Curadoria & Recomendação de Livros por Quiz:** Um fluxo interativo em que o assistente faz perguntas de preferência (área, nível e formato) e recomenda livros personalizados.

3. **Estratégia de Fallback em Três Níveis:**
   - $\text{Score} \ge 0.35$: Correspondência direta do FAQ com botões de feedback.
   - $0.20 \le \text{Score} < 0.35$: Sugestão contextual (*"Você quis dizer...?"*).
   - $\text{Score} < 0.20$: Fallback gracioso com opção de transbordo humano para o WhatsApp oficial e registro automático no log de dúvidas não resolvidas para curadoria quinzenal.

4. **Painel de Telemetria de PLN em Tempo Real:**
   - Clique em **"📊 Painel de PLN"** na barra superior da aplicação para visualizar a contagem de consultas, taxa de resolução direta, fallbacks gerados, similaridade média e o passo a passo exato do pipeline léxico da última frase digitada!

---

## 🚀 Como Executar o Protótipo Localmente

Você pode abrir diretamente o arquivo `index.html` em qualquer navegador moderno ou rodar um servidor HTTP local:

### Com Python 3:
```bash
cd "6 - Inteligência Artificial"
python -m http.server 8080
```
Acesse: [http://localhost:8080](http://localhost:8080)

### Com Node.js (`npx serve`):
```bash
cd "6 - Inteligência Artificial"
npx serve .
```

---

*Centro Universitário UniFatecie — Bacharelado em Engenharia da Computação*
