---
layout: single
title: Tags
permalink: /tags/
author_profile: true
classes: wide
---

<h2>Tags</h2>

<ul class="tag-list">
  {% assign tags_sorted = site.tags | sort %}
  {% for tag in tags_sorted %}
    {% assign tag_name = tag[0] %}
    {% assign tag_slug = tag_name | slugify %}
    <li>
      <a href="/tags/{{ tag_slug }}/">
        {{ tag_name }}
      </a>
      <span>({{ tag[1].size }})</span>
    </li>
  {% endfor %}
</ul>
