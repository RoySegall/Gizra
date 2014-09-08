---
tags:
- Drupal-planet
- OG7
permalink: /content/og7-and-entity-reference-sponsor-me/
title: OG7 and Entity reference - Sponsor me
created: 1321788268
layout: post
---
<ul>
<li>Update 3: <a href="http://treehouseagency.com/">Treehouse Agency</a> are sponsoring and providing developer help</li>
<li>Update 2: Dev version is out</li>
<li>Update 1: <a href="http://funnymonkey.com/">FunnyMonkey</a> are sponsoring and providing developer help</li>
</ul>

I was walking back home from work and thinking to myself Drupal thoughts. One of the thought was about OG7 and its use of "group" entity. At the time of writing OG it seemed as a good idea. It allows flexibility of showing all the groups of the site, without worrying what entity type they are (as the group ID isn’t equal to the node ID).
It also allows easier internalization of group nodes, as again the group ID isn’t the node ID.
In a very Drupal like way, in the other side of the world, a day later fago was asking the same question.

After more than a year that OG7 is out, it seems that the flexibility of showing all the groups at once has a price in complexion. It makes Views require one more relationship. It makes Panels require one more relationship. It makes creating Rules and using tokens a non-intuitive task.
I've opened a new <a href="http://drupal.org/node/1342632">issue</a>, with one thing in mind -- deprecating the group entity, and making OG even slimmer and even more robust.
The idea is to rely on the new kid on the block - Entity Reference, which means your reference field will know how to reference a group of a single entity type. That change will result with changing the signature of a lot of function in OG (i.e. instead of passing the group ID, one will have to pass the entity type of the group, and the entity ID of the group), but it will also result with better UX and DX.

The idea is to create a 2.x branch, to allow people to migrate from 1.x. I honestly don’t think it will be very painful, as I’ll provide automatic migration of data. So it will be just a matter of updating the Views, Panels and custom code.
In the above issue there are already comments from known community members giving it a big +1, and saying "Let’s see this sooner than later". I also want to see this happening _fast, but my time resources are not enough.

I’m looking for someone to sponsor this huge and non-trivial feature, which will cost US$7,500
Please do <a href="http://www.gizra.com/contact">contact</a> me if you are interested. I will credit you on the OG module page, in the README file, and on this blog. The community will thank you greatly.
