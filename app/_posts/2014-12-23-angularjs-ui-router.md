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

The [UI-Router](http://angular-ui.github.io/) is a routing framework for AngularJS. Ui-Router takes a whole new different approach then the traditional ```NgRoute``` which is only based upon route URL. UI-Router extends the routing by using ```States```.
This mean that the application will be capable of changing it's own views by the ```states``` and not just by the route URL.
You can check this [live demo](#) app and also access the example project [repository](https://github.com/YaronMiro/AngularJs-UI-Router---Example)

<!-- more -->

### States vs URL Route

The default ```ngRoute``` forces the views (templates) to have a dependency upon the url. However when using ```states``` your views (templates) can live along side one another (paralell) or one within the other (Nested).
The bottom line is that you have the ability to modify/update the parts of your app with routing - even if the URL does not change, You rely upon the ```states```.


### Installation

There have several ways of installing the ```ui-router``` library, I'm not going to extend on on each option. If you are interested You can get further information on this link [installing the ui-router](http://angular-ui.github.io/ui-router/) I choose to use Bower.

Downloading the component.

```
bower install angular-ui-router --save
```

We need to add our library source file to the ```index.html```.

```html
<script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
```

Add we also need to inject the ```ui-router``` as a dependency.

```js
angular.module('myApp', ['ui.router'])
```
