#!/usr/bin/env python3
"""
Gerador de Slides Acadêmicos de Defesa de IA - UniFatecie / AlphaLabs
Engenharia da Computação - Módulo 6: Inteligência Artificial (APA Alex)
Gera lâminas acadêmicas vetoriais 16:9 em SVG compatíveis com DrawingML OpenXML e LaTeX OMML.
Baseado na tecnologia do PPT Master.
100% Python Standard Library (zero dependências externas).
"""

import os
import sys

EMU_PER_PIXEL = 9525
CANVAS_WIDTH = 1920
CANVAS_HEIGHT = 1080
EMU_WIDTH = CANVAS_WIDTH * EMU_PER_PIXEL
EMU_HEIGHT = CANVAS_HEIGHT * EMU_PER_PIXEL


def gerar_slide_capa(titulo: str, subtitulo: str, autor: str) -> str:
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}"
     data-pptx-emu-w="{EMU_WIDTH}" data-pptx-emu-h="{EMU_HEIGHT}" data-pptx-style="academic-research">
  <defs>
    <linearGradient id="acad-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0e17" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
  </defs>

  <!-- Fundo com grid sutil -->
  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="url(#acad-bg)" />
  <g stroke="#334155" stroke-width="1" opacity="0.2">
    <line x1="120" y1="0" x2="120" y2="1080" />
    <line x1="1800" y1="0" x2="1800" y2="1080" />
    <line x1="0" y1="140" x2="1920" y2="140" />
    <line x1="0" y1="940" x2="1920" y2="940" />
  </g>

  <!-- Brasão / Topo Institucional -->
  <g id="!shape-inst-header">
    <text x="120" y="90" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">CENTRO UNIVERSITÁRIO UNIFATECIE // ENGENHARIA DA COMPUTAÇÃO</text>
    <text x="120" y="118" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="600">DISCIPLINA: INTELIGÊNCIA ARTIFICIAL • TRABALHO DE CONCLUSÃO DE MÓDULO</text>
  </g>

  <!-- Título Principal & Subtítulo -->
  <g id="!shape-main-title">
    <rect x="120" y="320" width="12" height="180" fill="#38bdf8" rx="4" />
    <text x="160" y="380" fill="#f8fafc" font-family="'Georgia', serif" font-size="52" font-weight="800">{titulo}</text>
    <text x="160" y="440" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="600">{subtitulo}</text>
    <text x="160" y="490" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="20">Arquitetura de RAG, Orquestração de Agentes, LLM e Pipeline de Inferência Local</text>
  </g>

  <!-- Identificação do Acadêmico -->
  <g id="!shape-author-card">
    <rect x="120" y="700" width="600" height="140" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <text x="150" y="740" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="700">ACADÊMICO RESPONSÁVEL:</text>
    <text x="150" y="775" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="800">{autor}</text>
    <text x="150" y="810" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="15">Graduando em Engenharia da Computação • 2026</text>
  </g>

  <!-- Rodapé -->
  <g id="!shape-footer">
    <text x="120" y="990" fill="#64748b" font-family="'Segoe UI', Arial, sans-serif" font-size="14">UniFatecie • Polo Paranavaí / Tecnologias AlphaLabs</text>
    <text x="1800" y="990" fill="#64748b" font-family="'Segoe UI', Arial, sans-serif" font-size="14" text-anchor="end">Slide 1/3 • DrawingML 16:9 Nativo</text>
  </g>
</svg>"""


def gerar_slide_arquitetura() -> str:
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}"
     data-pptx-emu-w="{EMU_WIDTH}" data-pptx-emu-h="{EMU_HEIGHT}" data-pptx-style="technical-deepdive">
  <defs>
    <linearGradient id="arch-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>

  <rect width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" fill="url(#arch-bg)" />

  <!-- Cabeçalho -->
  <g id="!shape-header">
    <text x="120" y="80" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="2">UNIFATECIE // ENGENHARIA DA COMPUTAÇÃO • ARQUITETURA DE SOFTWARE</text>
    <text x="120" y="125" fill="#f8fafc" font-family="'Georgia', serif" font-size="38" font-weight="800">Arquitetura em Camadas do Assistente Virtual Inteligente</text>
    <line x1="120" y1="150" x2="1800" y2="150" stroke="#334155" stroke-width="1.5" />
  </g>

  <!-- 4 Camadas de Arquitetura (Pipeline) -->
  <!-- Camada 1: Apresentação -->
  <g id="!shape-layer-1" data-pptx-shape="roundRect">
    <rect x="120" y="220" width="360" height="520" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
    <rect x="120" y="220" width="360" height="45" rx="10" fill="#38bdf8" opacity="0.2" />
    <text x="145" y="250" fill="#38bdf8" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="800">1. APRESENTAÇÃO (UI)</text>
    
    <text x="145" y="310" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Interface Web SPA</text>
    <text x="145" y="340" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">HTML5 Semântico, CSS Grid</text>

    <text x="145" y="390" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Entrada de Mensagens</text>
    <text x="145" y="420" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Digitação fluida e atalhos rápidos</text>

    <text x="145" y="470" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• A2UI Response Cards</text>
    <text x="145" y="500" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Widgets interativos declarativos</text>
  </g>

  <!-- Camada 2: NLP & Tokenização -->
  <g id="!shape-layer-2" data-pptx-shape="roundRect">
    <rect x="540" y="220" width="360" height="520" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2" />
    <rect x="540" y="220" width="360" height="45" rx="10" fill="#10b981" opacity="0.2" />
    <text x="565" y="250" fill="#10b981" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="800">2. PROCESSAMENTO (NLP)</text>

    <text x="565" y="310" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Sanitização de Entrada</text>
    <text x="565" y="340" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Remoção de injeções de prompt</text>

    <text x="565" y="390" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Classificador de Intenção</text>
    <text x="565" y="420" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Roteamento para FAQ ou Tools</text>

    <text x="565" y="470" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Tokenizador Byte-Pair</text>
    <text x="565" y="500" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Controle de janela de contexto</text>
  </g>

  <!-- Camada 3: Base de Conhecimento RAG -->
  <g id="!shape-layer-3" data-pptx-shape="roundRect">
    <rect x="960" y="220" width="360" height="520" rx="10" fill="#1e293b" stroke="#a855f7" stroke-width="2" />
    <rect x="960" y="220" width="360" height="45" rx="10" fill="#a855f7" opacity="0.2" />
    <text x="985" y="250" fill="#a855f7" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="800">3. RECUPERAÇÃO (RAG)</text>

    <text x="985" y="310" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Base Vetorial em Memória</text>
    <text x="985" y="340" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Similaridade de Cosseno (TF-IDF)</text>

    <text x="985" y="390" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Dicionário da Empresa</text>
    <text x="985" y="420" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">FAQ corporativo indexado</text>

    <text x="985" y="470" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Re-ranking Semântico</text>
    <text x="985" y="500" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Filtragem de ruído contextual</text>
  </g>

  <!-- Camada 4: Motor de Inferência LLM -->
  <g id="!shape-layer-4" data-pptx-shape="roundRect">
    <rect x="1380" y="220" width="360" height="520" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
    <rect x="1380" y="220" width="360" height="45" rx="10" fill="#f59e0b" opacity="0.2" />
    <text x="1405" y="250" fill="#f59e0b" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="800">4. INFERÊNCIA &amp; OUTPUT</text>

    <text x="1405" y="310" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Modelo Soberano / Local</text>
    <text x="1405" y="340" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Ollama / LitServe stdlib zero-deps</text>

    <text x="1405" y="390" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Streaming Assíncrono</text>
    <text x="1405" y="420" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">Entrega em tempo real (&lt;100ms)</text>

    <text x="1405" y="470" fill="#f8fafc" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700">• Formatação Estruturada</text>
    <text x="1405" y="500" fill="#94a3b8" font-family="'Segoe UI', Arial, sans-serif" font-size="14">JSON Schema validado sem eval()</text>
  </g>

  <!-- Rodapé -->
  <g id="!shape-footer">
    <text x="120" y="990" fill="#64748b" font-family="'Segoe UI', Arial, sans-serif" font-size="14">UniFatecie • Engenharia da Computação // Arquitetura de Software</text>
    <text x="1800" y="990" fill="#64748b" font-family="'Segoe UI', Arial, sans-serif" font-size="14" text-anchor="end">Slide 2/3 • DrawingML 16:9 Nativo</text>
  </g>
</svg>"""


def main():
    saida_dir = os.path.dirname(os.path.abspath(__file__))
    slide1_path = os.path.join(saida_dir, "slide_01_capa_ia.svg")
    slide2_path = os.path.join(saida_dir, "slide_02_arquitetura_ia.svg")

    with open(slide1_path, "w", encoding="utf-8") as f:
        f.write(gerar_slide_capa(
            titulo="ASSISTENTE VIRTUAL INTELIGENTE (APA ALEX)",
            subtitulo="Projeto de Inteligência Artificial e Processamento de Linguagem Natural",
            autor="Wallax Figueiredo",
        ))

    with open(slide2_path, "w", encoding="utf-8") as f:
        f.write(gerar_slide_arquitetura())

    print(f"✅ Slide 1 gerado: {slide1_path}")
    print(f"✅ Slide 2 gerado: {slide2_path}")


if __name__ == "__main__":
    main()
