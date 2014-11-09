---
title: "Backend-free apps with Grunt, jekyll and D3.js"
tags: 
  - Grunt
  - Jekyll
  - d3js
permalink: "/content/backend-free-apps-grunt-jekyll-d3js"
layout: post
author: ceoaliongroo
published: true
---

When we started working on a mobile web site for [Casa del Lector](http://www.gizra.com/content/casa-del-lector/)'s exhibition, we decided early on it would be a backend-free app, mainly for reasons of stability and performance:

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/backendless-apps/image1.jpg" />
  <div class="caption">App is faster than 96% of other websites</div>
</div>


The data was entered by the client on a 3rd party desktop tool which exported it to XML. We used a bunch of open source tools to massage it a bit and prepare it for the App. Since the project is open sourced you can check out the [actual code](https://github.com/Gizra/CDL).

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/casa-del-lector/cdl-item.gif" />
  <div class="caption">The App in action</div>
</div>

<!-- more -->

### Grunt

Grunt was an obvious choice for processing the XML data and getting it ready for Jekyll's consumption. Since we are already working with [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb) we were able to add our own custom tasks.

Here are some notable Grunt plugins we have used:

* [grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace): Sanitizing text, removing tags, and many text manipulation can be achieved using this great plugin
* [he](https://github.com/mathiasbynens/he): This one you would use to deal with HTML encoding and decoding. Useful for non-english websites (CDL has a version in [Spanish](http://gizra.github.io/CDL-ES/)) 
* [underscore](https://github.com/jashkenas/underscore): Manipulating complex JSON objects and array made easy. 
* [grunt-convert](https://github.com/assemble/grunt-convert): Converting to/ from JSON, YAML and XML is very handy when consuming data from 3rd party source

You can see the configuration in the [Gruntfile.js](https://github.com/Gizra/CDL/blob/master/Gruntfile.js)

### Jekyll

Grunt tasks generate JSON files from the XML, properly encode and injected it into Jekyll.  
Jekyll was used to create the actual HTML. Nothing too fancy here, but it served its purpose - generating the HTML that we'll later ``grunt deploy`` into GitHub Pages.

### D3js

[D3.js](http://d3js.org/) is an excellent library with great documentation and examples. However to improve mobile performance, we had to look beyond the common examples and API recommendations. Some tips:

* Emulators are nice, but in the end the HTML, CSS and JS should be tested on actual devices. Luckily for us the devices in the exhibition were known, so it was easier to target them. We used [Chrome](https://developer.chrome.com/devtools/docs/remote-debugging) and [Safari](https://developer.apple.com/safari/tools/) remote developer tools to get internal insight of the application
* Removing the [300ms](http://updates.html5rocks.com/2013/12/300ms-tap-delay-gone-away) delay of double-tap zoom was a good start but of course not enough. In fact, the most difficult issues were in relation to events handling and animations. Try to apply throttle or [debounce](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation) when handling Zoom or Drag, so they animations don't choke the app and overload the [d3js behaviors](https://github.com/mbostock/d3/wiki/Behaviors).
* I also highly recommend the fabulous talk of [Mark DiMarco](http://www.youtube.com/watch?v=90NsjKvz9Ns&list=PL37ZVnwpeshFXOP2lqCUykYPXYNsK_fgN&feature=share) from JSConf 2014, who presented alternatives to handling the user interaction and animation in d3js. This helped us do further optimizations and make pthis project a success