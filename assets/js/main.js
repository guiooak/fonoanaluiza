/* Fono Ana Luiza David — comportamento do site (sem dependências) */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");

  /* Header: borda ao rolar ------------------------------------------------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Dropdown "Exames" ------------------------------------------------------ */
  document.querySelectorAll(".nav__item--has-menu").forEach(function (item) {
    var trigger = item.querySelector("[aria-expanded]");
    var setOpen = function (open) {
      item.dataset.open = String(open);
      trigger.setAttribute("aria-expanded", String(open));
    };
    trigger.addEventListener("click", function () {
      setOpen(trigger.getAttribute("aria-expanded") !== "true");
    });
    item.addEventListener("mouseenter", function () { setOpen(true); });
    item.addEventListener("mouseleave", function () { setOpen(false); });
    item.addEventListener("focusout", function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && item.dataset.open === "true") {
        setOpen(false);
        trigger.focus();
      }
    });
  });

  /* Menu mobile ------------------------------------------------------------ */
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      mobileNav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 64rem)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* Vídeo Vimeo sob demanda: <button class="video" data-vimeo="ID" data-hash="h"> */
  document.querySelectorAll(".video[data-vimeo]").forEach(function (el) {
    el.addEventListener("click", function () {
      var src = "https://player.vimeo.com/video/" + el.dataset.vimeo +
        "?autoplay=1&title=0&byline=0&portrait=0&dnt=1" +
        (el.dataset.hash ? "&h=" + el.dataset.hash : "");
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = el.getAttribute("aria-label") || "Vídeo";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      var wrapper = document.createElement("div");
      wrapper.className = el.className;
      wrapper.style.cssText = el.style.cssText;
      wrapper.appendChild(iframe);
      el.replaceWith(wrapper);
      track("video_play", { video_id: el.dataset.vimeo });
    }, { once: true });
  });

  /* FAQ: accordion exclusivo com animação de altura ------------------------
     Sem JS, o atributo name="faq" dos <details> já garante um aberto por vez. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var DURATION = 320;

  document.querySelectorAll(".faq").forEach(function (group) {
    var items = [];

    group.querySelectorAll("details").forEach(function (details) {
      var summary = details.querySelector("summary");
      var content = details.querySelector(".faq__answer");
      if (!summary || !content || !content.animate) return;

      /* O JS assume a exclusividade: com name="" o navegador fecharia os outros sem animar */
      details.removeAttribute("name");

      var animation = null;
      var fallback = null;

      var run = function (from, to, onDone) {
        if (animation) { animation.onfinish = null; animation.cancel(); }
        clearTimeout(fallback);
        var done = function () {
          clearTimeout(fallback);
          if (animation) { animation.onfinish = null; animation = null; }
          if (onDone) onDone();
        };
        if (reduceMotion.matches) { done(); return; }
        animation = content.animate(
          { height: [from + "px", to + "px"], opacity: [from ? 1 : 0, to ? 1 : 0] },
          { duration: DURATION, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
        animation.onfinish = done;
        /* Em aba de segundo plano a animação pode não avançar: garante o estado final */
        fallback = setTimeout(function () {
          if (animation) animation.cancel();
          done();
        }, DURATION + 120);
      };

      var isOpen = function () {
        return details.open && !details.classList.contains("is-closing");
      };

      var open = function () {
        var closing = details.classList.contains("is-closing");
        var from = closing ? content.getBoundingClientRect().height : 0;
        details.classList.remove("is-closing");
        details.open = true;
        summary.setAttribute("aria-expanded", "true");
        run(from, content.scrollHeight);
      };

      var close = function () {
        if (!isOpen()) return;
        details.classList.add("is-closing");
        summary.setAttribute("aria-expanded", "false");
        run(content.getBoundingClientRect().height, 0, function () {
          details.open = false;
          details.classList.remove("is-closing");
        });
      };

      summary.setAttribute("aria-expanded", String(details.open));
      items.push({ details: details, close: close });

      summary.addEventListener("click", function (e) {
        e.preventDefault();
        if (isOpen()) {
          close();
        } else {
          items.forEach(function (item) {
            if (item.details !== details) item.close();
          });
          open();
        }
      });
    });
  });

  /* Animação de entrada ---------------------------------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Rastreamento de cliques no WhatsApp (GTM dataLayer) -------------------- */
  function track(event, data) {
    window.dataLayer = window.dataLayer || [];
    var payload = { event: event };
    for (var k in data) payload[k] = data[k];
    window.dataLayer.push(payload);
  }
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;
    var section = link.closest("[id]");
    track("whatsapp_click", {
      cta_location: link.dataset.cta || (section ? section.id : "page")
    });
  });

  /* Contagem numérica na primeira aparição: <x data-count-to="20" data-count-suffix="%">20%</x>
     O HTML já traz o valor final (sem JS, buscadores e leitores de tela veem "20%"). */
  var counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion.matches) {
    var COUNT_DURATION = 1600;
    var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

    var runCount = function (el) {
      var target = parseFloat(el.dataset.countTo);
      var suffix = el.dataset.countSuffix || "";
      var start = null;
      var finish = function () { el.textContent = target + suffix; };
      el.setAttribute("aria-label", target + suffix); /* leitores de tela leem só o valor final */
      el.style.minWidth = el.getBoundingClientRect().width + "px"; /* evita o texto mudar de largura */
      var step = function (now) {
        if (start === null) start = now;
        var t = Math.min((now - start) / COUNT_DURATION, 1);
        el.textContent = Math.round(easeOut(t) * target) + suffix;
        if (t < 1) requestAnimationFrame(step); else finish();
      };
      el.textContent = "0" + suffix;
      requestAnimationFrame(step);
      /* garante o valor final mesmo se a aba for para segundo plano no meio da contagem */
      setTimeout(finish, COUNT_DURATION + 400);
    };

    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target); /* só na primeira aparição */
        runCount(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* Mapa sob demanda: <button data-map-src="..."> troca o cartão pelo iframe */
  document.querySelectorAll("[data-map-src]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var map = btn.closest(".map");
      var iframe = document.createElement("iframe");
      iframe.src = btn.dataset.mapSrc;
      iframe.title = btn.dataset.mapTitle || "Mapa";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      map.innerHTML = "";
      map.appendChild(iframe);
    }, { once: true });
  });

  /* Consentimento de cookies (LGPD) -----------------------------------------
     Nada de GTM (GA4 + Google Ads) antes do "Aceitar". A escolha fica no
     localStorage; mude CONSENT_VERSION para pedir o consentimento de novo. */
  var CONSENT_KEY = "consent";
  var CONSENT_VERSION = 1;
  var CONSENT_DELAY = 10000; /* aviso aparece 10s depois, se ainda não houver escolha */
  var GTM_ID = "GTM-5R4L6XV5";
  var GTM_HOSTS = /(^|\.)fonoanaluizadavid\.com\.br$/; /* só mede no domínio oficial */

  var banner = document.querySelector("[data-consent-banner]");
  var gtmLoaded = false;
  var decided = false;

  function readConsent() {
    try {
      var c = JSON.parse(localStorage.getItem(CONSENT_KEY));
      if (c && c.v === CONSENT_VERSION && typeof c.analytics === "boolean") return c;
    } catch (e) { /* sem acesso ao storage: trata como sem escolha */ }
    return null;
  }

  function saveConsent(accepted) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: accepted, at: new Date().toISOString() }));
    } catch (e) { /* segue sem persistir */ }
  }

  function gtmAllowedHost() {
    var hosts = document.documentElement.dataset.gtmHosts;
    return hosts ? new RegExp(hosts).test(location.hostname) : GTM_HOSTS.test(location.hostname);
  }

  function loadGTM() {
    if (gtmLoaded || !gtmAllowedHost()) return;
    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted"
    });
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(s);
  }

  function clearTrackingCookies() {
    var names = document.cookie.split(";").map(function (c) { return c.split("=")[0].trim(); })
      .filter(function (n) { return /^(_ga|_gid|_gat|_gcl|_gac)/.test(n); });
    var parts = location.hostname.split(".");
    names.forEach(function (n) {
      document.cookie = n + "=; Max-Age=0; path=/";
      for (var i = 0; i < parts.length - 1; i++) {
        document.cookie = n + "=; Max-Age=0; path=/; domain=." + parts.slice(i).join(".");
      }
    });
  }

  function showBanner() {
    if (!banner) return;
    banner.hidden = false;
    document.documentElement.classList.add("consent-open");
  }

  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    document.documentElement.classList.remove("consent-open");
  }

  if (banner) {
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-consent]");
      if (!btn) return;
      var accepted = btn.dataset.consent === "accept";
      decided = true;
      saveConsent(accepted);
      hideBanner();
      if (accepted) {
        loadGTM();
      } else {
        clearTrackingCookies();
        if (gtmLoaded) location.reload(); /* descarrega o GTM que já estava ativo */
      }
    });
  }

  var stored = readConsent();
  if (stored) {
    if (stored.analytics) loadGTM();
  } else {
    setTimeout(function () { if (!decided) showBanner(); }, CONSENT_DELAY);
  }

  /* Janelas das políticas: links #politica-... abrem o <dialog> correspondente.
     A limpeza (hash e trava de rolagem) roda em cada forma de fechar, sem depender
     só do evento "close", que nem todo navegador dispara de forma confiável. */
  var modals = document.querySelectorAll(".policy-modal");

  function afterPolicyClose(dialog) {
    var anyOpen = Array.prototype.some.call(modals, function (m) { return m.open; });
    if (!anyOpen) document.documentElement.classList.remove("modal-open");
    if (location.hash === "#" + dialog.id) history.replaceState(null, "", location.pathname + location.search);
  }

  function closePolicy(dialog) {
    if (dialog.open) dialog.close();
    afterPolicyClose(dialog);
  }

  function openPolicy(id) {
    var dialog = document.getElementById(id);
    if (!dialog || !dialog.classList.contains("policy-modal") || typeof dialog.showModal !== "function") return false;
    modals.forEach(function (m) { if (m !== dialog && m.open) closePolicy(m); });
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("modal-open");
    var body = dialog.querySelector(".policy-modal__body");
    if (body) body.scrollTop = 0;
    if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    return true;
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href*="#politica-"]');
    if (!link) return;
    var id = link.getAttribute("href").split("#")[1];
    if (openPolicy(id)) e.preventDefault();
  });

  modals.forEach(function (dialog) {
    var close = dialog.querySelector(".policy-modal__close");
    if (close) close.addEventListener("click", function () { closePolicy(dialog); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closePolicy(dialog); }); /* clique no fundo */
    dialog.addEventListener("cancel", function () { setTimeout(function () { afterPolicyClose(dialog); }, 0); }); /* Esc */
    dialog.addEventListener("close", function () { afterPolicyClose(dialog); });
  });

  if (location.hash.indexOf("#politica-") === 0) openPolicy(location.hash.slice(1));
  window.addEventListener("hashchange", function () {
    if (location.hash.indexOf("#politica-") === 0) openPolicy(location.hash.slice(1));
  });

  /* "Rever minha escolha" / "Preferências de cookies" */
  document.querySelectorAll("[data-consent-reopen]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dialog = btn.closest("dialog");
      if (dialog) closePolicy(dialog);
      decided = true;
      showBanner();
      var first = banner && banner.querySelector("[data-consent]");
      if (first) first.focus();
    });
  });

  /* Ano no rodapé ---------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
