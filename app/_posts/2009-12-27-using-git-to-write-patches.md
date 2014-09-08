---
tags:
- Drupal-planet
permalink: /content/using-git-write-patches/
title: Using git to write patches
created: 1261904474
layout: post
---
Drupal is using CVS for version controlling core and contrib modules. CVS has diffing options, but it becomes annoying when you try adding or deleting new files. Here's an example of how to use git to patch a contrib module - Organic groups.

<!-- more -->

<ol>
<li>In OG's project page click on the <a href="http://drupal.org/project/og/cvs-instructions">CVS instructions</a> and select the version you want to patch.
```
cvs -z6 -d:pserver:anonymous:anonymous@cvs.drupal.org:/cvs/drupal-contrib checkout -d og-DRUPAL-6--2 -r DRUPAL-6--2 contributions/modules/og/
```</li>
<li>Go inside the directory you just checked out from CVS.
```
cd og-DRUPAL-6--2
```
</li>
<li>Make the folder and all sub-folder a git repository, and add all the files.
```
git init
git add .
git commit -m "Initial commit of the Organic groups module."
```
</li>
<li>No we have a _master branch with the original module. We can create a new git branch and work on this new branch - edit files, move files around, create new directories, etc'.
```
git checkout -b new-branch
```
</li>
<li>
The _new-branch is now the active branch. Do some changes to code, and commit them.
```
git commit -a -m "A meaningful commit description."
```
</li>
<li>In order to create a diff file, we need to switch back to the master branch, and create a diff against our new-branch. Note that we use the ```--no-prefix``` command to follow the patch creation standard of Drupal.
```
git checkout master
git diff --no-prefix master new-branch > [issue-id]-[patch description]-[comment number].patch
```
</li>
<li>
We can delete the temporary branch.
```
git branch -D new-branch
```
</li>
</ol>

If you want to work only with git, and skip the CVS part, have a look at <a href="http://git.drupalfr.org/">git.drupalfr.org</a>.
