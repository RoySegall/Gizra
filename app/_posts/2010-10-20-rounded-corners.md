---
tags:
- Drupal-planet
- jQuery
- CSS
permalink: /content/rounded-corners/
title: Rounded corners
created: 1287603226
layout: post
---
<strong>[Edit: I have found a better solution that allows using CSS3 on IE as-well -- <a href="http://css3pie.com/">CSS3PIE</a>]</strong>

CSS is annoying and I'd like to deal with it as little as possible. For that I'm using 960 grid design, I've started looking into LESS, and the latest is a rewrite I did to the <a href="http://drupal.org/project/rounded_corners">Rounded corners</a> module.

Rounded corners is no longer a "dumb" wrapper for the jQuery plugin, but rather an API that lets you do what you want with as little code possible.

<!-- more -->

```php
<?php
  $commands = array();
  // foo class will have default rounded corners.
  $commands[] = array('selector' => '.foo');

  // bar class will have 5px rounded corners on the top.
  $commands[] = array(
    'selector' => '.bar',
    'width' => 5,
    'corners' => 'top',
  );

  // Add the rounded corners.
  rounded_corners_add_corners($commands);
?>
```

As a bonus feature you can also add rounded corners on images! Here's a summary from the README.txt:

Round corners can be used on images, by selecting the wrapping div (*not* the ``<img>`` itself), and by settings the "image wrapper" property to TRUE. for example, consider the following HTML:

```
<div class="image-wrapper">
  <img src="bar.jpg" width="10" height="10">
</div>
```

And the PHP code:

```php
<?php
  $commands = array();
  $commands[] = array(
    // Select the wrapping DIV.
    'selector' => '.image-wrapper',
    // Let the module know this is a wrapping div of an image.
    'image wrapper' => TRUE,
  );
  rounded_corners_add_corners($commands);

?>
```

With the above code, the plugin will not try to use the browser's native support for round corners, thus will insure the image corners are properly "hidden".

It might not server for all cases, but I do think it can save time with some annoying tasks. I was also trying to do the same thing with Drop shadows, however since the jQuery plugin is quite old, and as far as I see not maintained, the results are so so. You can check it <a href="http://github.com/amitaibu/drop_shadow">here</a>.
