---
title: Shoov - CI tests on the production server
tags:
  - Shoov
  - "Drupal-planet"
permalink: "/content/shoov-ci-production-server"
layout: post
published: true
---

{% include setup %}

As Shoov is evolving, and now has an example repo that can show you how UI regression can become simpler, we took some time to implement the second feature we were missing - automatic testing on the *live* site.

We saw a very strange situation everywhere we looked. Dev teams were writing amazing test coverage. They were  going the extra mile to setup a Travis box with environment as close as possible to the live site. They test every single feature, and added a regression for every bug.

And then the site went live. So they added Pingdom test for the live site to check it's live.


<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/shoov-intro/image1.gif">
  <div class="caption">UI regression checking in action</div>
</div>

<!-- more -->
