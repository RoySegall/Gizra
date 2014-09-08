--- 
tags: 
- Drupal-planet
- Group
- OG
permalink: /content/group-intro/
title: Group (the new OG) intro
created: 1273414312
layout: post
---
 In the past few month, since Drupalcon Paris, I was busy upgrading Organic groups (a.k.a OG) to Drupal7. I'd like to give a quick overview of what has been done, what needs to be done, and the changes that came with the upgrade.

The first noticeable thing is that like Ubecart became Commerce, Organic groups has changed its name to <a href="http://drupal.org/project/group">Group</a>. The second thing you will notice, is that Group is a complete rewrite of OG! Why was it done? OG is a great module, and it has been around for a long time. Long enough to be very popular and feature rich, but on the same time, concepts and implementations that were right in earlier Drupal versions became outdated. Using Drupal 7 new features - especially field API - were too hard to resist.

Here are the Group's main concepts, by importance:
<ol>
<li>Allow associating entities (e.g. node, users, etc'.) to other entities - In plain English it means that you can have posts related to a group. Not more, not less</li>
<li>Introduce the concept of roles and permissions, on the group level</li>
<li>Provide integration with superior modules such as Views. We don't need to invent the wheel - just need to know how to hook into an existing one</li>
</ol>

Writing those concepts down made it easier to determine what should be in the core of Group and what should be a contrib module. The UI was separated to another module as-well, leaving us with a Group API module, that has as little assumptions as possible about how it will be used.

<!-- more -->

Time for the quick demo:
<object width="640" height="385"><param name="movie" value="http://www.youtube.com/v/vDtFJyfGEaE&hl=en_US&fs=1&rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/vDtFJyfGEaE&hl=en_US&fs=1&rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></embed></object>
(As always -- <a href="http://docs.google.com/Doc?docid=0Ad43t2AqZZxCZGNwM3QzbXNfMjAwYzhrc3QyZDY&hl=en">The screencast script</a>)

So, what is left to do? In a nutshell:
<ul>
<li>Upgrade path and add missing fields (group language and group theme)</li>
<li>Finish Views integration</li>
<li>Reach 100% test coverage</li>
<li>Document everything</li>
<li>Probably lots of other things I hope the community will bring up</li>
</ul>

Lets work on making Group the best module for groups in Drupal 7!
