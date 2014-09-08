---
tags:
  - Project management
  - Drupal-planet
permalink: /content/the-gizra-way/
title: The Gizra Way - How We Roll (and Rollback)
layout: post
author: niryariv
---

My involvement with Gizra is a bit unusual. Before settling into my fake Aeron in Gizra's plush Tel Aviv facilities I was actually a client for two years, contracting Brice & Amitai to write code for a New York startup I was working for. Together, we managed to build a continuous deployment setup where we pushed new code to production every day while working 7 timezones apart, while, surprisingly, keeping our sanity mostly intact.

<!-- more -->

Having done quite a bit of remote work since then, with clients like Harvard in Boston or Commerce Guys in Paris, we've come up with a bunch of tools and practices that help us keep a Drupal project moving smoothly while maintaining minimal overhead. Bear in mind the following isn't a "7 Failproof Secrets to Manage a Drupal Project in 24 Hours for Dummies" type post. These are notes from an ongoing journey, as we keep experimenting with new tools and methods and altering them as we learn.


## The Call

A project manager's job is communicating. This is critical especially in software, where projects are always different to some degree from the initial plan (when such a plan exists at all) and where the people involved tend to be less than chatty by nature.

In large projects, where the territory is still being discovered and directions often change, we'll often hold a daily Skype call with the client's project lead. A quick 5-10 minute call to make sure everyone is on the same page can often save hours on non-interactive channels like email.

We're not SCRUM fundamentalists and when the project finds its pace we may switch to less frequent calls, but whenever we feel the question marks are piling up again we'll set up a call ASAP to resolve them.


## The Build

One thing that's particualrly tricky with Drupal and similar CMS systems is that a part of the logic is actually in the database, rather than the code. This can make it hard to deploy code on a new environment if you don't make sure to keep everything synchronized.

Our solution makes use of some excellent Drupal modules like Features and [Migrate](http://www.gizra.com/content/migrate-and-baking-content/), adds a few of our own methods and concentrates everything in an ``install.sh`` which every Gizra project has in its root dir. Whenever we pull code this script is executed and completely rebuilds everything from scratch, installing Drupal + modules + DB + migrated content.

Whenever someone pulls code from Git, they run ``install.sh``. This means the _whole_ environment is constantly being rebuilt across developers' machines. This keeps us honest. You can't take shortcuts and if you left something out, the code will break in the code review before we merge it to master.


## The Code Review

Every task has a GitHub issue ticket. Every ticket gets a branch. Every branch gets code reviewed by Amitai or Brice before it is merged. This means every piece of code is written to be human readable and meet Gizra's best practices. As result, any Gizra developer can *and does* pick up someone else's code and continue developing with minimal startup time.

Notice "*and does*". We can add or remove developers on a project as needed. That's a huge advantage for a relatively small company that takes on some serious projects.


## The Tools

[Pantheon](https://www.getpantheon.com/) deserves a lot of the credit for our continuous deployment setup. It gives us a highly optimized Drupal hosting environment, but most importantly a one-click dev > test > live migration. That along with New Relic integration, Varnish, and a lot of other stuff. We love it.

[GitHub](https://github.com/) is where all our code is stored and where all issues are tracked. Ideally, clients are added to the project's members - this lets them follow progress as it happens, and lets us communicate with them over GitHub tickets. This brings a some of the open source "people will read this code" feel into closed code projects, keeping us on our toes.


## Balance

It's a 9 hour workday, five days a week. People with kids leave early once a week to pick them up from kindergarten or school. Weekends and nights are spent offline (or in some cases rewriting Organic Groups / changing diapers). Of course there are emergencies, but we take great care to make sure they're rare.

This is something that was important to me even back when I was Gizra's client. That kind of pacing makes for long term thinking, code that's better thought out, and a positive work environment.

This last point is the most important one. Gizra wouldn't come up with these practices if we were constantly chasing after some deadline. Good environment makes for good code.


