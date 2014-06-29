---
title: "Bower link"
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link"
layout: post
published: true
---
Bower is a super tool to manage the dependencies in our javascript applications.  if we want add a library only need to use `bower install [library-name]` and bower add the file's library in the version compatible with my project.

also, if the library have a new version we can update this one, only using `bower update`.

This is wonderful to production? but repeat this every time a library under development change it's insane, also it's wrost when we have this situation with many components simultaneous

<!-- more -->

---

Bower Link

`bower link` create a symbolic link of the component into the bower share folder, and when we want to used into a project we only need to execute the command `bower link [library-name]`

Let's try it together...

__Preparation__

We need to use a project which already have a bower package declared (*), or you can create/define a new component/application with [`bower init`](http://bower.io/#defining-a-package)

An easy way to do it this, is using the [yeoman generators](http://yeoman.io/generators/community.html).

1.- Create new application folder.

```bash
$ mkdir newApp

$ cd newApp
```

2.- Create new application (for example angular application)

```bash
$ yo angular
```
You need to have an example [here](http://yeoman.io/codelab/install-generators.html) before yo need to [install yeoman](http://yeoman.io/codelab/install-generators.html).

3.- Create a component folder.

```bash
$ cd ..
$ mkdir myLibrary
$ cd myLibrary
```

4.- Create a component.

```bash
$
```

__Linking__

1.- Open the root folder of the component. (**)
2.- Create a link.

```bash
bower link
```
![]({{BASE_PATH}}/assets/images/posts/bower-create-link.png)

this create a symbolic link into the path `~/.local/share/bower/links/` to the component path.

3.- Access the project folder where you want to use the component. and link the dependency.

```bash
bower link myComponentName
```

this create a symbolic link into project bower components folder to the symbolic link created, in the bower links folder.

__Use__

Now, any change you do in the folder


(*): You could check if have the bower.json file.
(**): Generally, where the bower.json file there is..

