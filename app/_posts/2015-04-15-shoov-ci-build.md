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

As Shoov is evolving, and now has an example repo that can show you how we are trying to make UI regression simpler, we took some time to implement the second feature we were missing - automatic testing on the *live* site.

We saw a very strange situation everywhere we looked: Dev teams were writing amazing test coverage. They were going the extra mile to setup a Travis box with environment as close as possible to the live site. They tested every single feature, and added a regression for every bug.
Damn, on every commit there was a test suite of at least one hour that was running before being carefully reviewed and merged.

And then the site went live - they simply added Pingdom test for the live site to check it's live. Pingdom - as in lets send an http request every minute to your site. If the answer is 200 - it means that all is good in the world.

Our mission is to change this, and bring functional testing to the live site.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/shoov-ci-build/image1.jpg">
  <div class="caption">Drupal holds the CI build data, including the full log, and status</div>
</div>

While Pingdom is awesome and has alerted us on time and prevented trouble, it's "page is fine, move along" doesn't cut it for us. Here are some good examples why it's needed:

<!-- more -->

1. Your clients might have too much power assigned to their role, and they might touch by accident something they shouldn't have. Wouldn't you like to know if suddenly the "Latest news" in your home page is gone?
1. Your live site is composed from different widgets from different providers. Facebook comments, StripeJs payment system, Youtube videos. You have no control over those providers, and you can check their status page constantly.
1. Your site got hacked, and they changed everything. You really want to get red alerts when that happens, but Pingdom, nor Loggly won't help you here.
1. Your Solr server got erased, so your search page is still working, but has 0 indexed items. As an example, a simple Behat test could have been added to check the number of indexed items that appears on the page isn't below 1000, and alert you if that's not the case.

## The Plan

What we are currently building a system that simplifies the task of hooking your site to a testing system. We can't rely on systems like Travis, as awesome as they are, they are tightly coupled with being triggered by a commit action.
There are workaround for that, and Circle CI does allow invoking a build from a REST api, but triggering it on the right time, notifying the right people (not just the build author), preventing overflow of emails when error occurs - all that which is the core if what we are planning isn't there.

Here are some of the high level concepts that help us find our way:

1. Open Source all our work, and don't be afraid to fail fast
1. Make the service rely on GitHub - the same way Travis does. Unlike other similar services that force you to a specific testing tool, or require you to copy paste a script into their web UI - Shoov uses your testing tool, which is tightly coupled to your repo.
1. Don't build it as a product to be monetized. If we could one day charge premium features it would be great, but that's not the incentive. We focus on solving _our_ problem first - this assures the solution is "real". The matrix to assess if we succeeded is simple - where we able to _save_ money by better monitoring our sites

The backend part is almost done, so our next task is to have a UI that help connect GitHub repos to Shoov. You can expect something similar to the interface Travis provides - a simple checkbox to enable or disable the service. From there it will be up to you to add a ``.shoov.yml`` file to the repo, and write some actual tests
