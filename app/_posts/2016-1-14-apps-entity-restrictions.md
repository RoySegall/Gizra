---
title: Drupal, Hippies and Backend Restrictions
tags:
  - restful
  - "Drupal-planet"
permalink: "/content/apps-entity-restrictions"
author: RoySegall
layout: post
published: true
---

{% include setup %}

You might have heard of [Burning Man](http://burningman.org/). Basically it's lots of hippies settling down in the desert for a couple of weeks and set up small camps as part of a big city where
each camp has its own theme.

It's not for me.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/apps-entity-restrictions/burner.jpg">
  <div class="caption">Radical Self-expression is one of Midburn 10 principles. Copy rights reserved to Eyal levkovich</div>
</div>

And yet, I found myself going to the hackathon of the local Burning man community
as an enthusiastic Drupal developer willing to solve any Drupal issue (and you can assume they had a few). My part was to write the backend, and the obvious choice was using Restful module.

Then I came across a big problem: How can we manage 3rd party applications and make
sure they can't access resources which they shouldn't have access to?
How can we prevent from the Secret Santa application (an app that provides addresses of other
Burning Man attendees so they could receive gifts) to access the user's medical
qualification data?

<!-- more -->

<div class="thumbnail">
    <iframe src="http://gfycat.com/ifr/FragrantUnequaledHerculesbeetle" frameborder="0" scrolling="no" width="800" height="600" style="-webkit-backface-visibility: hidden;-webkit-transform: scale(1);" ></iframe>
  <div class="caption">Creating apps and restrictions is very easy.</div>
</div>

[Apps Entity Restrictions](https://github.com/RoySegall/apps_entity_restrictions) is the answer.

With this module suite you can create 3rd party application representation where you can decide which field or property each
registered application can access on each entity. You can even restrict the allowed CRUD operations.

While working on Gizra's modules and projects in the past years I came to realize that a good API and a good DX is the one thing responsible for a good module. By default, any app is restricted from doing any operation - you know, security.

Progrmatically creating an application with allowed `GET` operation on the body and the node ID is very easy:

```php
<?php
$app
  ->setTitle('Demo application')
  // Allow only GET operations.
  ->allow('node', 'methods', 'get')
  // Explicitly allow access to both properties/ fields.
  ->allow('node', 'properties', 'nid')
  ->allow('node', 'properties', 'body')
  ->save();
```

Checking those restriction via code is also easy:

```php
<?php
// Check property access.
if (!$app->entityPropertyAccess('get', 'node', 'field_address')) {
  throw new \Exception("This app has no GET access to the address field.");
}
```

## Restful Integration and Other bonuses

There is a cool and easy restful integration. The module provides a set of
[API](https://github.com/RoySegall/apps_entity_restrictions#restful-integration)
for developers to get this restriction validation on their endpoint. If you are dealing with a decoupled Drupal, you should probably look at this.

The next step is baking more statistics in. Wouldn't it be great if you could know the usages for each
application? Knowing the amount of requests, failed and passed, is a great tool
and could detect tryings for hijacking information from un-authorized source.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/apps-entity-restrictions/report.png">
  <div class="caption">Graphs can be cool two.</div>
</div>
