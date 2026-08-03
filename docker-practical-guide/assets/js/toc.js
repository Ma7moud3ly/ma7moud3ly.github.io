/* ==========================================================================
   toc.js
   - Auto-generates the on-page table of contents from h2/h3 headings.
   - Fills [data-reading-time] with an estimate based on word count.
   - Adds clickable anchor links to headings.
   - Highlights the current section while scrolling (scrollspy).
   ========================================================================== */
(function () {
  "use strict";

  var isEnglish = document.documentElement.lang === "en";
  var WORDS_PER_MIN = isEnglish ? 200 : 180; // reading pace (conservative)
  var STR = isEnglish
    ? { min: " min", onThisPage: "On this page", anchor: "Link to this section" }
    : { min: " دقيقة", onThisPage: "في هذه الصفحة", anchor: "رابط لهذا القسم" };

  function slugify(text, i) {
    var base = text
      .trim()
      .toLowerCase()
      .replace(/[^؀-ۿ\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return (base || "section") + "-" + i;
  }

  function estimateReadingTime(scope) {
    var text = scope.textContent || "";
    var words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MIN));
  }

  function build() {
    var scope = document.querySelector(".content__inner");
    if (!scope) return;

    /* Reading time */
    var mins = estimateReadingTime(scope);
    document.querySelectorAll("[data-reading-time]").forEach(function (n) {
      n.textContent = mins + STR.min;
    });

    /* Collect headings */
    var headings = scope.querySelectorAll("h2, h3");
    var tocHost = document.getElementById("toc");
    var links = [];

    var listHtml = "";
    headings.forEach(function (h, i) {
      if (!h.id) h.id = slugify(h.textContent, i);

      // Heading anchor
      var a = document.createElement("a");
      a.className = "heading-anchor";
      a.href = "#" + h.id;
      a.setAttribute("aria-label", STR.anchor);
      a.textContent = "#";
      h.appendChild(a);

      var lvl = h.tagName === "H3" ? "lvl-3" : "lvl-2";
      listHtml +=
        '<li><a class="' + lvl + '" href="#' + h.id + '">' +
        h.firstChild.textContent.trim() +
        "</a></li>";
    });

    if (tocHost && headings.length) {
      tocHost.className = "toc";
      tocHost.innerHTML =
        '<p class="toc__title">' + STR.onThisPage + "</p>" +
        '<ul class="toc__list">' + listHtml + "</ul>";
      links = Array.prototype.slice.call(
        tocHost.querySelectorAll(".toc__list a")
      );
    }

    /* Scrollspy */
    if (links.length && "IntersectionObserver" in window) {
      var byId = {};
      links.forEach(function (l) {
        byId[l.getAttribute("href").slice(1)] = l;
      });
      var visible = new Set();
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) visible.add(en.target.id);
            else visible.delete(en.target.id);
          });
          links.forEach(function (l) { l.classList.remove("is-active"); });
          // Activate the first heading currently in view.
          for (var i = 0; i < headings.length; i++) {
            if (visible.has(headings[i].id)) {
              var active = byId[headings[i].id];
              if (active) active.classList.add("is-active");
              break;
            }
          }
        },
        { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
      );
      headings.forEach(function (h) { obs.observe(h); });
    }
  }

  document.addEventListener("DOMContentLoaded", build);
})();
