---
title: Text-Editor with changes tracker.
tags:
  - CKEditor
  - ICE
  - AngularJs
  - Drupal-planet
layout: post
permalink: "/content/editor-with-track-changes"
author: NaderSafadi
---
{% include setup %}

It's really powerful for any company to be able to track changes, who made them and when they made them, Doing this with every article you have, every entity, every field, 
could be quite awesome, So how do we do this, Well we have one option when using Drupal, Which is this module [ckeditor_lite](https://www.drupal.org/project/ckeditor_lite)
 and every library and dependency module you have to install there.
 
<!-- more -->

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/creating-a-custom-grid-in-sass-bootstrap/customgrid-gizra.gif">
  <div class="caption">Notice the responsiveness of the site. The part with the white background marks our custom breakpoint.</div>
</div>


What if you are using angularJs, Well you have no options, so you have to put something together.
The basis of our work was with [ICE.js](https://github.com/NYTimes/ice), We loved it and it's really cool, It was a bit hard to implement it with AngularJs
But somehow we did it and it worked fine, the only problem is, It's not a text editor, not really, It's just a textarea.
We need tools, we need to make headings and lists and tables.

