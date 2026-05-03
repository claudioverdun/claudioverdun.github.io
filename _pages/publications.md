---
layout: page
permalink: /publications/
title: papers
description: Selected publications. As is common in mathematics, most of the publications are in alphabetical order.
nav: true
nav_order: 1
---

<div class="r-container r-publications">

  <div id="bib-output">
    {% bibliography -f {{ site.scholar.bibliography }} %}
  </div>

</div>

<script>
  // Group jekyll-scholar's flat output (h2 year headings + paper articles)
  // into collapsible .r-pub-year sections. The two most recent year
  // sections start open; older ones start closed. Uses only safe DOM
  // methods (no innerHTML).
  (function () {
    var root = document.getElementById('bib-output');
    if (!root) return;

    var nodes = Array.prototype.slice.call(root.children);
    while (root.firstChild) root.removeChild(root.firstChild);

    var currentSection = null;
    var openCount = 0;

    function makeYearHeader(year) {
      var head = document.createElement('div');
      head.className = 'year-head';

      var ySpan = document.createElement('span');
      ySpan.textContent = year;
      head.appendChild(ySpan);

      var cSpan = document.createElement('span');
      cSpan.className = 'count';
      cSpan.setAttribute('data-count', '');
      head.appendChild(cSpan);

      return head;
    }

    nodes.forEach(function (node) {
      if (node.tagName === 'H2') {
        var year = node.textContent.trim();

        currentSection = document.createElement('section');
        currentSection.className = 'r-pub-year';
        if (openCount < 2) {
          currentSection.classList.add('open');
          openCount++;
        }

        currentSection.appendChild(makeYearHeader(year));

        var body = document.createElement('div');
        body.className = 'year-body';
        currentSection.appendChild(body);

        root.appendChild(currentSection);
      } else if (currentSection) {
        currentSection.querySelector('.year-body').appendChild(node);
      } else {
        root.appendChild(node);
      }
    });

    // Fill counts and bind toggle handlers
    document.querySelectorAll('.r-pub-year').forEach(function (sec) {
      var n = sec.querySelectorAll('.year-body .paper').length;
      var countEl = sec.querySelector('[data-count]');
      countEl.textContent = n + ' ' + (n === 1 ? 'paper' : 'papers');

      var head = sec.querySelector('.year-head');
      head.addEventListener('click', function () { sec.classList.toggle('open'); });
      head.setAttribute('tabindex', '0');
      head.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec.classList.toggle('open'); }
      });
    });
  })();
</script>
