/* ==========================================================================
   home.js
   Renders the landing-page chapter grid from window.SITE.CHAPTERS so the list
   is defined in exactly one place (site-data.js).
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var host = document.getElementById("chapterGrid");
    if (!host || !window.SITE || !window.SITE.CHAPTERS) return;

    host.innerHTML = window.SITE.CHAPTERS.map(function (c) {
      var topics = (c.topics || [])
        .slice(0, 4)
        .map(function (t) { return "<span>" + t + "</span>"; })
        .join("");
      return (
        '<a class="chapter-card" href="' + c.file + '">' +
        '<span class="chapter-card__num">' + c.n + "</span>" +
        "<h3>" + c.title + "</h3>" +
        "<p>" + c.summary + "</p>" +
        '<div class="chapter-card__topics">' + topics + "</div>" +
        "</a>"
      );
    }).join("");
  });
})();
