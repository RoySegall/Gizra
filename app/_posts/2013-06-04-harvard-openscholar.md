---
layout: post
title: "Harvard's OpenScholar"
description: ""
category: 
tags: [Biblio, OG7, Drupal-planet]
---

When people ask you about big projects done with Drupal, what's the _second_ item on your list? I know the first one is [WhiteHouse.gov](http://www.whitehouse.gov/) - that's not Drupal's foot in the door, it's the foot that broke the door.

I'd like to share with you the second item on our list. Harvard. Seriously. If it's the first time you hear that Harvard is using Drupal, or that they have an amazing distribution they work on called [Harvard OpenScholar](http://openscholar.harvard.edu/), or that they have a team of five developers along with two developers from Gizra and a many <a href="http://hwp.harvard.edu/people">others</a> working on it <em>full time</em>, or you are not aware to the amount of contributions given back to the community... You do now.

<!-- more -->

### Should I use it?

* Do you run a university site, where each department or professor can have their own "mini-site"?
* Would you like the Harvard team to help you out with your installation?
* Do you trust a distribution where every commit is automatically tested by Behat, *and* a dedicated QA team?

I think I see a few people getting excited. You should. Oh, and in case you don't want the whole distribution, it still makes _a lot_ of sense for you to use it as reference for things you want to do in your own distribution. Cross pollination and all that.

### Theory aside

OpenScholar has been around for a while, and has a large userbase whose needs have to be taken into account. For example, when we started developing along their team, it was hard for me to understand why we don't use Panelizer for the layout management. A year later I know why: Because the professors need a layout system. And they need it now. And they need it in a very specific way.

Sometimes, the project leaders, Ferdinand Alimadhi and Richard Brandon, are forced to put aside the purist developer hat, and make hard calls like developing a custom system, until contrib modules mature (Panelizer *is* now mature, by the way, the above example is from many moons ago).

So, theory aside, when they wanted to upgrade from Drupal 6 to 7, they used migrate module, and treated the Drupal 6 database as an external database. A purist might argue that ``hook_update_N()`` is the "right" way, but after seeing how they did it, I can't think of a better way to get the work done. Fast, efficient, testable, and yeah - admittedly not the standard way.

### Automatic Testing

Since OpenScholar is hosted in GitHub it was possible to set it up so that each and every single commit is being tested by [Travis-CI](https://travis-ci.org/) with our Behat test suite. Not a lot of Drupal 7 distros come with a functional test suite. OpenScholar does!

### Organic Groups

Obviously the use of OG in OpenScholar is massive.

Being used in OpenScholar, Acquia Commons and OpenAtrium, each for a different use case, demonstrates OG's maturity and flexibility. It got there largely thanks to OpenScholar's continued sponsorship of Gizra's work, which enabled us to contribute to the community in turn. If you use OG-Vocab in particular, you should buy Ferdi or Richard a beer next time you see them.

OpenScholar provides a lot of customization options to the group owner. Using Boxes module, they expose custom "widgets" that allow one to restructure their page as they wish. A feature I often hear users ask for already exists in OpenScholar in the form of "Apps". You can enable, disable or set a "feature" (e.g. blog), and have different settings for your app. We use the Spaces module to implement this.

This lets OpenScholar fulfill the specific needs of different departments, which has made it the basis for Harvard's [Department of Economics](http://economics.harvard.edu/) and [Department of Chemistry & Chemical Biology](http://chemistry.harvard.edu/) sites, along with many others.

### Citations, Plugins and Biblio

Another big module in OpenScholar is Biblio, which is in charge of showing publications and citations. This is surprisingly complicated. There isn't _one_ right citation format. The CiteProc standard alone includes more than 2,000 different styles. Basically, each organization invents their own citation style, and they are extremely pedantic about each semicolon's position.

Obviously, this means the module handling the citations should be very flexible. The current development branch of Biblio module is taking some good steps in that direction, and after spending a year working with citations we have some [ideas](https://drupal.org/node/1973706) for new features, which we're working on [here](https://github.com/amitaibu/biblio).

Basically we want Biblio to be fieldable entity, and It should allow code like:

```php
<?php

$biblio->getText('citeproc', array('style_name' => 'chicago-author-date'));
```

So, the same entity "knows" how to render _itself_ using different styles. This is done thanks to the use of Plugins, which we prefered to alter hooks in this case, since it lets us add some encapsulated code pieces, each dealing with its own little scenario.

Since so many universities and libraries are using this module, I'd like to encourage the community to join in. Enable the Biblio example module, and see it in action. We're also working on Migrate from the 1.x branch to the new branch - as I wrote above, we are not just dealing with theory, we need to make it work!

There a tons of other features in OpenScholar, I'll let you dig in yourself. Perhaps by now the question I started this post with will change to "What's the _third_ big project you tell to your clients?"

