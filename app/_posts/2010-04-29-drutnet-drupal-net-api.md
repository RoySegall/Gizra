---
tags:
- Drupal-planet
- .NET
- DrutNet
permalink: /content/drutnet-drupal-net-api/
title: "DrutNet -  Drupal .NET API "
created: 1272550961
layout: post
---
DrutNet is a .NET API to create client applications that connects to a Drupal site, and allow file upload, node save/load, view get and more.

<strong>Introduction</strong>
I've created this simple API to connect Drupal with .NET applications easily and quickly, this API was based on an API that I wrote for one of our projects, for this project we had to create a few client application to upload files, connect to desktop application and update the content. I used two different interfaces to cover all my needs, cURL - to upload files; and Services module - to create/ update nodes.

<strong>Features Snapshot</strong>
DrutNet API has a ```Services``` class:
<ul>
<li>Services.Login - Login to Drupal</li>
<li>Services.NodeGet - Load a node</li>
<li>Services.UserGet - Load a user</li>
<li>Services.NodeSave - Save a node</li>
</ul>

<!-- more -->

To upload files using the API use the ```CURL``` class:
<ul>
<li>Curl.Login - Login to Drupal with cURL, which is required in order to uplaod a file. This login is _not the same as the Services login</li>
<li>Curl.UploadFile - Upload a file to a CCK file/ image field. The "File form" module provided in the ```/Drupal Module``` folder must be enabled on the Drupal site</li>
</ul>

<strong>Source</strong>
The source code is stored under <a href="http://github.com/bricel/DrutNet">GitHub</a>  (we didn't publish it in Drupal as apparently it against some the CVS guidelines).

<strong>Example</strong>
In the source there is a ```sample``` project, that demonstrates the use of the API to load/ save a node, and to upload a file.
To test the API follow the instructions bellow (no programing or compiling required when using the):

<ol>
<li>Place both Drupal modules under '/Drupal Module' in your Drupal installation (e.g. under ```sites/all/modules```):
- DrutNet sample module - The module creates a ```DrutNet smaple``` content type to test the system with the DrutNETSample
- File form - This module is required for file upload with cURL
<li>Download and enable the required modules
```
drush dl cck views features filefield services
```
</li>
<li>Compile the sample project Or use the already compiled program in ```/Dlls/DrutNETSample.exe```</li>
<li>Insert your username password to Drupal and the Drupal site URL
<img src="/assets/images/legacy/Drutnet1.png" /><br/>
</li>
<li>Click on "Login to services", and then click "Login to cURL".
<img src="/assets/images/legacy/Drutnet2.png" /><br/>
</li>
<li>Update an existing node by indicating the node ID, loading it, changing the text and "Save" it.
<img src="/assets/images/legacy/Drutnet3.png" /><br/>
</li>
<li>To test file upload, switch to the Upload tab, choose a file and fill the node ID, CCK field name to attach the file to (in our example we use ```field_file```), and hit the Upload Button</li>
</ol>

For features or bug report use GitHub <a href="http://github.com/bricel/DrutNet/issues">project page</a>
