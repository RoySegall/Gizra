---
title: Zariz Static
layout: post
tags:
  - Zariz
  - "Drupal-planet"
permalink: "/content/drupal-x5-faster"
layout: post
title: "Drupal, only x5 faster"
---


This is the ``live`` branch on the Drupal site
![]({{BASE_PATH}}/assets/images/posts/zariz-static/1.jpg)

This is the static site created out of the live site. It looks the same, but loads x5 faster.
![]({{BASE_PATH}}/assets/images/posts/zariz-static/2.jpg)

<!-- more -->

The static site was created using the [Zariz generator](https://npmjs.org/package/generator-zariz), and executing ``grunt stage``.
For scalability reasons, the grunt task asks from the Drupal site only for the incremental changes by calling ``/zariz-pages``. The output is a JSON with the pages that need to be grabbed.

```javascript
{
  insert: [
    "node/2",
    "node/3",
    "node/4",
    "node/5",
    "index.php"
  ],
  delete: [ ]
}
```

We create a new branch and add new content ...
![]({{BASE_PATH}}/assets/images/posts/zariz-static/3.jpg)

... and merge it back to the live branch.
![]({{BASE_PATH}}/assets/images/posts/zariz-static/4.jpg)

The output of ``/zariz-pages`` reflects the changes

```javascript
{
  insert: [
    "node/7",
    "index.php"
  ],
  delete: [ ]
}
```

The static site was updated.
![]({{BASE_PATH}}/assets/images/posts/zariz-static/4.jpg)
