---
tags:
- Drupal-planet
- CTools
- Message
permalink: /content/message-module-and-ctools-plugin/
title: Message module and CTools $plugin
created: 1276169995
layout: post
---
If I may quote myself:
 <blockquote>I'm thinking, _which is easier than actually sitting down and writing a patch, that it would be neat if CTools exportables plugin had a uniform UI that modules such as Context, Message and others to come, could use. </blockquote>

We're in a scratch your own itch world aren't we, huh? So I've created a CTools repository in github, created a branch called export-ui and it resulted with this <del>getting-close-to-commit</del> committed <a href="http://drupal.org/node/787644">patch</a>.

When I started writing <a href="http://drupal.org/project/message">Message</a> I had some understanding of how CTools exportables work but having merlinofchaos review my work, explain some of his thoughts and providing his golden code, really changed the way I look at writing generic and reusable code. In fact, I've decided to overhaul much of the Message module for it to be more inline with CTools' standards.

Message was a inspired by Context module. Context uses some object oriented, so I've copied that too. That's where I got it wrong - because my use case was a bit different. OOP is powerful _when it's needed but sometimes it might be an overkiller. Ok, so no OOP, but I still needed a pluggable system. CTools has the $plugin concept. Its almost the same as having an info hook, only it's without a hook - you place it directly on an ```inc``` file that CTools will include for you when its needed. But the "trick" that I've learned - and there shouldn't be any drum rolls cause it might be obvious - is to use a "process" function that populates the $plugin with defaults. The defaults can be for example the callbacks that will be used, the Views handlers that will be automatically declared, the text strings, the allowed operations, etc'. Basically, when you use the $plugin, you should be thinking how an extending module can alter the module's behavior by simple changes.

<!-- more -->

For example here's all the code needed to define an Organic groups realm, which means you can make messages accessible only to users that are subscribed to a group:

```php
<?php
// Message plugin deceleration.
$plugin = array(
  'realm' => 'og',
  'title' => t('Organic groups realm'),
  'description' => t("Determine access by a user's membership in a group."),
);

/**
* Get all groups a user belongs to.
*/
function message_plugin_og_accessible_ids($account) {
  return array_keys($account->og_groups);
}
?>
```

Tada! Message is taking care of all the rest.

To sum it - Message is trying to follow CTools' idea  - do the heavy lifting for you by assuming sensible defaults, but still allow you to change the behavior by as little code as possible.

If you can completely disregard the news and politics then dang - these are happy times!
