---
tags:
- Drupal-planet
- tutorial
- CTools
permalink: /content/ctools-context-tutorial/
title: CTools context tutorial
created: 1305097489
layout: post
---
Why should you use panels node-preview-example module? You shouldn't, it's just an example ;)

This post covers how to build a CTools content-type plugin that has context. CTools "Context" should not be mistaken with the context module. Context is CTools way of saying, my plugin (read, block) shouldn't be dumb. If it requires a node or a user to extract data from, then it should let others know about it. "Others" in our case is Page manager module. It will load the context for the plugins and hand it over. In fact, if the context is not present it will not even bother loading the plugin.

I have created an example module called node-preview-example, that you can simply download and enable, create an Article page, and see how Panels is now showing the body field on the left and on the right a (silly) "Summary" of the node -- this is our plugin.

<!-- more -->

```
drush dl ctools panels features
drush en ctools page_manager panels features
```

And the example module is in my <a href="http://drupal.org/sandbox/noam.hrz/1148086">sandbox</a>:
```
git clone http://git.drupal.org/sandbox/noam.hrz/1148086.git node_preview_example
```

Let's go over the important parts in the code.

```php
<?php

/**
 * Plugin definition.
 */
$plugin = array(
  ...

  'required context' => array(
    new ctools_context_required(t('User'), 'user'),
    new ctools_context_required(t('Node'), 'node'),
  ),
  ...
);
?>
```

The plugin definition  is where we let the system know we need a user object and a node object to operate on.

Next the render callback can use those context, after making sure they are valid.

```php
<?php
/**
 * Render callback.
 */
function node_preview_example_summary_content_type_render($subtype, $conf, $args, $context) {
  // Seperating the context to two different variables
  list($user_context, $node_context) = $context;

  // Make sure that context variable arent empty.
  if (empty($user_context) || empty($user_context->data)) {
    return;
  }

  if (empty($node_context) || empty($node_context->data)) {
    return;
  }

  // Above we made sure we got the context.
  $node = $node_context->data;

  ...
}
?>
```

As you can see, it didn't take much to get the context working, but it gives a lot of power:

<ul>
<li>Plugins without satisfied context will not appear in the plugins list, so a user can't add them by mistake</li>
<li>There is one single way for plugins to get a context, unlike "dumb" blocks that each one needs to find out where they are (e.g. ``menu_get_item()`` over and over again).</li>
</ul>

If you listen to talks about Butler module, and having a plugin and context system in D8 - it will probably very similar or at least learn a lot from CTools plugins and context system, so you know you are on the right path.
