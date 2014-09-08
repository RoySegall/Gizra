---
title: Casa del Lector
tags:
  - "casa del lector"
  - d3js
  - server-free
  - mobile
permalink: "/content/casa-del-lector"
layout: post
published: true
author: niryariv
---


Last week saw the launch of a pretty unique [project](http://gizra.github.io/CDL/) for us. It's not every day a product we've worked on gets a [write up on El Pais](http://cultura.elpais.com/cultura/2014/03/05/actualidad/1394047004_090821.html), or has this kind of launch event:

![]({{BASE_PATH}}/assets/images/posts/casa-del-lector/IMG_8388-2.JPG)

The target audience is a bit unusual as well. While it can be accessed like any other site, it's targeted to be used inside a specific exhibition in the [Casa del Lector](http://casalector.fundaciongsr.com/) museum in Madrid, on tablets handed out to the museum visitors:

![]({{BASE_PATH}}/assets/images/posts/casa-del-lector/IMG_8259%20-%202.JPG)

We took great care to stay within the touch UI conventions. When entering the site, the user is presented with a network of connections between items. As she zooms, details are revealed - subitems, their connections and finally their titles:

![]({{BASE_PATH}}/assets/images/posts/casa-del-lector/cdl-map-1.gif)

<!-- more -->

Tapping a node highlights its connections within the network, and a second tap takes the user to the node content, which contains various media:

![]({{BASE_PATH}}/assets/images/posts/casa-del-lector/cdl-item.gif)

But the greatest difference is probably under the hood. There's no server-side as such. The data is entered via a 3rd party desktop app and exported into XML, based on which [our code](https://github.com/Gizra/CDL/) creates Jekyll files served from Github Pages, with the fantastic [d3.js](http://d3js.org/) powering the network UI.

I think our first exposure to this approach was via Development Seed's [blog post](http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/). Since then we've built a bunch of sites this way, including the one you're reading this on, and have come to think of it as "server-free" - there's huge weight off our backs when we don't have to worry about scaling at all, especially in scenarios which are prone to traffic spikes. Having no database or server side code to worry about is a nice bonus too.

If you happen to be in Madrid before the end of Septmeber, perhaps you'll get to see the [Depósito de Memoria](http://casalector.fundaciongsr.com/story.php?id=1288) exhibition - if not, you can still [visit it online](https://github.com/Gizra/CDL/). Enjoy :)
