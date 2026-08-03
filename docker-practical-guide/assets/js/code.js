/* ==========================================================================
   code.js
   Enhances every <figure class="code-block" data-lang="..."> by injecting a
   header row with a language indicator and a copy-to-clipboard button.
   Authoring stays minimal:

     <figure class="code-block" data-lang="bash" data-title="Terminal">
       <pre><code class="language-bash">docker run hello-world</code></pre>
     </figure>
   ========================================================================== */
(function () {
  "use strict";

  var isEnglish = document.documentElement.lang === "en";
  var STR = isEnglish
    ? { aria: "Copy code", copy: "Copy", copied: "Copied", failed: "Copy failed" }
    : { aria: "نسخ الكود", copy: "نسخ", copied: "تم النسخ", failed: "تعذّر النسخ" };

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for file:// or older browsers.
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function enhance(block) {
    if (block.querySelector(".code-block__head")) return; // already done
    var lang = block.getAttribute("data-lang") || "text";
    var title = block.getAttribute("data-title") || lang;
    var code = block.querySelector("code");

    var head = document.createElement("div");
    head.className = "code-block__head";
    head.innerHTML =
      '<span class="code-block__lang">' + title + "</span>" +
      '<button class="copy-btn" type="button" aria-label="' + STR.aria + '">' +
      '<span class="copy-ico">⧉</span><span class="copy-label">' + STR.copy + "</span></button>";

    block.insertBefore(head, block.firstChild);

    var btn = head.querySelector(".copy-btn");
    btn.addEventListener("click", function () {
      copyText(code ? code.textContent : "").then(
        function () {
          btn.classList.add("is-copied");
          var label = btn.querySelector(".copy-label");
          var prev = label.textContent;
          label.textContent = STR.copied;
          btn.querySelector(".copy-ico").textContent = "✓";
          setTimeout(function () {
            btn.classList.remove("is-copied");
            label.textContent = prev;
            btn.querySelector(".copy-ico").textContent = "⧉";
          }, 1600);
        },
        function () {
          var label = btn.querySelector(".copy-label");
          label.textContent = STR.failed;
        }
      );
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".code-block").forEach(enhance);
  });
})();
