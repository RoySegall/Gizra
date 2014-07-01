---
title: "Bower link"
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link"
layout: post
published: true
---
Bower is a super tool to manage the dependencies in our javascript applications.  if we want add a library only need to use `bower install [library-name]` and this add the file's library in the version compatible with other libraries of my project.

also, if the library have a new version we can update this and his dependencies, only using `bower update`.

This is wonderful for a production enviroment? but repeat this every time a library changes under development it's insane, even worse at the situation with many components developing simultaneously.

<!-- more -->

---

Bower Link

`bower link` create a symbolic link of the component into the bower's share folder, and we can use this into our project executing the command `bower link [library-name]`

Let's try it together... linking a library into a project.

__Preparation__

Both the library and the application have to be bower packages(*), for more information of [bower packages](https://github.com/bower/bower.json-spec) and how to you [create one](http://bower.io/docs/creating-packages/) yo can check [bower site](http://bower.io/).

To create from the scratch, we suggest to use [yeoman generators](http://yeoman.io/generators/community.html).

1.- Create new application folder.

```bash
$ mkdir newApp

$ cd newApp
```

2.- Create new application. [(You could found and example here)](http://yeoman.io/codelab/scaffold-app.html)

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


(*): You could check if have the bower.json file with the packaged information.
(**): Generally, where the bower.json file there is..

