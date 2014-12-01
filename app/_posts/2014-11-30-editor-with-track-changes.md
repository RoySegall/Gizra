---
title: Text-Editor with changes tracker.
tags:
  - CKEditor
  - ICE
  - AngularJs
  - Drupal-planet
layout: post
permalink: "/content/editor-with-track-changes"
author: NaderSafadi
---
{% include setup %}

For a recent project, we needed the ability to track text changes by multiple authors. 
The NY Times released the excellent [ICE](https://github.com/NYTimes/ice) just for this,
And then LoopIndex released [ckeditor-lite](https://github.com/loopindex/ckeditor-track-changes) based on ``ICE`` as a ``CKEditor`` Plugin.

So now you can have a powerful editor with changes tracker ability, Here's to implement all of this to your AngularJs app.

<!-- more -->

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/editor-with-track-changes/track-changes.gif">
  <div class="caption">CKEditor with changes tracker, Each user will get a different color.</div>
</div>

1- Bower install the libraries of [ng-ckeditor](https://github.com/esvit/ng-ckeditor) and [ckeditor-lite](https://github.com/loopindex/ckeditor-track-changes) (Based on ICE).

```
  bower install ng-ckeditor#latest --save
  bower install lite http://download.ckeditor.com/lite/releases/lite_1.1.25.zip --save
```
2- We have to move the ``lite`` to the plugins directory inside ``CKEditor``.
Preferably do it in your install profile, If you don't have an install profile, Just move it manually.

3- Ok so now let's put inside AnuglarJs, why ?, look how it looks in the html:

```html
<div ng-controller="MainCtrl">
  <tracker field-name="body"></tracker>
</div>
```

That's it, With ``AngularJs`` everything looks clean.

4- What this directive does is outputs the text-area and loads a custom config file for the ``CKEditor``, 
You have to set the user name and user ID as well to know who made the changes.

 ```html
 <textarea ng-model="entity[fieldName]" ng-id="fieldName" ng-name="fieldName"></textarea>
 ```

You can add a save button if you wanna save in Angular's ``$http`` service.
 If not, you can put it inside a normal form and give it the field name in Drupal or any other system.
You can as well add a display for the html that is saved with the help of ``ng-bind-html``, 
And a toggle display button like we have in the example above.

Of-course you have to include the CKEditor's ``JS`` files as well.

5- Finally just call the custom config file in your directive's ``JS`` file.

```js
// Call the editor with custom settings.
CKEDITOR.replace(document.getElementById(fieldName), {
  customConfig: DrupalSettings.getBasePath() + 'profiles/pipeline/modules/custom/pipe_general/js/custom-conf.js'
});
```

Set user name and user id:

```js
// Defining the current UserId and UserName.
var lite = CKEDITOR.config.lite = CKEDITOR.config.lite || {};
lite.userId = scope.userId;
lite.userName = scope.userName;
```


Here's an [example custom config](https://github.com/loopindex/ckeditor-track-changes/blob/master/demo/ckeditor-conf.js) file for ``lite``
