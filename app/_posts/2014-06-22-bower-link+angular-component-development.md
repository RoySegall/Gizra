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

Check that both the library and the application have to be bower packages(*), for more information of [bower packages](https://github.com/bower/bower.json-spec) and how to you [create one](http://bower.io/docs/creating-packages/) yo can check [bower site](http://bower.io/).

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

4.- Create a new component, you can use `bower init` to declare the new application.

```bash
$ bower init
```

5. Add a library javascript
```javascript
function greeter() {
  return 'Hello world';
}
```

__Linking__

1.- Create a link, at the root folder of the component. (**).

```bash
$ bower link
```
this create a symbolic link into the path `~/.local/share/bower/links/` to the component path.

2.- Access the project folder where you want to use the component. and link the dependency.

```bash
$ bower link myLibrary
```

this create a symbolic link into bower components folder of the project, to the symbolic link created before.

__Use__

Now, any change you into the library file, inside of your project if updated in the original file of the library.


(*): You could check if have the bower.json file with the packaged information.
(**): Generally, where the bower.json file there is..

