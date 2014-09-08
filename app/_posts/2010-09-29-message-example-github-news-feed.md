---
tags:
- Drupal-planet
- Message
permalink: /content/message-example-github-news-feed/
title: Message example = Github news feed
created: 1285758302
layout: post
---
It's time for some P.R. (Public relations) on the <a href="http://drupal.org/project/message">Message</a> module, and the best way is a Message example module that loosely imitates Github's news feed feature.

I won't get into too much explanation here, just look at the screenshots, or try it yourself - since everything in Message is exportable, you don't need to do anything to make it work! (Apart of generating nodes and "making friends" by flagging other users).

<!-- more -->

```
# Download necessary modules, in case you still don't have them.
drush dl ctools message flag views

# Enable the message example module.
drush en message_example -y

# Use Devel module to generate users and content.
drush dl devel
drush en devel_generate -y

# Generate  10 users.
drush genu 10

# Generate 25 story nodes with 5 comments in each node.
drush genc 25 5 --types=story
```


Navigate to /messages or click on the "News feed" on the navigation menu, and you will be presented with the different tabs - all created with Views and a bit of CSS.

As you can see, at the beginning there are no records in the "News feed", because you still don't follow anyone. Go to the "All feeds" tab, click on one of the user's and flag the user or flag a specific node. Back in the "News feed" you will now see all the activity of the users and nodes you follow.

<img src="/assets/images/legacy/snap1.jpg"/>

<img src="/assets/images/legacy/snap2.jpg"/>

<img src="/assets/images/legacy/snap3.jpg"/>

<img src="/assets/images/legacy/snap4.jpg"/>

<img src="/assets/images/legacy/snap5.jpg"/>

If you are not a developer worry not (although if you are a bit familiar with code, the message_example.module has lots of documentation), you can still use the Message module, thanks to its Rules module integration.

So, what do you think about this P.R. ?
