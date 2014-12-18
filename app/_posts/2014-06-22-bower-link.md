---
title: Bower link
tags: 
  - bower
  - angularjs
permalink: "/content/bower-link"
layout: post
published: true
---

We use the [Bower](http://bower.io/) package manager to manage dependencies in our JavaScript code.  If we want to add a library we need only run ``bower install [package-name]`` and Bower will add it, in the version compatible with the other libraries on the project. If the library has a new version we can update it and its dependencies using ``bower update``.

This is wonderful and a great time saver, but when developing locally a new component we can't ``bower install`` and ``bower update`` for every line change. To help us with that we have ``bower link [package-name]``.

<!-- more -->

---

``bower link`` creates a symbolic link of the component into the bower's share folder, which we can use in our project by running `bower link [package-name]`

__Setting Up__

First, you need to check that both your library and package in development are registered as bower packages - by having a valid [bower.json](http://bower.io/docs/creating-packages/) file.

We assume you have Yeoman's [Angular generator](http://yeoman.io/learning/) installed.

1. Scaffold a new app:

```bash
# Create new application folder.
mkdir newApp
cd newApp

# Create new application.
yo angular
```


2. Create a component folder:

```bash
mkdir myComponent
cd myComponent
```

3. Create a new component. Use ``bower init`` to declare the new application.


4. Create a link at the root folder of the component using ``bower link``. This registers the package for local use.

![]({{BASE_PATH}}/assets/images/posts/bower-link/bower-create-link.png)

5. Access the project folder where you want to use the component. and link the dependency:

```bash
# Go back to the root of the Application.
cd ..
bower link myComponent
```

This creates a symbolic link between the components under /myComponents and the ones "installed" for the main application in ``/bower_components/myComponents``.

![]({{BASE_PATH}}/assets/images/posts/bower-link/bower-use-link.png)

6. Now, whenever you run ``grunt build`` your component it will auto-sync with your application.

![]({{BASE_PATH}}/assets/images/posts/bower-link/symbolic-link.png)


## Use Bower in Drupal distributions

Nowadays our Drupal projects in Gizra almost always have an AngularJS  component. We can install the client application and dependencies with a bash script file.

In the root of the project, we need to define the path we want to use for the library files, in the Bower configuration file ``.bowerrc``:

```json
{
  "directory": "[drupal-profile-name]/libraries/bower_components/"
}
```

In the script file we could add instructions fo clean the enviroment and perform a fresh installation every time we run the script:

```bash
# Install angular components via bower.
bower uninstall [application-name]
# Bower caches your packages, so it's better to wait a bit more, but be sure 
# the packages are correct.
bower cache clean
bower install [url-application-repository]
```

Bower will install the dependencies defined into the ``bower.json`` file.