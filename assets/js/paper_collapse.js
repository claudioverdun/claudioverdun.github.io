// Toggles `.open` on `.paper` cards (publications page) and `.r-pub-year`
// year sections. Cards inside `.always-open` parents are non-interactive.
function initCollapse() {
  // Per-paper expand
  document.querySelectorAll('.paper:not(.always-open) .paper-head').forEach(function (head) {
    head.addEventListener('click', function () {
      head.parentElement.classList.toggle('open');
    });
    head.setAttribute('tabindex', '0');
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.parentElement.classList.toggle('open');
      }
    });
  });

  // Per-year expand
  document.querySelectorAll('.r-pub-year .year-head').forEach(function (head) {
    head.addEventListener('click', function () {
      head.parentElement.classList.toggle('open');
    });
    head.setAttribute('tabindex', '0');
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.parentElement.classList.toggle('open');
      }
    });
  });
}

// Run on DOMContentLoaded and also immediately if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCollapse);
} else {
  initCollapse();
}
