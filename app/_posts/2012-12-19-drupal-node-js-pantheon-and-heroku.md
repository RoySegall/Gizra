---
tags:
- Node.js
- Pantheoen
- tutorial
- Drupal-planet
permalink: /content/drupal-nodejs-pantheon-and-heroku/
title: Drupal, Node.js, Pantheon, and Heroku
created: 1355946372
layout: post
---
Some title, right?

[Node.js](http://drupal.org/project/nodejs) module for Drupal is so great and a time saver, I’ve got spare time to blog about how to set it up. Future me, we’ll thank me for doing so.

First, let’s define the goals for this blog post

* Learn how to setup the Node.js module and server on a _local_ server
* Setup on  a remote server using Heroku and Pantheon

<!-- more -->

###Install node

Node.js module's README.txt explains how to do it. I’m using Mac so for me it was a simple ``brew install node``.
Get the latest release of the Node.js module, and enable it.
Download the node libraries needed by executing ``npm install`` from the Node.js module directory. That command will look at ```package.json``` and install all the dependencies.
Ok, On to the interesting parts.

###Local Server

Node.js module requires a simple configuration file that will tell it where the node.js server is running, and where the "backend" is (i.e. Drupal). Ignore the example in README.txt, eyes over here please.
Assuming my Drupal site is on http://localhost/d7_dev here’s ``nodejs.config.js``:

```javascript
settings = {
  scheme: 'http',
  port: 5000,
  host: 'localhost',
  resource: '/socket.io',
  serviceKey: 'beejeebusRocks',
  backend: {
    port: 80,
    host: 'localhost',
    scheme: 'http',
    basePath: '/d7_dev',
    messagePath: '/nodejs/message'
  },
  debug: true
};
```

The first part tells Node.js module where the node.js server will live. In the above example it will be ``http://localhost:5000``. Same host different ports.

The "backend" part tells the node.js server where our Drupal site is.
The ``serviceKey`` is the secret code used by Drupal to communicate with the node.js server. In my example it’s also used as a special thank you for <strong>beejeebus</strong>, the module maintainer.
Next, from the command line execute ```node server.js```. If you defined the URL and port correctly (pay extra attention to all those leading and trailing slashes!) you should see

```
Started http server.
   info  - socket.io started
```

Visit ```http://localhost:5000/``` and the (confusing) message “Not found” should greet you. Wait, What? Why “Not found”, if it’s working?!
The reason is that the node.js server is accepting only POST and any GET results with a 404.

Back to Drupal. In your ```settings.php``` add ```$conf['nodejs_service_key'] = 'beejeebusRocks';```, which is the Drupal equivalent for the serviceKey in the JS configuration.
Visit ```admin/config/nodejs/config``` and fill out the form, this time to let _Drupal know about the node.js server. Again, pay attention to leading and trailing slashes.
Node.js server host = localhost
port = 5000

<h4>The Fun Part!</h4>
<ol>
<li>Enable “Nodejs Notifications” module</li>
<li>Open another browser in the background, and login as another user</li>
<li>Back as the administrator go to ```admin/config/nodejs/nodejs_notify/broadcast``` and broadcast your message</li>
<li>The message will appear using Growl in the second browser</li>
<li>Repeat 2 - 5 until you climax. Personally, It took me about 10 browsers open simultaneously to get there!</li>
</ol>

<h3>Deploy it!</h3>
Ok, we had our fun on the local server time to see it in action, on a _real server.
This time let's start with the Drupal part. Probably the quickest way to get it up is to grab an account on <a href="https://www.getpantheon.com/">Pantheon</a> and create a Clean Drupal 7 installation (I did it two years ago, and haven't regretted since...)
Let's say my new site is called ```dev.gizra.gotpantheon.com```
Add the module, and the service key in settings.php, yada yada yada. Indeed, we will still need to deal with the Node.js module configuration. Right after the Heroku section.

<h4>The Heroku section</h4>
Wow. Seriously. Those guys in Heroku made deployment of a node.js server really easy. After you sign up, and download the <a href="https://toolbelt.heroku.com">Heroku toolbelt</a> (a command line utility), you can read <a href="https://devcenter.heroku.com/articles/nodejs">this</a> quick introduction that will show you how easy it's to deploy from the command line. If you know how to use git, you'll know to use Heroku.

Git clone <a href="https://github.com/amitaibu/DrupalNodejsHeroku">amitaibu/DrupalNodejsHeroku</a> outside of the Drupal installation.
Quick file overview:
I've Copied ```server.js``` from the Node.js module.
I've changed a bit the ```package.json``` so Heroku will be able to build it.
I've added a default ```nodejs.config.js``` you <strong>will need to edit</strong> and add your own ```serviceKey``` and ```backend.host```. Here is how my file looked

```javascript
settings = {
  scheme: 'http',
  port: process.env.PORT || 5000,
  host: '',
  resource: '/socket.io',
  serviceKey: 'beejeebusRocks',
  backend: {
    host: 'dev.gizra.gotpantheon.com',
    port: 80,
    scheme: 'http',
    messagePath: '/nodejs/message'
  },
  transports: ['xhr-polling'],
  debug: true
};
```

Notice several changes:
<ul>
<li>backend.host is now pointing to my own Pantheon site. Remember to change it</li>
<li>The port of the node.js server is now ```process.env.PORT || 5000```. Heroku will make sure to inject that variable when executed, so our node.js server will listen on the right port</li>
<li>The transport mechanism is xhr-polling. Heroku still doesn't sup Websockets port, but bare in mind that it's the node.js server that gets the polling, _not the Drupal server</li>
</ul>

Next, we can deploy it to Heroku.

```bash
$ heroku create
$ git push heroku master
```

(I also added a .gitignore file that will ignore ```node_modules``` in case you will ```npm install```).
Notice how not only the files are pushed to git, but Heroku now builds the dependencies and launches the server. In the end of the output you will see the URL of your new site. That's the node.js server URL, Drupal will POST data to. You can also open it with ```heroku open```

<h4>Back to Drupal</h4>
Visit ``admin/config/nodejs/config`` and fill out the form. _My_ configuration looked like this:
Node.js server host = nameless-brook-555.herokuapp.com
port = 80

Enable the Node.js modules, and start enjoying the work of other great people!
