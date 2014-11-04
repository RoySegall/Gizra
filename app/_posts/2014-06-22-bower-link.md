---
title: "Bower link"
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link"
layout: post
published: true
---
Bower is a super tool to manage the dependencies in our javascript applications.  if we want add a library only need to use `bower install [library-name]` and this will add the file's library in the version compatible with other libraries of my project.

also, if the library have a new version we can update this and his dependencies, using `bower update`.

This is wonderful for a production enviroment? but repeat this everytime ``bower update`` or ``bower install`` when a library are under development, change constantly it's insane, even worse at the situation with many components developing simultaneously.

<!-- more -->

---

Bower Link

`bower link` create a symbolic link of the component into the bower's share folder, and we can use this into our project executing the command `bower link [library-name]`

Let's try it together... linking a library into a project.

__Preparation__

Check that both the library and the application have to be bower packages(*), for more information of [bower packages](https://github.com/bower/bower.json-spec) and how to you [create one](http://bower.io/docs/creating-packages/) you for more information, you can check [bower site](http://bower.io/).

To create application/components from the scratch, we suggest to use [yeoman generators](http://yeoman.io/generators/community.html).

1.- Create new application folder.

```bash
$ mkdir newApp
$ cd newApp
```

2.- Create new application. [(You could found and example here)](http://yeoman.io/codelab/scaffold-app.html)

```bash
$ yo angular
```

You need to have installed the [generator](http://yeoman.io/codelab/install-generators.html).

3.- Create a component folder.

```bash
$ cd ..
$ mkdir myComponent
$ cd myComponent
```

4.- Create a new component, you can use `bower init` to declare the new application.

```bash
$ bower init
```

5. Add library files.

__Linking__

1.- Create a link, at the root folder of the component. (Generally, where the bower.json is.).

```bash
$ bower link
```
this create a symbolic __link__ into the path `~/.local/share/bower/links/` to the component path.

![]({{BASE_PATH}}/assets/images/posts/bower-link/bower-create-link.png)

2.- Access the project folder where you want to use the component. and link the dependency.

```bash
$ cd ..
$ cd newApp
$ bower link myComponent
```

this create a symbolic __link__ into bower components folder of the project, to the symbolic link created before.

![]({{BASE_PATH}}/assets/images/posts/bower-link/bower-use-link.png)

__Use__

Inside the bower components folder of your project, you could update in the original library files without leave the application.

![]({{BASE_PATH}}/assets/images/posts/bower-link/symbolic-link.png)


(*): You could check if have the bower.json file with the packaged information.

__Ready for production__

In our Drupal's projects in Gizra, we can install the client application and dependencies, with a bash script file 
``install.sh``, to achive it

Also, in the root of the project, we need to define the path where we wants to be storage the libraries files, in the Bower configuration file ``.bowerrc``

```json
{
  "directory": "[profile_name]/libraries/bower_components/"
}
```

and in the script file we could add instructions fo clean the enviroment, and perform a fresh installation, every time we run the script.

```bash
# Install angular components via bower.
bower uninstall [application_name]
bower cache clean
bower install [url_application_repository]
```

So, Bower will install the dependencies defined into the ``bower.json`` file.

For more informaion, please check [bower configuration](http://bower.io/docs/config/) 
