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

  /* Ano no rodapé ---------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
