---
tags:
- Drupal-planet
- Message
permalink: /content/message-subscribe-new-subscription-system/
title: "Message-subscribe - A New Subscription System"
created: 1351684522
layout: post
---

> Drupal 6 had Messaging & Notification
> Drupal 7 has Message-subscribe & Message-notify

<a href="http://drupal.org/project/message_subscribe">Message-subscribe</a> is a new module in the Message stack, that finally ties everything together to give us the ability to subscribe to content, and send notifications.

If you know Message you already know that some development skills, or knowing Rules really really good are needed. This post will go over the main concepts and flow of the notification process.

Message-subscribe, just like Message module has zero knowledge about your business logic - it is up to you to implement the Message creation. What Message subscribe gives you, though, is one simple function your implementing module will call -- and that’s it. It will take care of it from there.

<!-- more -->

For example imagine an existing node, that people in the site want to subscribe to, and get notified about new comments.

### Subscribing to content
Subscribing is naturally done using Flag module. There’s no assumption related to the amount of Flags you have - as long as you prefix your flag name with ``subscribe_`` Message-subscribe treats it as a valid flag.

### Message creation

```php
<?php

/**
 * Implements hook_comment_insert().
 *
 * Send a message when a new comment is created to subscribed users.
 */
function foo_example_comment_insert($comment) {
  // Create a new message, assigned to the node author, and add a
  // reference to the comment, so we can later use tokens related to that
  // comment.
  $message = message_create('comment_insert', array('uid' => $comment->uid));
  $wrapper = entity_metadata_wrapper('message', $message);
  // There will be probably a reference field to the comment on the message itself.
  $wrapper->field_comment_ref->set($comment);

  // Let Message-subscribe save and send notifications.
  message_subscribe_send_message('comment', $comment, $message);
}

?>
```

As seen in the above code, our module created the Message it wanted and passed it along to ```message_subscribe_send_message()```. Let’s see what happens from there.

### Getting “context”
Drupal abuses the word context with so many meanings. Admittedly Message-subscribe is now also guilty. ``message_subscribe_get_basic_context()`` gets the entity type, in our case the comment, and extracts the related context -- the comment author, the node its related to, the taxonomy terms related to the node, the OG groups related to those nodes (you can add our own context as-well).
This context will help us in finding all the users that are subscribed directly or _indirectly to our node.

###Getting the subscribers
Next, Message-subscribe queries the valid flags, iterating over the results to get all the users that are subscribed. An alter hook allows you to change the list, or the values in that list. The values are which flags are responsible for the subscription and the “Message notifiers” (about that in the next section).

###Sending notifications
Before we talk about sending notifications, note that I never wrote the word “email”. Message-notify is a pluggable module, that allows you to add “Message-notifiers”. There’s a default implementation for email, but you are also able to add Text-messages, IRC, Fax or Postal-pigeons.

So, Message-subscribe iterates over all the users, and all over the notifiers, as in fact a user can get the same Message as email _and as a Text-message. I say same _Message as in same Message entity, not same message as message text -- In Message-notify you can have different text for different notifiers thanks to the module’s integration with view-modes.

###Bonus
* There’s a UI! We are showing tabs for every valid flag, and the content of that tab is a View. You can easily change the used View via admin settings <img src="http://drupal.org/files/project-images/message-subscribe.jpg" width="640" height ="214" />
* It’s a Message entity, right? So it means that the email you’ve just sent, can be saved and be used for an activity stream. 2 for the price of 1
* For a scalable solution, we are currently working - with a great help from fubhy - on implementing some sort of DrupalQueue to be able to process lots of Messages
