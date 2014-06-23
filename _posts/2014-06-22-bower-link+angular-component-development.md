---
title: "Bower link + Angular component development."
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link+angular-component-development"
layout: post
published: true
---
Bower is a super tool to manage the dependencies in our javascript applications.  if we want add a dependenciy only nees to use `bower install [dependencye-name]` and bower add the library file in the version compatible to may proyect.

This is wonderful to production? but it's insane when we develop many components simultaneous?

<!-- more -->

---

Bower Link

`bower link` create a symbolic link of the component into the bower share folder, and then when we want to used into a project we only need to execute the command `bower link [library-name]`

Let's test together...



