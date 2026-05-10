---
layout: page
permalink: /library/
title: library
description: Things worth your time.
nav: true
nav_order: 3
---

<div class="r-container r-library">

  {%- assign sections = "papers,books,talks,youtube,podcasts,blogs,courses" | split: "," -%}
  {%- assign labels = "Papers I keep coming back to|Books|Talks & lectures|YouTube|Podcasts|Blogs|Courses" | split: "|" -%}

  {%- for sec in sections -%}
    {%- assign idx = forloop.index0 -%}
    {%- assign entries = site.data.library[sec] -%}
    {%- if entries and entries.size > 0 -%}
      <section class="lib-group{% if forloop.first %} open{% endif %}">
        <h3 class="lib-section">{{ labels[idx] }}</h3>
        <div class="lib-body">
          {%- for e in entries -%}
            <div class="lib-row">
              <div class="lib-row-head">
                <span class="title">
                  {%- if e.url -%}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.title }}</a>{%- else -%}{{ e.title }}{%- endif -%}
                  {%- if e.author -%}<span class="author">— {{ e.author }}</span>{%- endif -%}
                </span>
                <span class="source">{{ e.source }}</span>
              </div>
              {%- if e.note -%}
                <p class="note">{{ e.note }}</p>
              {%- endif -%}
            </div>
          {%- endfor -%}
        </div>
      </section>
    {%- endif -%}
  {%- endfor -%}

</div>

<script>
  (function () {
    document.querySelectorAll('.r-library .lib-section').forEach(function (h) {
      h.setAttribute('tabindex', '0');
      function toggle() {
        h.closest('.lib-group').classList.toggle('open');
      }
      h.addEventListener('click', toggle);
      h.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  })();
</script>
