---
title: Zariz Loves Entity Reference
tags:
  - Zariz
  - "Drupal-planet"
permalink: "/content/zariz-entity-reference"
layout: post
published: true
---


Zariz is now integrated with entity reference and is "branch" aware. This means
that the reference will change on the fly. For example:

<!-- more -->

This node is referencing another node
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/2.jpg)

We create a new branch...
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/3.jpg)

... and edit the referenced node
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/4.jpg)

Now, when viewing the referencing node again under the new branch, you can see
Zariz took care of the reference:
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/5.jpg)

And the widget was smart enough to reflect the new changes!
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/6.jpg)

Zariz is now becoming a pretty good example of implementing Entity reference behaviors plugins - take a peek at the code to see how we add a UUID value to each entity reference item
![]({{BASE_PATH}}/assets/images/posts/zariz-entity-reference/7.jpg)
