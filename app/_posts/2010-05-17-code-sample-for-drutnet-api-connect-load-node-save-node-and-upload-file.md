---
tags:
- Drupal-planet
- .NET
- DrutNet
permalink: /content/code-sample-drutnet/
title: "Code sample for DrutNet API - connect, load node, save node and upload file"
created: 1274085839
layout: post
---
In the previous <a href="/content/drutnet-drupal-net-api">post</a> I've introduced DrutNet API with an already compiled example, today I will show some code examples.
Since last post I've added a new method that allow file upload with Services, using the base-64 conversion, I will show you how this method works.

<!-- more -->

<ol>
<li>Create a project in your preferred  .Net IDE, I use VS 2008 but those who prefer to work in the open source world can use the <a href= "http://www.mono-project.com" target="_blank">Mono IDE</a> instead.
</li><br></ul>
<li>To work with Services we need two assembly reference,  CookComputing.XmlRpcV2 and obviously Drutnet library (both dll are under  <a href="http://github.com/bricel/DrutNet/tree/master/Dlls/" target ="_blank">Dlls folder</a> stored in GitHub).
</li><br>
<li>Now we need to have a Drupal site with the <a href="http://drupal.org/project/Services" target= "_blank">Services module</a> installed  and the following modules enabled :
<ul>
<li>Services</li>
<li>XMLRPC Server </li>
<li>File Service</li>
<li>Node Service</li></ul>
</li>
<li>After adding the libraries and enabling the modules we can start working, first we need to create an instance of the ServicesSettings class and then of the Sevices class  :
```
 DrutNET.ServicesSettings services_settings= new DrutNET.ServicesSettings();
 services_settings.DrupalURL = @"http://localhost/drupal-6.16/";
 services_settings.UseSessionID = false;
 services_settings.CleanURL = true;
```Here we define the connection settings, which include the path to your Drupal site, the type of security you have enabled in the services settings (only session ID is supported at this point) and clean URL settings.
```
DrutNET.Services service_connection = new DrutNET.Services(service_settings);
```Here we create an instance of the services class using the settings class instance created before.
</li><br>
<li>Now we can login to Drupal :
```
If (service_connection.Login("username", "password"))
  Console.Write("Login successfull");
else
  Console.Write("Login failed");
```* Make sure that the user has permission for all the services functions that you intend to use.
</li><br>
<li>Load and save a node :
```
int nideID = 1;
CookComputing.XmlRpc.XmlRpcStruct node = service_connection.NodeGet(nodeID);
node["body"] = "My new text";
service_connection.NodeSave(node);
```Here we use NodeGet method to load a node and then NodeSave method to save it back after making a change to the body field.
</li><br>
<li>Save a file to a node :
```
 string filePath = @"c:\test.txt";
 int fileIndex = 0; // In case of multiple file field the index of the file.
 int nodeID = 1; // The node to attach the file to.
 string fieldName = "field_file" ; // CCK field name as defined in the content.
 service_connection.FileUpload(filePath , fileIndex , nodeID , fieldName);
```FileUpload method takes care of converting the file to base64 and also used both services FileSave and NodeSave.
</li></ol>








