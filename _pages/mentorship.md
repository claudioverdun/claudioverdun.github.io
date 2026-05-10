---
layout: page
permalink: /mentorship/
title: mentorship
description: Programs and people I work with.
nav: true
nav_order: 2
---

<div class="r-container r-mentorship">
  {% for program in site.data.mentorship %}
  <article class="program">
    <div class="program-logo" aria-hidden="true">
      {%- if program.logo -%}
        <img src="{{ program.logo | relative_url }}" alt="">
      {%- elsif program.monogram -%}
        <span class="monogram">{{ program.monogram }}</span>
      {%- else -%}
        <span class="monogram">{{ program.name | slice: 0, 4 }}</span>
      {%- endif -%}
    </div>
    <div class="program-body">
      <header class="program-head">
        <h3 class="program-name">
          {%- if program.url -%}<a href="{{ program.url }}" target="_blank" rel="noopener">{{ program.name }}</a>{%- else -%}{{ program.name }}{%- endif -%}
        </h3>
        <span class="role-pill">{{ program.role }}</span>
      </header>
      <p class="program-desc">{{ program.description }}</p>
    </div>
  </article>
  {% endfor %}
</div>
