---
tags:
- Hacks
- Drupal-planet
permalink: /content/how-deal-colliding-aliases/
title: How to deal with colliding aliases
created: 1330604300
layout: post
author: RoySegall
---
Here's a common problem with aliases:

* ``users/[user:name]/blog`` -- This is a page defined by Panels. It shows a list of latest blog posts
* ``users/[user:name]/blog/[node:title]`` -- This is the alias of the node that is a blog post. But if you will try to use it, Drupal thinks you refer to the Panels page, and shows you the lastest blog posts, instead of the node

<!-- more -->

Here’s a short snippet, we use to easily overcome this issue.

```php
<?php
/**
 * Implements hook_init().
 */
function my_module_init() {
  $args = explode('/', $_GET['q']);
  // Verify that the path is /users/%/blog/% and not /users/%/blog.
  if ($args[0] == 'users' && $args[2] == 'blog' && !empty($args[3])) {
    // Getting the full node path given by drupal.
    if ($path = drupal_get_normal_path(implode('/', $args))) {
      // Set the menu item to the node.
      menu_set_active_item($path);
    }
  }
}
?>
```

In ``hook_init()`` we check the URL and count the arguments to see if we are in a node context -- in our case the node has 4 arguments, while the blog post list has on 3). The function ```drupal_get_normal_path()``` will give us a node/nid that have a alias with the pattern we checked.
Using ``menu_set_active_item()`` we  force Drupal to show us the node.
