/* ==========================================================================
   theme.js
   Wires the header theme toggle and persists the choice. Also re-themes any
   already-rendered Mermaid diagrams when the theme changes.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  function current() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    updateIcon(theme);
    document.dispatchEvent(new CustomEvent("theme:change", { detail: { theme: theme } }));
  }

  function updateIcon(theme) {
    var ico = document.querySelector("#themeToggle .theme-ico");
    if (ico) ico.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  document.addEventListener("layout:ready", function () {
    var btn = document.getElementById("themeToggle");
    updateIcon(current());
    if (btn) {
      btn.addEventListener("click", function () {
        apply(current() === "dark" ? "light" : "dark");
      });
    }
  });
})();
