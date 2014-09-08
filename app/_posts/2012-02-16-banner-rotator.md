---
tags:
- Views
- tutorial
- Drupal-planet
permalink: /content/banner-rotator/
title: Banner rotator
created: 1329390514
layout: post
author: RoySegall
---
A common design element we see lately in a lot of sites is a banner rotator - image slideshow with some text and links on the side.

There are several modules that try to deal with it in Drupal (such as "ddblock", which we don't use), however we find that using the good old Views slideshow module can give us everything we need. The following blog post gives an overview of how we achieved this task without any code, just Views configuration and a bit of CSS. As always we provide a <a href="http://drupal.org/sandbox/RoySegall/1442236">feature</a> that can be installed and enabled (visit ```/banner-rotator```).

<!-- more -->

<img src="/assets/images/legacy/Medico,%20the%20largest%20community%20for%20medical%20information%20in%20India..jpg" />

Download Views slideshow module, and follow the instructions in the README.txt on how to enable "Views slideshow cycle".
Next, create a content type called “Banner rotator” with 4 fields:
<ul>
<li>Title - The tile of the node</li>
<li>Body - Additional text to the node</li>
<li>Image - The image that will be displayed</li>
<li>Url - A filed that contain a url to any page. It could be any custom address we want to direct the user</li>
</ul>

Next add a View, as in the image.

<img src="/assets/images/legacy/Selection_002.png" />

I wanted that only the picture will be “rotated” therefore I exposed every field except for the image field.
After setting the above click on the settings link in the “FORMAT” area. Scroll down to the widgets area, under the top widgets click on the pager and follow these options

<img src="/assets/images/legacy/Selection_003.png" />

I chose to show the fields: Title and body and I selected to "Activate Slide and Pause on Pager Hover", this will pause the cycle of the images when hovering on the title and body. Also, under the Cycle options -> Action I chose to "Pause on hover", it will pause the cycle when I'm on a picture.

As we added a URL field, we can use its data to wrap other fields with the link, e.g. in the title field go to "REWRITE RESULTS" and select "Output this field as a link", and use the token of the URL field in the link path input.

<img src="/assets/images/legacy/Selection_005.png" />


Last thing, you need to do, is apply your CSS. A simple float will the text where you expect it to be. ```
.views-slideshow-controls-top {
  float: right; /* LTR */
}
```

Be creative!
