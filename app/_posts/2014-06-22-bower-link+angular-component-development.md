---
title: "Bower link"
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link"
layout: post
published: true
---
Bower is a super tool to manage the dependencies in our javascript applications.  if we want add a dependenciy only nees to use `bower install [dependency-name]` and bower add the library file in the version compatible to may proyect.

This is wonderful to production? but it's insane when we develop many components simultaneous?

<!-- more -->

---

Bower Link

`bower link` create a symbolic link of the component into the bower share folder, and then when we want to used into a project we only need to execute the command `bower link [library-name]`

Let's do it together...

__Preparation__

Open a project witch one have a bower package declared (generally have the bower.json in the root of the project.) , also yo can create a new component and define his package with [`bower init`](http://bower.io/#defining-a-package)

An easy way to do it this, is using the [yeoman generators](http://yeoman.io/generators/community.html).

__Linkinhg__

- Create the link of the component

```bash
bower link
```
![]({{BASE_PATH}}/assets/images/posts/bower-create-link.png)

this create a symbolic link into the path `~/.local/share/bower/links/` to the component path.

- Access the project folder where you want to use the component. and link the component

```bash
bower link myComponentName
```

this create a symbolic link into bower components folder of the project to the symbolic link of the component created, in the links folder.

__Conclusion__

