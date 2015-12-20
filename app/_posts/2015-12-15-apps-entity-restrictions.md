---
title: Drupal, Hippies and backend restrictions
tags:
  - restful
  - "Drupal-planet"
permalink: "/content/apps-entity-restrictions"
author: RoySegall
layout: post
published: true
---

{% include setup %}

Have you ever heard on the Burning man project? No? Three months earlier neither
am I. I can describe it in one simple sentence: a lot of Hippies settle down in
the desert for couple of weeks and set up small camps as part of a big city when
each camp have it’s own theme.

And here I am going to the hackathon of the local Burning man community as an
enthusiastic Drupal developer willing to solve any Drupal issue. My part was to
write the backend part. The obvious choice was the Restful module. But then I
came across a big problem: How can I manage 3rd party applications and make sure
they can’t access resources which they should’nt access? How can I prevent from
the secret santa application(the app will provide addresses of other Burning man
attendees so they could receive gifts) to access the user’s medical qualification
field?

<!-- more -->

In this cliffhanger my solution appear wrapped in a form of a new module. I’m
presenting you the module `Apps entity restrictions`. The module create third
party application representation when you can decide which field/property each
application can access on each entity and even restrict the operation type:
create, read, update or delete.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/apps-entity-restrictions/aer.gif">
  <div class="caption">Creating apps and restrictions is very easy.</div>
</div>

But the UI is one thing. While working on Gizra’s modules and projects in the
past years I came to realize that a good API is one things responsible for a
good module. By default, any app is restricted from doing any operation. Creating
application with allowed GET operation on the body and the node ID is very easy:

```php
<?php
$app
  ->setTitle('Demo application')
  ->allow('node', 'methods', 'get')
  ->allow('node', 'properties', 'nid')
  ->allow('node', 'properties', 'body')
  ->save();
```

Checking restriction via code is very easy:

```php
<?php
// Check property access.
if (!$app->entityPropertyAccess('get', 'node', 'nid')) {
  drupal_set_message(t("This apps have no access in GET request for the node's nid.", 'error'));
}

// Check field access.
if (!$app->entityPropertyAccess('get', 'node', 'field_date')) {
  drupal_set_message(t("This apps have no access in GET request for the node's date field.", 'error'));
}
```

The first statement won’t set any message since we did not restrict the
application from the nid property but we didn’t allowed access to the field date.
Therefor, we will get a warning message.

## restful integration and other bonuses

There is a cool and easy restful integration. The module provides a set of
[API](https://github.com/RoySegall/apps_entity_restrictions#restful-integration)
for developers to get this restriction validation on their endpoint very easily.

The next evolution would be more oriented toward statistics. Yes, it’s sounds
very dull and not sexy but imagine you could know the usages for each
application? Knowing the amount of requests, failed and passed, is a grate tool
and could detect tryings for hijacking information from un-authorized source.
What about notify the application owner when a request failed with email or a
push notification? Sounds cool, no?

The last part is still under development but for now looks very promising.
