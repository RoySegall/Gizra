---
tags:
  - Zariz
  - Dekyll
  - CMS
  - "Drupal-planet"
permalink: "/content/zariz-means-agile"
title: Zariz Means Agile
layout: post
published: true
---


[Zariz](https://github.com/Gizra/zariz) is a new project we're working on. The word means "quick", or "agile" in Hebrew. We've began working on it when we hit some bumps working on Dekyll.

### Dekyll Frustrations

Dekyll was Jekyll based. We love Jekyll - it powers our own site, and in fact I'm writing this blog post with the excellent Prose.io. But for Dekyll we wanted to stay close to Drupal, keeping the various abilities it developed over the years like fine grained access control, workflows etc and allowing users to stay within an environment they already know.

Relying on Jekyll added another component to the system. A very good one, but still with its own requirements and needs. We wanted to simplify, and minimize the number of moving parts.

### A New Beginning

So we were back at the drawing board. Around that time I saw Clay Shirky's [Ted talk](http://www.ted.com/talks/clay_shirky_how_the_internet_will_one_day_transform_government.html). When he gave that funny yet precise explanation about why lawyers don't use Git, I realized something.

<!-- more -->

As developers, we make a point of working with a version control system. We write branches for new features so we can see how they work before launching them. We can rollback. We can see diffs between different versions. And we never work directly on the production site. It seemed to me these best practices could be used not just in code, but in content as well.

I'm not thinking about a single article page, but the whole site - say I change a story title, I want to see it reflected in the story page, home page, category page etc - before I release it to production.

And of course, it should be fast. Super fast.

Here are the key concepts of Zariz:

1) __Keep Drupal as Backend__
We want to let users stay in the environment they know, with the tools and capabilites they're used to.

2) __Model the content creation around Git__
We have a "live" branch (the equivalent of "master" in git repositories), which is in fact just a an OG group. Nodes cannot be created in that branch, only on "development" branches. Thus every content change can be seen in context of the entire site, on its branch.

3) __Use Git for deployment__
We want to ``git push`` our _content_ as well as our code. Jekyll taught us the importance of using a proper build tool. We have a [Grunt](http://gruntjs.com/) task that grabs the HTML from Drupal, as well as all the assets, and pushes them to GitHub Pages, while making use of Grunt's existing deployment tasks for image minification, JS and CSS concatenating etc.

To make it easier to setup Grunt, we've created a Yeoman generator. A simple ``yo zariz`` should get you to the point where the system is operational, and you can add your customization.

![]({{BASE_PATH}}/assets/images/posts/zariz/generator-zariz.jpg)

It's all still very early. The code is far from production. But if you like the concept of bringing Git best practices to the content world, here's what we got so far:

* [zariz](https://github.com/Gizra/zariz) - A Drupal module that provides API on top of Organic groups, to manage branches and "snapshots" of content.
* [generator-zariz](https://npmjs.org/package/generator-zariz) - A Yeoman generator used for scaffolding.
* [zrizi](https://github.com/Gizra/zrizi) - A Drupal theme that is mostly used for example purposes, with the idea that the CSS and JS used should be whitelisted, so it is in sync with the CSS and JS on the Grunt side.
