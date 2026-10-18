# Style guide — Fono Ana Luiza David

Regras para implementar e manter o site. A referência visual viva é [`styleguide.html`](styleguide.html) (rode um servidor local na raiz do projeto: `python3 -m http.server 8080` e abra `/styleguide.html`). Todo o CSS fica em [`assets/css/styles.css`](assets/css/styles.css).

> **Regra de ouro:** só tokens. Nenhuma cor em hex, nenhum `px` de espaçamento, nenhum `border-radius` ou `box-shadow` escritos à mão nas páginas. Se faltar algo, crie primeiro o token e o componente, depois documente aqui e no `styleguide.html`.

---

## 1. Princípios

1. **Acolhedor, não infantil.** Falamos com mães preocupadas e com adultos. Usamos tons quentes e fotos reais, sem cores gritantes, sem ilustrações infantis e sem caixa alta para gritar.
2. **Clareza clínica.** Cada bloco carrega uma ideia, com hierarquia evidente e texto fácil de escanear.
3. **Consistência rígida.** Há um botão primário, um card e um jeito de fazer cada coisa.

## 2. Cores

| Papel | Token | Uso |
|---|---|---|
| Marca | `--navy-800` `#172340` | seções escuras, bloco CTA, marca |
| Fundo da página | `--sand-50` `#FBF9F6` | `body` |
| Seção alternada / tom claro | `--sand-100` `#F0E9DE` | `.section--alt`, pastilhas, painéis, hovers claros |
| Superfície | `--sand-0` `#FFF` | cards, submenu |
| Borda | `--sand-200` `#E9E3D9` | `--border` |
| Títulos | `--ink-900` `#161D31` | |
| Corpo | `--ink-700` `#3C4459` | |
| Apoio | `--ink-500` `#5F677A` | legendas, notas |
| Ação | `--green-600` `#1E6E4E` (esmeralda) / hover `--green-700` `#175A3F` | **somente** botões de agendamento e check da `.checklist` |
| Acento | `--mist-500` `#46698F` | eyebrow, ícones de contato (único tom frio fora do navy) |
| Atenção | `--amber-500` `#A26A12` / `--amber-100` | `.callout--warm` (avisos neutros, nunca alarmistas) |
| Faixa | `--navy-900` | `.strip` |
| Rodapé | `--navy-950` | `.site-footer` |

- Use os **papéis semânticos** (`--color-heading`, `--color-text`, `--color-muted`, `--color-border`, `--color-surface`, `--color-accent`) nos componentes. Assim, `.section--dark` e `.theme-dark` invertem tudo sozinhos.
- O esmeralda fica reservado a ações. Não o use em títulos, ícones decorativos ou fundos (a exceção são os ícones de check da `.checklist`, que usam verde para sinalizar benefício).
- **Em fundo navy** (`.section--dark`, `.theme-dark`, `.cta-block`) o botão primário vira **creme com texto navy**, automaticamente. Verde sobre navy tem só 2.5:1 de separação.
- **Uma só família de tons claros: sand.** Não existem tons claros frios (azul-gelo, navy-50). Pastilhas, painéis do recorte, hovers e fundos de mídia usam `--sand-100`; bordas e seleção usam `--sand-200`.
- **Hierarquia de superfícies:** fundo `sand-50` → seção alternada `sand-100` → card `sand-0` (branco). O card sempre se apoia em borda + sombra; nunca coloque card branco direto em fundo branco.
- Foco: `--color-focus` = `navy-600` (8.3:1) em fundo claro e `#9FB8D6` em fundo navy.
- O `#25D366` do WhatsApp aparece apenas no botão flutuante.
- Duas seções navy nunca ficam seguidas. A sequência típica é sand-50 → sand-100 → navy → sand-50.
- O contraste mínimo é AA: texto normal 4.5:1 e texto grande 3:1. Sobre navy, use `--navy-100` ou branco, nunca cinza médio.

## 3. Tipografia

- **Sora** (300–600): títulos H1–H4, números (`.stat__value`, passos) e citação. **H1 e H2 em peso 500** (refinado em tamanho grande); H3, H4 e títulos de card em 600.
- **Inter** (400–600): texto, botões, navegação e eyebrow.
- Carregadas via Google Fonts com `display=swap`.

| Nível | Token | Tamanho (360→1280px) | Uso |
|---|---|---|---|
| H1 | `--step-5` | 38→60 | **um por página**, no hero |
| H2 | `--step-4` | 32→46 | título de seção |
| H3 | `--step-2` | 21→26 | subtítulo dentro da seção |
| H4 / `.card__title` / `.step__title` | `--step-1` | 18→21 | título de card, passo, item |
| `.lead` | `--step-1` | 18→21 | parágrafo de abertura, logo após o título |
| corpo | `--step-0` | 16→17 | texto corrido |
| `.small` / `.eyebrow` / nav | `--step--1` | 13→14 | apoio, rótulos |

**Regras**
- Usamos caixa de frase em títulos e botões ("Agendar consulta", nunca "AGENDAR CONSULTA"). A caixa alta só aparece no `.eyebrow` e nos títulos do rodapé, que já vêm assim pelo CSS.
- Um parágrafo nunca vira heading. No site antigo todo texto era `<h2>`; aqui heading é só título.
- A largura de leitura fica em ~68ch (`.prose` ou `.container--narrow`).
- Destaques no meio do texto usam `<strong>` (peso 600 na cor de título). Itálico e sublinhado ficam fora, exceto em links.

## 4. Espaçamento

Escala com base de 4px, sem nenhum outro valor:

`--space-1` 4 · `--space-2` 8 · `--space-3` 12 · `--space-4` 16 · `--space-6` 24 · `--space-8` 32 · `--space-12` 48 · `--space-16` 64 · `--space-24` 96 · `--space-32` 128

Tokens de layout:
- `--section-y`: padding vertical de **toda** seção (64→128px). Use `.section`, e `.section--tight` só em faixas curtas.
- `--gutter`: margem lateral (16→32px), já embutida no `.container`.
- `--container`: 1200px; `--container-narrow`: ~752px.

**Ritmo vertical (sempre igual)**

| Relação | Valor |
|---|---|
| eyebrow → título → lead | `space-4` (+`space-2` antes do lead) — `.section-head` |
| cabeçalho de seção → conteúdo | `space-12` — `.section-head` |
| parágrafo → parágrafo | `space-4` — `.flow` |
| bloco de texto → subtítulo H3 | `space-8` — `.flow` |
| conteúdo → CTA | `space-8` |
| CTA → nota (`.cta-note`) | `space-3` |
| entre cards / colunas | `space-6` — `.grid` |
| mídia ↔ texto lado a lado | `space-16` — `.split` |
| padding interno de card | `space-8` |
| entre seções | `--section-y` (nunca margem solta) |

Para espaçar irmãos, prefira `gap` (grid/flex) e `.flow`. Não use `margin-top` avulso, exceto pelos utilitários `.mt-*`.

## 5. Forma

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8px | itens de submenu, skip link |
| `--radius-md` | 16px | pastilha de ícone, callout, faixa destacada |
| `--radius-lg` | 24px | cards, fotos, vídeos, mapa, bloco CTA |
| `--radius-pill` | 999px | botões, links da nav, redes sociais |
| `--shadow-sm` | — | card em repouso |
| `--shadow-md` | — | hover (card interativo, botão) |
| `--shadow-lg` | — | flutuantes (submenu, WhatsApp, play) |
| `--border` | 1px sand-200 | cards, FAQ, divisórias |

As sombras são tingidas de navy. Nunca use preto puro.

## 6. Ícones

- O sprite fica em `assets/img/icons.svg` (inclui `star`, preenchido, para avaliações), com traço de 1.75px, 24×24 e `currentColor`.
- Uso: `<svg class="icon" aria-hidden="true"><use href="/assets/img/icons.svg#nome"/></svg>`.
- Ícone decorativo leva `aria-hidden="true"`. Botão só com ícone leva `aria-label`.
- Ícone de destaque fica dentro de `.icon-badge` (pastilha 48px sand-100, ícone navy).
- Os ícones substituem os PNGs antigos: relógio → `clock`, cartão → `credit-card`, selo → `shield-check`, calendário → `calendar`, alerta 3D → `.stat` ou `.callout`.
- Para ícone novo, use o estilo Lucide (lucide.dev) e copie o `<path>` para um novo `<symbol>`.

## 7. Componentes

### Botões
- `.btn`: primário esmeralda (creme em fundo navy), rótulo **"Agendar consulta"**. Ele substitui "AGENDAR CONSULTA PARTICULAR COM A ESPECIALISTA".
- `.btn--lg`: hero e CTA de fechamento. `.btn--sm`: header. `.btn--block`: menu mobile.
- `.btn--secondary`: contorno `#7A8399` (≥3:1 contra o fundo), ação alternativa ("Conhecer o Método ACC"). Fica no máximo um por grupo e sempre ao lado de um primário.
- `.link-arrow`: navegação para outra página ou seção ("Saiba mais →").
- Use o ícone do WhatsApp **só** em botões que abrem o WhatsApp.
- Todo CTA de agendamento aponta para `https://wa.me/5565998682998` e leva `data-cta="<local>"` para o rastreamento.
- **Todo link de WhatsApp abre em nova aba:** `target="_blank" rel="noopener"` (CTAs, botão flutuante, contato, redes e rodapé).
- **No máximo 1 CTA por seção.** A home tem o CTA do header, o botão flutuante e de 4 a 5 CTAs no corpo (hero, depois dos sintomas, depois dos depoimentos, depois dos passos e no fechamento).

### Card (`.card`)
- Estrutura: `.icon-badge` (opcional), depois `h3.card__title`, depois `p.card__text`, depois `.link-arrow` (opcional).
- `.card--interactive` vale para cards que são link (exames), com elevação no hover.
- `.card--flat` vale para cards informativos em grade (diferenciais), sem sombra.
- Use em `.grid--2`, `.grid--3` ou `.grid--4` — o número é o **máximo** de colunas (1 no mobile, 2 a partir de 640px, 3/4 a partir de 896/1024px). Nunca misture tamanhos de card na mesma grade.

### Listas
- `.checklist`: indicações ("Quando esse exame é indicado?") e benefícios ("O que o Método ACC faz?").
- `.def-list` (`<dl>`): termo + explicação (Audiometria Tonal/Vocal, "O que o exame revela?").

### Destaques
- `.strip`: faixa logo abaixo do hero com informações de atendimento; cada item é um `.strip__item` (ícone + texto na mesma linha).
- `.stat`: dado de impacto (20% / ASHA), sempre em seção navy, um por página.
- `.callout`: observação importante dentro do texto — fundo branco, borda sand-200, ícone navy. `.callout--warm` (âmbar) serve para avisos práticos.
- `.quote`: frase de efeito da Dra., uma por seção.

### Passos (`.steps` > `.step`)
- Usa `<ol>` com numeração automática (01, 02…). Não escreva o número no HTML.
- Estrutura: `.step__body`, depois `h3.step__title`, depois `p`.
- Fica em `.container--narrow`.

### Mídia
- `.media` + `--portrait` (4:5) / `--square` / `--wide` (16:9) para fotos com fundo.
- `.cutout` serve para retrato recortado (PNG/WebP com transparência) sobre um painel sand-100 → sand-200 (navy em seção escura).
- Imagens: WebP com `srcset` (640w + 960–1200w), `width`/`height` sempre preenchidos e `loading="lazy"` em tudo que estiver abaixo da dobra.
- `alt` descritivo em fotos de conteúdo. Imagem decorativa leva `alt=""`.

### Vídeo (`.video`)
- `<button class="video" data-vimeo="ID" data-hash="HASH" aria-label="Assistir…">` com miniatura `<img>` e `.video__play`.
- O iframe do Vimeo só carrega no clique (o JS troca o botão pelo player).
- Use `.video--vertical` (9:16) nos depoimentos e o padrão (16:9) nos institucionais.

### Depoimento (`.testimonial`)
- Estrutura: vídeo **ou** `.testimonial__quote` (texto, mesma proporção 9:16), depois `h3.testimonial__title` com o problema, depois `p.testimonial__text` com o resultado, depois `.testimonial__name` ("Rafaela, 10 anos").
- Agrupe dentro de `.rail` (trilho com scroll horizontal no mobile e grade no desktop; ajuste `--rail-cols`).

### Avaliações (`.reviews` > `.card.review`)
- `<figure class="card review">` com `.review__stars` (5× `#star`, `role="img"` + `aria-label`), `blockquote.review__text` e `figcaption.review__author` (nome em `<strong>` + "Avaliação no Google · `<time>`").
- **Texto literal**: citações de pacientes não são corrigidas (nem ortografia, nem pontuação). Só o nome pode ter a capitalização ajustada.
- Mobile: trilho com scroll horizontal, cards de mesma altura. ≥768px: 2 colunas masonry; ≥1024px: 3 colunas.

### Depoimento largo (`.testimonial--wide`)
- Depoimento só em texto (sem vídeo), fora do `.rail`, logo abaixo dele. No desktop a citação fica à esquerda e o resumo à direita.

### FAQ (`.faq`)
- `<details><summary>Pergunta</summary><div class="faq__answer">…</div></details>`.
- Não exige JS. Só a primeira pergunta pode vir aberta (`open`), e só quando fizer sentido.

### Contato
- `.contact-list` mostra ícone + texto (endereço, horário, WhatsApp, e-mail).
- `.social` traz botões circulares (Instagram e WhatsApp). Não há Facebook enquanto não existir URL.
- `.map` tem proporção 4:3 e usa `<iframe loading="lazy" title="…">`.

### Header / navegação
- Header sticky com blur. Ganha borda ao rolar (`.is-scrolled`, via JS).
- A marca (`.brand`) combina o ícone do logo com o nome em Sora e "Fonoaudióloga" em Inter caixa alta.
- Menu desktop: Início · Exames (dropdown) · Método ACC · Sobre · Localização, mais `.btn--sm`.
- Abaixo de 1024px vira hambúrguer com painel em tela cheia (`.mobile-nav`), onde "Exames" é rótulo de grupo (`.mobile-nav__label`), não link.
- Marque a página atual com `aria-current="page"` no link.

### Rodapé
- Três colunas: marca (`.brand.brand--light`, mesma composição do header) + descrição · Exames · Contato + redes. Embaixo ficam razão social, CNPJ e ano (`data-year`).

### WhatsApp flutuante (`.wa-float`)
- Aparece em todas as páginas, com `aria-label` e `data-cta="flutuante"`.

## 8. Estrutura das páginas

**Home:** hero (`h1`) → `.strip` → vídeo + Método ACC → `.stat` (navy) → sintomas (`.grid` de `.card`) → depoimentos (navy, `.rail`) → ACC Conecta (`.split`) → o que o ACC faz (`.checklist`) → passos (`.steps`) → diferenciais (`.grid--3` de `.card--flat`) → avaliações do Google (`.reviews`) → sobre a Dra. (`#sobre`, `.split` + `.cutout`) → FAQ → localização (`#localizacao`) → `.cta-block` → rodapé.

**Páginas de exame** (mesmo template): hero (`h1` = nome do exame + pergunta) → indicações (`.checklist`) → por que é importante → como é feito (`.def-list` ou passos) → o que o exame revela (`.def-list`) → `.callout` de fechamento + CTA → outros exames (`.grid--3` de `.card--interactive`) → bio curta da Dra. com link para `/#sobre` → rodapé.

## 9. Convenções de código

- **Classes:** BEM leve (`.bloco`, `.bloco__elemento`, `.bloco--variante`). Estado com `.is-*` (`.is-open`, `.is-visible`) ou atributos ARIA.
- **Layout:** os utilitários disponíveis são `.container`, `.section`, `.grid`, `.split`, `.stack`, `.cluster` e `.flow`. Não crie wrappers ad hoc.
- **Estilo inline:** só para ajustar uma custom property de componente (`style="--rail-cols:3"`).
- **Caminhos:** absolutos a partir da raiz (`/assets/...`), porque as páginas ficam em subpastas (`/audiometria/index.html`).
- **JS:** `assets/js/main.js`, sem dependências e com `defer`. O `<html>` recebe a classe `js` por um script inline no `<head>`, o que ativa as animações de entrada.
- **Animação:** `data-reveal` em blocos principais (no máximo 2 ou 3 por seção). Respeita `prefers-reduced-motion`.

## 10. Acessibilidade

- Cada página tem um `<h1>` e uma hierarquia sem pular níveis.
- O skip link "Pular para o conteúdo" é o primeiro elemento do `<body>`.
- O foco fica sempre visível (`:focus-visible` com contorno de 2px em `--color-focus`). Não remova `outline`.
- A área de toque mínima é 44px (botões, ícones sociais, toggle do menu).
- Dropdown e menu mobile usam `aria-expanded`/`aria-controls` e fecham com `Esc`.
- Vídeos têm `aria-label` descritivo e iframes têm `title`.
- O idioma é `lang="pt-BR"`.

## 11. Tom de voz e texto

- O conteúdo do site antigo é mantido integralmente. Só corrigimos erros evidentes (crase, aspas soltas, contagem "6 passos" com 5 listados, grafia do nome).
- O nome padrão é **Dra. Ana Luíza Martins David**. A marca gráfica (logo) segue "Ana Luiza".
- O telefone é exibido como **(65) 99868-2998**.
- Fala em segunda pessoa ("você", "seu filho"), em tom próximo e empático, sem promessas absolutas além das que já constam no conteúdo original.
