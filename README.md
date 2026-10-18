# Fono Ana Luíza David — site

Site da **Dra. Ana Luíza Martins David**, fonoaudióloga em Cuiabá-MT, especialista em avaliação e treinamento do processamento auditivo (Método ACC).

Reconstrução do site [fonoanaluizadavid.com.br](https://fonoanaluizadavid.com.br/) (antes em WordPress + Elementor) em **HTML, CSS e JavaScript puros**, sem dependências nem etapa de build, e com uma revisão de design.

## Preview

**https://guiooak.github.io/fonoanaluiza/**

| Página | Link |
|---|---|
| Início | https://guiooak.github.io/fonoanaluiza/ |
| Audiometria | https://guiooak.github.io/fonoanaluiza/audiometria/ |
| Imitanciometria | https://guiooak.github.io/fonoanaluiza/imitanciometria/ |
| Processamento Auditivo Central | https://guiooak.github.io/fonoanaluiza/processamento-auditivo-central/ |
| Style guide | https://guiooak.github.io/fonoanaluiza/styleguide.html |

O domínio oficial ainda aponta para o site antigo. Veja [Troca para o domínio próprio](#troca-para-o-domínio-próprio).

## Estrutura

```
index.html                         Página inicial
audiometria/index.html             Páginas de exames (uma pasta por URL)
imitanciometria/index.html
processamento-auditivo-central/index.html
404.html                           Página de erro
styleguide.html                    Style guide vivo (noindex)
STYLEGUIDE.md                      Regras do design system
assets/css/styles.css              Todo o CSS: tokens, layout e componentes
assets/js/main.js                  Menu, vídeos, FAQ, consentimento de cookies, políticas
assets/img/                        Imagens (WebP), ícones (sprite SVG) e cartão de compartilhamento
sitemap.xml, robots.txt            SEO
_redirects                         Redirecionamentos das URLs antigas (Netlify, se usado)
.github/workflows/deploy.yml       Deploy automático no GitHub Pages
```

## Rodar localmente

Na raiz do projeto:

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080/. Os caminhos são relativos, então o site funciona na raiz do domínio e também em subpasta (como no GitHub Pages).

## Design system

Antes de criar ou alterar qualquer página, leia o **[STYLEGUIDE.md](STYLEGUIDE.md)** e consulte o [style guide vivo](https://guiooak.github.io/fonoanaluiza/styleguide.html). O guia define cores, tipografia (Sora + Inter), escala de espaçamento, componentes, acessibilidade e convenções de código.

Pontos principais:

- Use apenas os tokens do `styles.css`. Nada de cores, espaçamentos ou raios escritos à mão.
- Header, rodapé, aviso de cookies e políticas são **idênticos em todas as páginas**. Ao alterar um deles, replique a mudança em todas.
- Site mobile-first, validado de 320px ao desktop.

## Publicação

Cada push na branch `main` publica o site automaticamente no GitHub Pages pelo workflow [`deploy.yml`](.github/workflows/deploy.yml). O deploy leva cerca de 1 minuto. Arquivos `.md`, `.claude/` e `_redirects` não são publicados.

Depois de um deploy, o navegador pode mostrar a versão anterior por alguns minutos por causa do cache. Recarregue com <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>.

## Privacidade e analytics

- O Google Tag Manager (GA4 + Google Ads) **só carrega após o aceite** no aviso de cookies e **só no domínio oficial**. No preview, nada é medido.
- A Política de Privacidade e a Política de Cookies abrem em janela pelos links `#politica-de-privacidade` e `#politica-de-cookies`.
- Os textos das políticas devem ser revisados juridicamente antes de o domínio oficial ser apontado para este site.

## Troca para o domínio próprio

1. Apontar o DNS de `fonoanaluizadavid.com.br` para o GitHub Pages, criar o arquivo `CNAME` e configurar o domínio em *Settings → Pages*.
2. Trocar `https://guiooak.github.io/fonoanaluiza` por `https://fonoanaluizadavid.com.br` em `og:url` e `og:image` de todas as páginas.
3. Atualizar o cache do cartão de compartilhamento no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

Detalhes na seção "Publicação" do [STYLEGUIDE.md](STYLEGUIDE.md).
