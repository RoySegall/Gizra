---
tags:
- Drupal-planet
- OG
permalink: /content/let-sleeping-dogs-lie/
title: Let sleeping dogs lie
created: 1278181343
layout: post
---
Here's the story in one (code) line:

```
find ./ -name *.* -type f -exec s -i "s/group/og/g" '{}' \;
```

For the humans amongst us, I'll explain. As part of the rewrite of Organic groups to Drupal 7, I thought that the name also deserves a rename -- to follow Drupal's naming standards. Since there weren't enough votes in the <a href="http://groups.drupal.org/node/75988/">poll</a> in g.d.o I've decided _not to go with the change. OG module will keep its name - although in the UI we will use "Group" (the same way as node is refereed to as content).

<!-- more -->

I'll commit all the changes that are currently in github back to OG's cvs, after <a href="http://drupal.org/node/629484">Add entity key label</a> will land.

Yet another advantage of <a href="http://cyrve.com/d7cx">#d7cx</a> - decisions can be undone.
