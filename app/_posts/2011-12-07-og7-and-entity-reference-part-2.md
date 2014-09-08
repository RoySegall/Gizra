---
tags:
- Drupal-planet
- OG7
permalink: /content/og7-and-entity-reference-part-2/
title: OG7 and Entity reference - Part 2
created: 1323296892
layout: post
---
Following my <a href="http://www.gizra.com/content/og7-and-entity-reference-sponsor-me">previous</a> post, and after getting some great reaction from the community via IRC and in Drupalcamp Toulouse, I’d like to share both my thoughts about the sponsoring and about the technical stuff.

The sponsoring, which already has <a href="http://funnymonkey.com/">FunnyMonkey</a> committing to pay almost half the price, and providing on top of that developer hours, was something I’ve decided to do only after I was convinced there are some big players using OG7.
The thing is that _anyway I intend to do this change. The sponsoring is just giving it a boost, and making sure it will be _sooner than later!

I’m happy I was able to post that request and to get good reaction from the community.
I’m equally happy that Planet Drupal isn’t swamped with such requests. It’s not about Drupal App. It’s about harnessing the community towards a goal. Companies offering to assist by providing developer hours is exactly the proof of that.

Now here’s a quick overview of the planned changes. First the conceptual changes:
<ul>
<li>Instead of OG having it's own field type, we easily hook into Entity reference field, as it allows registering our own handler using a CTools plugin</li>
<li>Instead of saving the field values _and the OG membership as we currently do, we save the OG membership, and use hook_field_load() to populate the Entity reference with the correct value. Yes, I know, the docs clearly say that we should not load fieldable entities in hook_field_load() as it might cause loading recursion, so we'll just make sure you can't attach group-audience fields to OG membership (which anyway doesn't make much sense). The benefit of doing that, after a long talk with the people form the community, notably fago (thanks again fago!), came out as the best solution for a problematic thing</li>
<li>OG membership is now tightly coupled with the field that it belongs to. This means we can care about the field cardinality (i.e. how many OG membership can be created per field), and since we know the OG membership type we can provide smarter metadata</li>
<li>We can have multiple fields, to allow subscribing users/ content to group with different membership type. No more hard-coding of the field name as-well</li>
</ul>

Sneak preview time...
As usual we can make a content type (Clubs in this example) a group, through the content type edit.

<!-- more -->

<img src="/assets/images/legacy/1.jpg" />

In the new version, when you want to make a content type (Post in this example) a group content, you immediately select to which group entity type, and optionally bundle the field should point. Making the reference to only a single entity type, allows us to have really simple integration with other modules (e.g. Views, Tokens, Rules) that expect the field value to be of the same entity type.

<img src="/assets/images/legacy/2.jpg" />

No more OG's own field -- this is just another Entity reference field.

<img src="/assets/images/legacy/3.jpg" />

In the field settings, we select OG's handler for Entity reference, where we can define different OG related settings.
The "My groups" checkbox indicates the reference should show the user only groups they are member of.

<img src="/assets/images/legacy/4.jpg" />

As we can attach multiple fields, it means the My group/ Other groups administrators used to see in the group-audience field, is no longer needed.

<img src="/assets/images/legacy/5.jpg" />

Best practice will probably be, show one field set to "My group" as select list, and another field for groups a user doesn't belong to as autocomplete (finally solving performance issues when there are lots of groups).
The primary field option, is better shown by example.

<img src="/assets/images/legacy/6.jpg" />

In this Post node, we can see the two fields. Remember, the groups shown in the My groups/ Other groups are user specific.

<img src="/assets/images/legacy/7_0.jpg" />

After selecting one group from each field and saving, we see that the values have "jumped" from the secondary field to the primary, making sure all our OG memberships are associated with a single field.

<img src="/assets/images/legacy/8.jpg" />

Looking in Devel's output we see the field values. Those values are not stored in the field's storage, they were populated based on the OG membership associated with the field. For those using Entity metadata wrapper, this means you can do (assuming your field is called og_ref) cool things like:

Getting the groups (i.e. the node that is a group) from a field
```$wrapper->og_ref->value();```

Getting the OG membership from a field
```$wrapper->og_ref__og_membership->value();```

<img src="/assets/images/legacy/9.jpg" />

The last image isn't related to Entity reference, but since we are about the overhaul stuff, well... We now have global roles and permissions per bundle. This means that if you have a content type called Clubs which is a group, it can have different default OG roles and OG permissions from a group called Restaurants. And we can Copy from the "super" global roles and permissions to the per bundle. Handy!

<img src="/assets/images/legacy/10.jpg" />
