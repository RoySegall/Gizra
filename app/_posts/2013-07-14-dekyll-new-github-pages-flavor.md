---
field_images:
    - /assets/images/dekyll-flavor-1.jpg
    - /assets/images/dekyll-flavor-2.jpg
    - /assets/images/dekyll-flavor-3.jpg
    - /assets/images/dekyll-flavor-4.jpg
tags:
    - Dekyll
    - Drupal-planet
layout: post
title: 'Dekyll''s new "Github Pages" flavor'
permalink: /content/dekyll-new-github-pages-flavor/
---


[Dekyll](http://www.gizra.com/content/dekyll-drupal-on-jekyll/) (Drupal on Jekyll) comes now in two flavors. The first one is "normal", which is more advanced and allows you to build more complex websites, the second is called "Github Pages" and it lets you quickly serve a new site using Github.

We are working hard in Gizra to make this process as smooth as possible, with the goal of letting non-developers the ability to serve their content using Jekyll, on Github Pages - without them having to bother with knowing what Jekyll, Git or Github Pages are. A worthy goal indeed, but not trivial.

<!-- more -->

The default installation has very few assumptions:

1. You have LAMP/ MAMP and [Drush](https://drupal.org/project/drush) (I know it's trivial if you are a Drupal developer, but luckily we have also Jekyll people visiting these posts)
1. Dekyll will be served from ``http://localhost/dekyl/www``. If that's not the case follow the instructions on ``default.install.sh`` - as Dekyll needs to connect with Github oAuth on that address

```bash
git clone https://github.com/Gizra/dekyll.git
cd dekyll
# Copy the default installation script, so if needed you can adapt it to your needs.
cp default.install.sh install.sh
# Execute the installation, and the queue workers.
bash install.sh
```

Once ready, a new browser should open automatically with your new Dekyll site.

Note that when the Drupal installation is finished it starts the queue workers which listen to the queue and perform the clone, import and export jobs from and to Jekyll as instructed by Drupal.

Upon opening the local site, you're redirected to log in via Github and then to create your new repo (a fork of the ``jekyll-bootstrap`` repository):

<div class="thumbnail">
  <img src="/assets/images/dekyll-flavor-1.jpg" />
</div>

Dekyll now engages on some behind the scenes dialog with Github, and lets you fork ``Gizra/jekyll-bootstrap`` from Dekyll itself. Once that's done you're redirected to the new Branch node that was created (i.e. branch ``gh-pages`` on the forked ``jekyll-bootstrap`` repository).

<div class="thumbnail">
  <img src="/assets/images/dekyll-flavor-2.jpg" />
</div>

Take a look at the command line, and you'll see the repository is cloned and imported by the queue workers - Jekyll files are being parsed and created as nodes. Dekyll still doesn't have the JS to do it for you, so you'll need to refresh the page after a few seconds to see your new content.

<div class="thumbnail">
  <img src="/assets/images/dekyll-flavor-3.jpg" />
  <div class="caption">All the imported files are listed, and you can create new ones as-well.</div>
</div>

Select for example the "Hello Dekyll" node, and edit it: change the title, add some text in the body and click save.

The IFrame you see in the node view might not be updated yet. This is one caveat of using Jekyll on Github pages - you need to wait for the file to be pushed to Github and for the site to be re-built.

<div class="thumbnail">
  <img src="/assets/images/dekyll-flavor-4.jpg" />
</div>

Dekyll was "smart" enough to configure your ``_config.yml`` file and point it to the right URL address. It even personalized the "Hello Dekyll" page to show you the links of your new site on Github Page, and the Dekyll site.

Thanks to Dekyll, Drupal can now power the content editing of super fast static sites. Including the very blog post you're reading.

<div class="thumbnail">
  <img src="/assets/images/dekyll-flavor-5.jpg" />
  <div class="caption">The images used in this blog post were uploaded to the node as-well, and exported to the correct directory by Dekyll.</div>
</div>
