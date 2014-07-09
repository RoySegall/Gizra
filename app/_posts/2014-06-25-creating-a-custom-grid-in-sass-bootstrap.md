---
title: Creating a Custom Breakpoint in Bootstrap-Sass
tags:
  - Bootstrap
  - CSS
  - Drupal-planet
layout: post
permalink: "/content/custom-breakpoint-bootstrap-sass"
author: NaderSafadi
---
{% include setup %}

Bootstrap is our go to base theme, but what happens when the grid the client asks for has different width, or more break points?
Using Bootstrap-Sass creating a custom grid is possible in a manner that can be copied and adjusted from one project to another. As example for this post, and for your future reference you may follow the [live demo](http://gizra.github.io/custom-breakpoint-example/) and [repository](https://github.com/Gizra/custom-breakpoint-example) that changes Bootstrap to work with five breakpoints (tip: use [Resizer](http://lab.maltewassermann.com/viewport-resizer/) for easy viewport resize).  
Note that example is using Jekyll for simplicity, however the same technique can be used on Drupal.

<!-- more -->

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/creating-a-custom-grid-in-sass-bootstrap/customgrid-gizra.gif">
  <div class="caption">Notice the responsiveness of the site. The part with the white background marks our custom breakpoint.</div>
</div>


1. [Set](https://github.com/Gizra/custom-breakpoint-example/blob/master/app/_scss/main.scss#L1-L14) the custom breakpoint. In this example arbitrarily called ``is`` (Intermediate small - because it's between the extra small ``xs`` and small ``sm`` breakpoints), which means we can set the cols writing ``col-is-4``.
2. Create a custom ``_grids.scss`` file next to your main ``styles.scss`` and [include](https://github.com/Gizra/custom-breakpoint-example/blob/master/app/_scss/main.scss#L16-L19) it. Be sure to include it after the ``bootstrap.scss`` file.
3. Next we need to [declare](https://github.com/Gizra/custom-breakpoint-example/blob/master/app/_scss/_grids.scss#L1-L3) our new breakpoint, which means that if the breakpoint is between two existing breakpoints, we have to set a maximum width to the smaller breakpoint and set a minimum width for the bigger breakpoint. We had to set the maximum width in the our main css file, before calling the bootstrap (Otherwise the hidden class function won't work), So we only have to set the minimum width of the bigger grid.
4. As we need a fixed container rather than a fluid one, we [set](https://github.com/Gizra/custom-breakpoint-example/blob/master/app/_scss/_grids.scss#L4-L11) the container to the width determined in step 1, otherwise it will have a fluid container.
5. Next we [call](https://github.com/Gizra/custom-grid/blob/master/app/_scss/_grids.scss#L13-L17) the ``make-grid()`` Sass function.
6. An optional step, yet recommended, is to add [visible and hidden](https://github.com/Gizra/custom-grid/blob/master/app/_scss/_grids.scss#L19-L36) classes to the custom breakpoint. In our example adding a ``visible-is`` or ``hidden-is`` will have the desired effect when the new breakpoint will be used.

