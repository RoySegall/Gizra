---
title: "Gizra - We've Got Your Headless Covered"
tags: 
  - Headless Drupal
  - AngularJs
  - RESTful
  - "Drupal-planet"
permalink: "/content/gizra-we-have-got-your-headless-covered"
layout: post
published: true
---

{% include setup %}

## What's the name of the Angular component for login?

The difficulties in creating a semi or fully decoupled site isn't in the RESTful part. Spitting out JSON is now covered by several modules, including [RESTful](https://github.com/Gizra/restful) which aims for a "best practices" solution.

One of the real problems, though, is how to prevent us, the community, from re-inventing the wheel over and over again. Basically, how do we package our frontend code similarly to how we package our generic backend code - AKA "modules". I discussed these problems, and offered some solutions in my "BoF" persentation:

<iframe width="560" height="315" src="//www.youtube.com/embed/wh6ZQOEzOgs?rel=0" frameborder="0" allowfullscreen></iframe>

<!-- more -->

## What's next, and why you should care
RESTful is constanly being improved, with solving _real use cases_ always on our mind. [Mateu Aguiló Bosch](https://github.com/mateu-aguilo-bosch) has recently worked and polished the "data provider" functionality.  
RESTful now allows you to easily expose different data providers, be it your entities using EFQ, your variables table using a simple DB query, or your Solr instance using a Search API data provider. Exposing your _access controlled_ Solr search to your web app, has just become significantly easier - stay tuned for new updates in this space.


Also, wouldn't it be cool if your fully decoupled Angular app also supported Angular-based content administration? It's called [ng-admin](http://ng-admin.marmelab.com/#/dashboard) and it's doing some serious heavy lifting so we don't have to.

You know what would be even better? If one wouldn't even need to configure ng-admin at all, and it would use the ``OPTIONS`` method to discover allowed methods and get info about fields (e.g. required, type, allowed value, etc'). Jump into the issue queue, of RESTful or ng-admin, and help make this a reality - in a standarized way that everybody can enjoy!


Even if you don't care about RESTful for some reason (hard to imagine), it's worth looking at - not many modules follow such a strict TDD (Test Driven Development).

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p>TDD in Drupal7 may be slow, but it is possible. We are doing it in the <a href="https://twitter.com/hashtag/RESTful?src=hash">#RESTful</a> module. <a href="http://t.co/g5ZEgBv97n">http://t.co/g5ZEgBv97n</a> <a href="http://t.co/vqznWF8NGw">pic.twitter.com/vqznWF8NGw</a></p>&mdash; Mateu Aguiló (@e0ipso) <a href="https://twitter.com/e0ipso/status/522744279387893762">October 16, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>