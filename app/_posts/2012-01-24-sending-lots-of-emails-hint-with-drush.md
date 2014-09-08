---
tags:
- Drupal-planet
- Message
- Drush
permalink: /content/sending-lots-emails-hint-drush/
title: "Sending LOTS of emails (Hint: with Drush)"
created: 1327404852
layout: post
---
On my <a href="http://www.gizra.com/content/message-notify-multilingual-email-notifications">last blog</a> post I talked about Message notify module, and mentioned we were using it to send digest emails. While Message notify really eases the pain of creating personalized emails, and sending them, we still needed to find a scalable solutions for sending lots of emails. LOTS of emails!

Doing it on hook_cron() is nice if you need to send few emails, but when you need to send thousands of emails a day, it won’t do. Cron will take too long, or might hang up if we try to process too many digest emails at once.

A nice and simple solution we came up with, was to write a Drush command that will process a small batch of users, and use Jenkins to fire up this command every two minutes.

This post will demonstrate the code, that can be used by others - however you will need to copy and change the command to fit your business logic.

<!-- more -->

Assuming our module’s name is foo, you will need to place your code in ```foo.drush.inc```:

```php
<?php

/**
 * @file
 * Drush integration of Foo module.
 *
 */

/**
 * Implements hook_drush_help().
 */
function foo_drush_help($section) {
  switch ($section) {
    case 'drush:foo-digest':
      return dt('Send digest emails.');
  }
}

/**
 * Implements hook_drush_command().
 */
function foo_drush_command() {
  $items = array();

  $items['foo-digest'] = array(
    'callback' => 'drush_foo_digest',
    'drupal dependencies' => array('foo'),
    'description' => 'Send digest emails.',
    'arguments' => array(
      'range' => 'The number of users to be processed.',
    ),
    'bootstrap' => DRUSH_BOOTSTRAP_DRUPAL_FULL,
    'aliases' => array('fdg'),
    'examples' => array(
      'drush foo-digest' => 'Process 10 users.',
      'drush foo-digest --range=50' => 'Process 50 users.',
    ),
  );

  return $items;
}

/**
 * Callback function for sending digest email command.
 */
function drush_foo_digest() {
  if (!lock_acquire('foo', 240.0)) {
    // Digest is already processed.
    drush_log(dt('Attempting to re-run foo digest command while it is already running.'), 'notice');
    return;
  }
  $range = drush_get_option('range', 10);
  // This function should be replaced by your function that gets all the
  // users that need to get the digest email.
  $uids = foo_get_digest_users($range);
  if (!$uids) {
    drush_log(dt('No users found for digest.'), 'ok');
  }

  // This function should be replaced by your function that will send the
  // emails (maybe by using Message notify), and is expected to return
  // the user IDs of the successful emails.
  $return = foo_process_digest($uids);
  $params = array(
    '@uids' => !empty($return) ? implode(', ', $return) : 'none',
  );

  drush_log(dt('Users IDs that got email: @uids.', $params), 'ok');
}
?>
```

Note the code comments - you are expected to replace foo_get_digest_users() and foo_process_digest(). Btw, in those functions, I’ve added debug messages like this.

```php
<?php
  if (function_exists('drush_log') && drush_get_option('verbose')) {
    drush_log(dt('Digest email to user @uid could not be sent', array('@uid' => $account->uid)), 'ok');
  }
?>
```

After that, all you need to do is create a new Jenkins job.
<img src="/assets/images/legacy/digest_dev_Config_Jenkins.jpg" />


<a href="http://getpantheon.com">Pantheon</a> gives us this flexibility, here's the console log:
<img src="/assets/images/legacy/digest-console.jpg" />

Don't forget to use <a href="http://drupal.org/project/reroute_email">Reroute email</a> so your users don’t get dummy emails form your Dev and Test environments.
