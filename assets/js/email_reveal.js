// Email reveal — populates random glyphs on load, then runs a glitch-decode
// animation on click. Address is assembled from data-attrs only after a user
// gesture, so it never appears in the static HTML for scrapers to grep.
//
// This file is loaded with `defer`, so the document is fully parsed when it
// executes. We deliberately avoid `DOMContentLoaded` because another `defer`
// script (polyfill.io) can stall for ~60s on network failure, which delays
// DCL — see also `paper_collapse.js` for the same pattern.
(function () {
  // Charset deliberately excludes '@' and '.' so the pre-reveal random glyphs
  // never accidentally render an email-like substring (a scraper running
  // `text.indexOf('@')` on the rendered DOM would otherwise sometimes hit).
  var CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';

  function randomChar() {
    return CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }

  function fillRandom(span) {
    var n = parseInt(span.dataset.targetLen || '14', 10);
    while (span.firstChild) span.removeChild(span.firstChild);
    for (var i = 0; i < n; i++) {
      var ch = document.createElement('span');
      ch.className = 'ch';
      ch.textContent = randomChar();
      span.appendChild(ch);
    }
  }

  function reveal(host) {
    if (host.classList.contains('revealed')) return;
    host.classList.add('revealed');

    // NOTE: `data-domain-1` becomes dataset['domain-1'], NOT dataset.domain1.
    // Per the HTML5 spec, `-` followed by a digit is preserved (only `-` +
    // ASCII lowercase letter is camelCased). Use bracket syntax.
    var u = host.dataset.user || '';
    var d1 = host.dataset['domain-1'] || '';
    var d2 = host.dataset['domain-2'] || '';
    var addr = u + '@' + d1 + '.' + d2;

    var glyphs = host.querySelector('.email-glyphs');
    var spans = glyphs.querySelectorAll('.ch');
    if (spans.length !== addr.length) {
      glyphs.dataset.targetLen = addr.length;
      fillRandom(glyphs);
      spans = glyphs.querySelectorAll('.ch');
    }

    var pos = 0;
    var tick = setInterval(function () {
      // Randomize all positions still after `pos`
      for (var i = pos; i < addr.length; i++) {
        spans[i].textContent = randomChar();
      }
      if (pos < addr.length) {
        spans[pos].textContent = addr[pos];
        spans[pos].style.color = 'var(--accent)';
        pos++;
      } else {
        clearInterval(tick);
        // Wrap the resolved address in a mailto link for subsequent clicks.
        while (glyphs.firstChild) glyphs.removeChild(glyphs.firstChild);
        var link = document.createElement('a');
        link.href = 'mailto:' + addr;
        link.textContent = addr;
        glyphs.appendChild(link);
        host.setAttribute('aria-label', addr);
      }
    }, 60);
  }

  document.querySelectorAll('.email-reveal').forEach(function (host) {
    var glyphs = host.querySelector('.email-glyphs');
    if (glyphs) fillRandom(glyphs);
    host.addEventListener('click', function () { reveal(host); });
    host.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(host); }
    });
  });
})();
