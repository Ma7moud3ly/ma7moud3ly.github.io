/* ==========================================================================
   layout.js
   Injects the shared chrome (header, sidebar, footer, prev/next nav) so the
   layout stays identical on every page and the chapter list is never
   duplicated in markup. Reads window.SITE.CHAPTERS from site-data(-en).js.

   Bilingual: the page language comes from <html lang> ("ar" | "en"). The
   English edition lives under /en/ mirroring the same filenames, so the
   language toggle just points at the counterpart page.
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var CHAPTERS = SITE.CHAPTERS || [];
  var META = SITE.META || {};

  var isEnglish = document.documentElement.lang === "en";

  /* Path back to the current language's root: ./ from the landing page,
     ../ from inside /chapters/. English pages live under /en/, so the same
     relative logic keeps links inside the active language. */
  var inChapters = /\/chapters\//.test(location.pathname);
  var ROOT = inChapters ? "../" : "./";

  /* Counterpart page in the other language (filenames mirror across /en/). */
  var currentFile = location.pathname.split("/").pop();
  if (!currentFile || !/\.html$/.test(currentFile)) currentFile = "index.html";
  var langUrl = isEnglish
    ? (inChapters ? "../../chapters/" + currentFile : "../index.html")
    : (inChapters ? "../en/chapters/" + currentFile : "en/index.html");

  /* UI strings per language. */
  var L = isEnglish
    ? {
        chapters: "Chapters", home: "Home", menu: "Open menu",
        themeLabel: "Theme", themeAria: "Toggle dark mode",
        printLabel: "Print", printAria: "Print page",
        footerNote: "An open educational guide.",
        preparedBy: "Prepared by", withClaude: "with Claude",
        prevSmall: "← Previous", nextSmall: "Next →", homeNav: "🏠 Home",
        langLabel: "العربية", langAria: "التبديل إلى العربية"
      }
    : {
        chapters: "الفصول", home: "الرئيسية", menu: "فتح القائمة",
        themeLabel: "الوضع", themeAria: "تبديل الوضع الليلي",
        printLabel: "طباعة", printAria: "طباعة الصفحة",
        footerNote: "دليل تعليمي مفتوح.",
        preparedBy: "أعدّه", withClaude: "بمساعدة Claude",
        prevSmall: "→ الفصل السابق", nextSmall: "الفصل التالي ←", homeNav: "🏠 الرئيسية",
        langLabel: "English", langAria: "Switch to English"
      };

  var LOGO =
    '<svg class="logo" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="#2496ed" d="M22 9.5c-.4-.3-1.5-.4-2.3-.2-.1-.8-.5-1.5-1.2-2.1l-.4-.3-.3.4c-.4.6-.6 1.4-.5 2.2 0 .3.1.7.3 1-.3.2-1 .4-1.7.4H2.1l-.1.4c-.2 1.4 0 2.8.7 4 .8 1.3 2 2.2 3.7 2.6 3.6 1 7.8.2 11-2.8 1.2-1.2 2.1-2.6 2.8-4.2 1 0 2-.3 2.6-1.2l.3-.4-.4-.3z"/>' +
    '<path fill="#2496ed" d="M4 8.9h2.1v-2H4zm2.6 0h2.1v-2H6.6zm2.7 0h2.1v-2H9.3zm2.7 0h2v-2h-2zM6.6 6.4h2.1v-2H6.6zm2.7 0h2.1v-2H9.3zm2.7 0h2v-2h-2z"/>' +
    "</svg>";

  var GITHUB_ICON =
    '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">' +
    '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>' +
    "</svg>";

  /* ---------------- Header ---------------- */
  function buildHeader() {
    var host = document.getElementById("siteHeader");
    if (!host) return;
    host.className = "site-header";
    host.innerHTML =
      '<button class="header-btn menu-toggle" id="menuToggle" aria-label="' + L.menu + '" aria-expanded="false">☰</button>' +
      '<a class="site-header__brand" href="' + ROOT + 'index.html">' +
      LOGO +
      "<span>" + (META.title || "Docker") +
      "<small>" + (META.subtitle || "") + "</small></span></a>" +
      '<span class="site-header__spacer"></span>' +
      '<a class="header-btn" href="' + langUrl + '" aria-label="' + L.langAria + '">🌐' +
      '<span class="header-btn__label">' + L.langLabel + "</span></a>" +
      '<a class="header-btn" href="https://github.com/ma7moud3ly/" target="_blank" rel="noopener" aria-label="GitHub: ma7moud3ly">' +
      GITHUB_ICON +
      '<span class="header-btn__label">GitHub</span></a>' +
      '<button class="header-btn" id="themeToggle" aria-label="' + L.themeAria + '">' +
      '<span class="theme-ico" aria-hidden="true">🌙</span>' +
      '<span class="header-btn__label">' + L.themeLabel + "</span></button>" +
      '<button class="header-btn" id="printBtn" aria-label="' + L.printAria + '">🖨️' +
      '<span class="header-btn__label">' + L.printLabel + "</span></button>";

    var printBtn = host.querySelector("#printBtn");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
  }

  /* ---------------- Sidebar (chapter list) ---------------- */
  function buildSidebar(current) {
    var host = document.getElementById("sidebar");
    if (!host) return;
    host.className = "sidebar";

    var items = CHAPTERS.map(function (c) {
      var active = c.n === current ? " is-active" : "";
      return (
        '<li><a class="' + active.trim() + '" href="' + ROOT + c.file + '">' +
        '<span class="num">' + c.n + "</span>" +
        "<span>" + c.title + "</span></a></li>"
      );
    }).join("");

    host.innerHTML =
      '<p class="sidebar__title">' + L.chapters + "</p>" +
      '<ul class="sidebar__nav">' +
      '<li><a class="' + (current === 0 ? "is-active" : "") + '" href="' + ROOT + 'index.html">' +
      '<span class="num">★</span><span>' + L.home + "</span></a></li>" +
      items +
      "</ul>";
  }

  /* ---------------- Footer ---------------- */
  function buildFooter() {
    var host = document.getElementById("siteFooter");
    if (!host) return;
    host.className = "site-footer";
    var year = new Date().getFullYear();
    host.innerHTML =
      '<div class="site-footer__inner">' +
      "<span>© " + year + " " + (META.title || "") + " — " + L.footerNote + "</span>" +
      "<span>" + L.preparedBy +
      ' <a href="https://github.com/ma7moud3ly/" target="_blank" rel="noopener">Mahmoud Aly</a> ' +
      L.withClaude + "</span>" +
      "</div>";
  }

  /* ---------------- Prev / Home / Next ---------------- */
  function buildChapterNav(current) {
    var host = document.getElementById("chapterNav");
    if (!host || !current) return;
    host.className = "chapter-nav";

    var prev = CHAPTERS.find(function (c) { return c.n === current - 1; });
    var next = CHAPTERS.find(function (c) { return c.n === current + 1; });

    var prevHtml = prev
      ? '<a class="nav-prev" href="' + ROOT + prev.file + '"><small>' + L.prevSmall + "</small><strong>" + prev.title + "</strong></a>"
      : '<a class="nav-prev" aria-disabled="true"><small>' + L.prevSmall + "</small><strong>—</strong></a>";

    var nextHtml = next
      ? '<a class="nav-next" href="' + ROOT + next.file + '"><small>' + L.nextSmall + "</small><strong>" + next.title + "</strong></a>"
      : '<a class="nav-next" aria-disabled="true"><small>' + L.nextSmall + "</small><strong>—</strong></a>";

    host.innerHTML =
      prevHtml +
      '<a class="nav-home" href="' + ROOT + 'index.html">' + L.homeNav + "</a>" +
      nextHtml;
  }

  /* ---------------- Mobile drawer ---------------- */
  function wireDrawer() {
    var toggle = document.getElementById("menuToggle");
    var overlay = document.getElementById("sidebarOverlay");
    if (!toggle) return;

    function close() {
      document.body.classList.remove("sidebar-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("sidebar-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (overlay) overlay.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var article = document.querySelector("[data-chapter]");
    var current = article ? parseInt(article.getAttribute("data-chapter"), 10) : 0;

    buildHeader();
    buildSidebar(current);
    buildChapterNav(current);
    buildFooter();
    wireDrawer();

    document.dispatchEvent(new CustomEvent("layout:ready", { detail: { current: current, root: ROOT } }));
  });

  window.SITE.ROOT = ROOT;
})();
