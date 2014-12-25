---
title: "AngularJs Ui-Router"
tags:
  - AngularJs
  - Ui-Router
  - Javascript
permalink: "/content/angularjs-ui-router"
layout: post
author: YaronMiro
---
{% include setup %}

The [UI-Router](http://angular-ui.github.io/) is a routing framework for AngularJS. Ui-Router takes a whole new different approach then the traditional ```NgRoute``` which is based only upon route URL. UI-Router extends the routing by using ```States```.
This mean that the application will be capable of changing it's own views by the ```states``` and not just by the route URL.

<!-- more -->

### States vs URL Route

The default ```ngRoute``` forces the views (templates) to have a dependency upon the url. However when using ```states``` your views (templates) can live along side one another (paralell) or one within the other (Nested).
The bottom line is that you have the ability to modify/update the parts of your app with routing - even if the URL does not change, You rely upon the ```states```.
