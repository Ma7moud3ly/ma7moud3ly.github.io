/* ==========================================================================
   theme-init.js
   Loaded synchronously in <head> (no defer) so the theme is applied before
   first paint — this prevents a flash of the wrong theme.
   Default theme is DARK; a saved user choice always wins. Keep this file tiny.
   ========================================================================== */
(function () {
  var theme = "dark"; // default for first-time visitors
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) {
    /* localStorage may be unavailable (e.g. strict file:// mode) — ignore. */
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
