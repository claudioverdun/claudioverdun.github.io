---
layout: page
permalink: /library/
title: library
description: Things worth your time.
nav: true
nav_order: 3
---

<div class="r-container r-library">

  {%- assign sections = "papers,books,talks,youtube,blogs,courses" | split: "," -%}
  {%- assign labels = "Papers I keep coming back to|Books|Talks & lectures|YouTube videos|Blogs|Courses" | split: "|" -%}

  {%- for sec in sections -%}
    {%- assign idx = forloop.index0 -%}
    {%- assign entries = site.data.library[sec] -%}
    {%- if entries and entries.size > 0 -%}
      <h3 class="lib-section">{{ labels[idx] }}</h3>
      {%- for e in entries -%}
        <div class="lib-row">
          <span class="title">
            {%- if e.url -%}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.title }}</a>{%- else -%}{{ e.title }}{%- endif -%}
            {%- if e.author -%}<span class="author">— {{ e.author }}</span>{%- endif -%}
          </span>
          <span class="source">{{ e.source }}</span>
        </div>
      {%- endfor -%}
    {%- endif -%}
  {%- endfor -%}

</div>
