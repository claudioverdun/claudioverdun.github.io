// Toggles `.open` on `.paper` cards. Cards inside `.always-open` parents
// are non-interactive. Year-section toggling is wired by the inline IIFE
// in `_pages/publications.md`, which creates the `.r-pub-year` elements
// during parse and binds its own handlers — duplicating that here would
// cause a double-toggle that cancels the click.
//
// This file is loaded with `defer`, so the document is fully parsed when
// it executes. We deliberately avoid `DOMContentLoaded` because another
// `defer` script (polyfill.io) can stall for ~60s on network failure,
// which delays DCL — and polyfill.io is the kind of remote dependency
// that may stay broken indefinitely.
(function () {
  document.querySelectorAll('.paper:not(.always-open)').forEach(function (paper) {
    var body = paper.querySelector('.paper-body-inner');
    if (!body || body.textContent.trim() === '') return;
    var head = paper.querySelector('.paper-head');
    if (!head) return;
    head.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      paper.classList.toggle('open');
    });
    head.setAttribute('tabindex', '0');
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a')) return;
        e.preventDefault();
        paper.classList.toggle('open');
      }
    });
  });
})();
