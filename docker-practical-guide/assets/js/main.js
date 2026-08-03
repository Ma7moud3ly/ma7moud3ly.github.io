/* ==========================================================================
   main.js
   Boots the two optional third-party libraries when present:
     - Mermaid  → diagrams (re-themed live on theme switch)
     - Prism    → code syntax highlighting
   Both load from a CDN in the page <head>. If a library is missing (e.g. the
   file is opened offline) the page still works — code shows unhighlighted and
   Mermaid blocks stay as plain text.
   ========================================================================== */
(function () {
  "use strict";

  function isDark() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  /* ---------------- Mermaid ---------------- */
  function initMermaid() {
    if (typeof window.mermaid === "undefined") return;

    // Cache each diagram's source so we can re-render on theme change.
    document.querySelectorAll(".mermaid").forEach(function (n) {
      if (!n.getAttribute("data-src")) {
        n.setAttribute("data-src", n.textContent.trim());
      }
    });

    function render() {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: isDark() ? "dark" : "default",
        securityLevel: "loose",
        fontFamily: "inherit",
      });
      document.querySelectorAll(".mermaid").forEach(function (n) {
        n.removeAttribute("data-processed");
        n.innerHTML = n.getAttribute("data-src") || n.textContent;
      });
      try {
        window.mermaid.run({ querySelector: ".mermaid" });
      } catch (e) {
        /* ignore render errors so the rest of the page stays usable */
      }
    }

    render();
    document.addEventListener("theme:change", render);
  }

  /* ---------------- Prism ---------------- */
  function initPrism() {
    if (typeof window.Prism !== "undefined") {
      window.Prism.highlightAll();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPrism();
    initMermaid();
  });
})();
